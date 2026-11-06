import { LitElement, html, css, nothing } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { keyed } from 'lit/directives/keyed.js';
import { loadCropper } from './load-cropper.js';
import { resolveOutputType, buildFileName } from './output-type.js';

const RESIZE_ACTIONS = ['n', 'e', 's', 'w', 'ne', 'nw', 'se', 'sw'];
// Tolerance (px) for floating point errors when comparing the selection with the image bounds.
const BOUNDS_TOLERANCE = 1;

export class DileImageCropper extends LitElement {
  static styles = [
    css`
      :host {
        display: block;
      }
      cropper-canvas {
        height: var(--dile-image-cropper-height, 300px);
        min-width: 0;
      }
      :host([round]) cropper-selection {
        border-radius: 50%;
        box-shadow: 0 0 0 9999px var(--dile-image-cropper-shade-color, rgba(0, 0, 0, 0.55));
      }
    `
  ];

  static get properties() {
    return {
      src: { type: String },
      file: { attribute: false },
      alt: { type: String },
      aspectRatio: { type: Number },
      initialCoverage: { type: Number },
      outputWidth: { type: Number },
      outputHeight: { type: Number },
      outputType: { type: String },
      outputQuality: { type: Number },
      round: { type: Boolean, reflect: true },
      _cropperLoaded: { state: true },
      _objectUrl: { state: true },
    };
  }

  constructor() {
    super();
    this.src = '';
    this.file = null;
    this.alt = '';
    this.initialCoverage = 0.8;
    this.outputType = '';
    this.outputQuality = 0.92;
    this.round = false;
    this._cropperLoaded = false;
    this._objectUrl = '';
    this._imageLocked = false;
    this._loadToken = 0;
  }

  connectedCallback() {
    super.connectedCallback();
    if (this.file && !this._objectUrl) {
      this._objectUrl = URL.createObjectURL(this.file);
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._revokeObjectUrl();
  }

  willUpdate(changedProperties) {
    if (changedProperties.has('file')) {
      this._revokeObjectUrl();
      if (this.file && this.isConnected) {
        this._objectUrl = URL.createObjectURL(this.file);
      }
    }
  }

  updated(changedProperties) {
    if (this.imageSrc && !this._cropperLoaded) {
      loadCropper().then(() => {
        this._cropperLoaded = true;
      });
      return;
    }
    if (this._cropperLoaded && (changedProperties.has('_cropperLoaded') || changedProperties.has('_objectUrl') || changedProperties.has('src'))) {
      this._waitImageReady();
    }
  }

  get imageSrc() {
    return this._objectUrl || this.src;
  }

  get canvasEl() {
    return this.renderRoot.querySelector('cropper-canvas');
  }

  get imageEl() {
    return this.renderRoot.querySelector('cropper-image');
  }

  get selectionEl() {
    return this.renderRoot.querySelector('cropper-selection');
  }

  render() {
    if (!this.imageSrc || !this._cropperLoaded) {
      return nothing;
    }
    // Keyed by the image source, so a new image always starts with fresh cropper elements
    return keyed(this.imageSrc, html`
      <cropper-canvas background>
        <cropper-image
          src="${this.imageSrc}"
          alt="${this.alt}"
          translatable
          scalable
          initial-fit="contain"
          @transform=${this._handleImageTransform}
        ></cropper-image>
        ${this.round ? nothing : html`<cropper-shade theme-color="rgba(0, 0, 0, 0.55)"></cropper-shade>`}
        <cropper-selection
          initial-coverage="${this.initialCoverage}"
          aspect-ratio="${ifDefined(this.aspectRatio || undefined)}"
          movable
          resizable
          @change=${this._handleSelectionChange}
        >
          ${this.round ? nothing : html`<cropper-grid role="grid" bordered covered></cropper-grid>`}
          <cropper-crosshair centered></cropper-crosshair>
          <cropper-handle action="move" theme-color="rgba(255, 255, 255, 0.35)"></cropper-handle>
          ${RESIZE_ACTIONS.map(action => html`<cropper-handle action="${action}-resize"></cropper-handle>`)}
        </cropper-selection>
      </cropper-canvas>
    `);
  }

  async _waitImageReady() {
    const token = ++this._loadToken;
    this._imageLocked = false;
    const image = this.imageEl;
    if (!image) return;
    try {
      await image.$ready();
    } catch (error) {
      if (token !== this._loadToken) return;
      this._dispatch('dile-image-cropper-error', { error });
      return;
    }
    // Let the selection compute its initial position within the image bounds
    await new Promise(resolve => requestAnimationFrame(resolve));
    if (token !== this._loadToken) return;
    // The image is centered at this point. From now on it stays fixed, only the selection moves.
    this._imageLocked = true;
    this._dispatch('dile-image-cropper-ready', this._selectionDetail());
  }

  _handleImageTransform(e) {
    if (this._imageLocked) {
      e.preventDefault();
    }
  }

  _handleSelectionChange(e) {
    // Native "change" events from inner elements are not related to the selection
    if (e.target !== this.selectionEl || !e.detail) return;
    if (this._imageLocked && !this._isInsideImage(e.detail)) {
      e.preventDefault();
      return;
    }
    this._dispatch('dile-image-cropper-change', { ...e.detail });
  }

  _imageBounds() {
    const canvasRect = this.canvasEl.getBoundingClientRect();
    const imageRect = this.imageEl.getBoundingClientRect();
    return {
      x: imageRect.left - canvasRect.left,
      y: imageRect.top - canvasRect.top,
      width: imageRect.width,
      height: imageRect.height,
    };
  }

  _isInsideImage({ x, y, width, height }) {
    const bounds = this._imageBounds();
    return x >= bounds.x - BOUNDS_TOLERANCE
      && y >= bounds.y - BOUNDS_TOLERANCE
      && x + width <= bounds.x + bounds.width + BOUNDS_TOLERANCE
      && y + height <= bounds.y + bounds.height + BOUNDS_TOLERANCE;
  }

  _selectionDetail() {
    const selection = this.selectionEl;
    return {
      x: selection.x,
      y: selection.y,
      width: selection.width,
      height: selection.height,
    };
  }

  get resolvedOutputType() {
    return resolveOutputType(this.outputType, this.file);
  }

  async _readySelection() {
    await this.updateComplete;
    const selection = this.selectionEl;
    const image = this.imageEl;
    if (!selection || !image) {
      throw new Error('dile-image-cropper: there is no image to crop');
    }
    await image.$ready();
    return { selection, image };
  }

  async getCanvas() {
    const { selection, image } = await this._readySelection();
    let width = this.outputWidth;
    let height = this.outputHeight;
    if (!width && !height) {
      // Export the crop at the natural resolution of the image, not at the displayed size
      const [scale] = image.$getTransform();
      width = Math.round(selection.width / scale);
    }
    const fillBackground = this.resolvedOutputType === 'image/jpeg';
    return selection.$toCanvas({
      width: width || undefined,
      height: height || undefined,
      beforeDraw: fillBackground
        ? (context, canvas) => {
          context.fillStyle = '#ffffff';
          context.fillRect(0, 0, canvas.width, canvas.height);
        }
        : undefined,
    });
  }

  async getBlob() {
    const canvas = await this.getCanvas();
    const type = this.resolvedOutputType;
    return new Promise((resolve, reject) => {
      canvas.toBlob(blob => {
        if (blob) {
          resolve(blob);
        } else {
          reject(new Error('dile-image-cropper: the image could not be exported'));
        }
      }, type, this.outputQuality);
    });
  }

  async getFile(fileName) {
    const blob = await this.getBlob();
    const name = buildFileName(fileName || this.file?.name, blob.type);
    return new File([blob], name, { type: blob.type });
  }

  reset() {
    this.selectionEl?.$reset();
  }

  _revokeObjectUrl() {
    if (this._objectUrl) {
      URL.revokeObjectURL(this._objectUrl);
      this._objectUrl = '';
    }
  }

  _dispatch(name, detail) {
    this.dispatchEvent(new CustomEvent(name, {
      bubbles: true,
      composed: true,
      detail,
    }));
  }
}
