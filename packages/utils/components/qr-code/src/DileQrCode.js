import { html, css, LitElement } from 'lit';
import QrCreator from 'qr-creator';

export class DileQrCode extends LitElement {
  static properties = {
    value: { type: String },
    size: { type: Number },
    fill: { type: String },
    background: { type: String },
    radius: { type: Number },
    errorCorrection: { type: String, attribute: 'error-correction' },
    label: { type: String },
    logo: { type: String },
    logoSize: { type: Number, attribute: 'logo-size' },
    logoRadius: { type: Number, attribute: 'logo-radius' },
    logoBackground: { type: String, attribute: 'logo-background' },
    logoPadding: { type: Number, attribute: 'logo-padding' },
  };

  #currentRenderId = 0;

  constructor() {
    super();
    this.value = '';
    this.size = 128;
    this.fill = '#000000';
    this.background = '#ffffff';
    this.radius = 0;
    this.errorCorrection = 'M';
    this.label = '';
    this.logo = '';
    this.logoSize = 0;
    this.logoRadius = 4;
    this.logoBackground = '';
    this.logoPadding = 4;
  }

  static styles = css`
    :host {
      display: inline-block;
    }
    canvas {
      display: block;
      max-width: 100%;
      height: auto;
    }
  `;

  firstUpdated() {
    this.#renderQrCode();
  }

  updated(changedProperties) {
    if (
      changedProperties.has('value') ||
      changedProperties.has('size') ||
      changedProperties.has('fill') ||
      changedProperties.has('background') ||
      changedProperties.has('radius') ||
      changedProperties.has('errorCorrection') ||
      changedProperties.has('logo') ||
      changedProperties.has('logoSize') ||
      changedProperties.has('logoRadius') ||
      changedProperties.has('logoBackground') ||
      changedProperties.has('logoPadding')
    ) {
      this.#renderQrCode();
    }
  }

  #getCanvas() {
    return this.shadowRoot ? this.shadowRoot.querySelector('canvas') : null;
  }

  #clearCanvas() {
    const canvas = this.#getCanvas();
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }
  }

  #renderQrCode() {
    const canvas = this.#getCanvas();
    if (!canvas) {
      return;
    }

    const renderId = ++this.#currentRenderId;
    this.#clearCanvas();

    if (!this.value || typeof this.value !== 'string' || this.value.trim() === '') {
      return;
    }

    const hasLogo = Boolean(this.logo && typeof this.logo === 'string' && this.logo.trim() !== '');

    let ecLevel;
    if (hasLogo) {
      ecLevel = this.errorCorrection === 'Q' ? 'Q' : 'H';
    } else {
      const validEcLevels = ['L', 'M', 'Q', 'H'];
      ecLevel = validEcLevels.includes(this.errorCorrection)
        ? this.errorCorrection
        : 'M';
    }

    const numRadius = Number(this.radius);
    const radius = Number.isNaN(numRadius)
      ? 0
      : Math.min(0.5, Math.max(0, numRadius));

    const numSize = Number(this.size);
    const size = Number.isNaN(numSize) || numSize <= 0 ? 128 : numSize;

    const background =
      this.background === 'transparent' || this.background === null
        ? null
        : this.background || '#ffffff';

    try {
      QrCreator.render(
        {
          text: this.value,
          radius,
          ecLevel,
          fill: this.fill || '#000000',
          background,
          size,
        },
        canvas
      );
    } catch (error) {
      console.warn('dile-qr-code: Error rendering QR code', error);
      return;
    }

    if (hasLogo) {
      this.#drawLogo(canvas, renderId);
    }
  }

  #drawLogo(canvas, renderId) {
    const img = new Image();
    img.crossOrigin = 'anonymous';

    img.onload = () => {
      if (renderId !== this.#currentRenderId) {
        return;
      }
      const currentCanvas = this.#getCanvas();
      if (!currentCanvas || currentCanvas !== canvas) {
        return;
      }
      const ctx = currentCanvas.getContext('2d');
      if (!ctx) {
        return;
      }

      const qrSize = currentCanvas.width;
      const maxAllowedSize = Math.round(qrSize * 0.28);
      const userLogoSize = Number(this.logoSize);
      const targetSize =
        userLogoSize > 0
          ? Math.min(userLogoSize, maxAllowedSize)
          : Math.round(qrSize * 0.22);

      const numPadding = Number(this.logoPadding);
      const padding = Number.isNaN(numPadding) || numPadding < 0 ? 4 : numPadding;

      const badgeSize = targetSize + padding * 2;
      const x = (qrSize - targetSize) / 2;
      const y = (qrSize - targetSize) / 2;
      const badgeX = x - padding;
      const badgeY = y - padding;

      const badgeBg =
        this.logoBackground ||
        (this.background === 'transparent'
          ? '#ffffff'
          : this.background || '#ffffff');

      const numBadgeRadius = Number(this.logoRadius);
      const badgeRadius =
        Number.isNaN(numBadgeRadius) || numBadgeRadius < 0 ? 4 : numBadgeRadius;

      ctx.save();
      ctx.fillStyle = badgeBg;
      ctx.beginPath();
      if (typeof ctx.roundRect === 'function') {
        ctx.roundRect(badgeX, badgeY, badgeSize, badgeSize, badgeRadius);
      } else {
        ctx.rect(badgeX, badgeY, badgeSize, badgeSize);
      }
      ctx.fill();

      ctx.drawImage(img, x, y, targetSize, targetSize);
      ctx.restore();

      this.dispatchEvent(
        new CustomEvent('dile-qr-code-logo-loaded', {
          bubbles: true,
          composed: true,
        })
      );
    };

    img.onerror = (err) => {
      console.warn('dile-qr-code: Error loading logo image', this.logo, err);
      this.dispatchEvent(
        new CustomEvent('dile-qr-code-logo-error', {
          bubbles: true,
          composed: true,
          detail: { error: err },
        })
      );
    };

    img.src = this.logo;
  }

  render() {
    return html`
      <canvas
        role="img"
        aria-label="${this.label || this.value || 'QR Code'}"
        width="${this.size}"
        height="${this.size}"
      ></canvas>
    `;
  }
}
