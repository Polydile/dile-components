import { LitElement, html, css } from 'lit';
import { DileForm } from '@dile/ui/mixins/form/index.js'
import '@dile/ui/components/drop-file/drop-file.js';
import { readImageFile } from '../../../lib/image/readImageFile.js';
import { validateImageFile } from '../../../lib/image/validateImageFile.js';
import { createThumbnail } from '../../../lib/image/createThumbnail.js';
import { formatFileSize } from '../../../lib/image/formatFileSize.js';
import { buildValidationMessages } from '../../../lib/image/buildValidationMessages.js';

export class DileImageUploaderForm extends DileForm(LitElement) {
  static styles = [
    css`
      :host {
        display: block;
      }
      dile-drop-file {
        margin-bottom: 0;
      }
      .image-summary {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        margin: 0.5rem 0;
        font-size: var(--dile-file-preview-font-size, 0.8rem);
      }
      .image-summary img {
        max-width: 60px;
        max-height: 60px;
        border-radius: 4px;
        display: block;
      }
    `
  ];

  static get properties() {
    return {
      label: { type: String },
      allowedExtensions: { type: Array },
      translations: { type: Object },
      maxFileSize: { type: Number },
      minWidth: { type: Number },
      maxWidth: { type: Number },
      minHeight: { type: Number },
      maxHeight: { type: Number },
      imageInfo: { state: true },
    };
  }

  constructor() {
    super();
    this.imageInfo = null;
    this._inspectToken = 0;
  }

  render() {
    return html`
      <dile-drop-file
        name="image"
        label="${this.label}"
        id="dropfile"
        .allowedExtensions=${this.allowedExtensions}
        dropLabel="${this.translations.file_drop}"
        buttonLabel="${this.translations.select_file}"
        selectedFileLabel="${this.translations.selected_file}"
        extensionErrorMessage="${this.translations.extension_allowed}"
        @element-changed=${this.handleFileChange}
      ></dile-drop-file>
      ${this.imageSummaryTemplate}
    `;
  }

  get imageSummaryTemplate() {
    if (!this.imageInfo) {
      return '';
    }
    return html`
      <div class="image-summary">
        <img src="${this.imageInfo.thumbnail}" alt="">
        <span>${this.translations.image_dimensions_summary(this.imageInfo.width, this.imageInfo.height, formatFileSize(this.imageInfo.size))}</span>
      </div>
    `;
  }

  get dropFileEl() {
    return this.renderRoot.querySelector('#dropfile');
  }

  async handleFileChange(e) {
    const file = e.detail.value;
    const token = ++this._inspectToken;
    this.imageInfo = null;

    if (!file) {
      return;
    }

    let info;
    try {
      info = await readImageFile(file);
    } catch (error) {
      if (token !== this._inspectToken) return;
      const message = error.code === 'EMPTY_FILE'
        ? this.translations.image_empty_file
        : this.translations.image_invalid_file;
      this.rejectFile(message);
      return;
    }

    if (token !== this._inspectToken) return;

    const { valid, errors } = validateImageFile(info, {
      maxFileSize: this.maxFileSize,
      minWidth: this.minWidth,
      maxWidth: this.maxWidth,
      minHeight: this.minHeight,
      maxHeight: this.maxHeight,
    });

    if (!valid) {
      this.rejectFile(buildValidationMessages(errors, this.translations).join('. '));
      return;
    }

    this.imageInfo = {
      width: info.width,
      height: info.height,
      size: info.size,
      thumbnail: createThumbnail(info.bitmap),
    };
  }

  rejectFile(message) {
    this.dropFileEl.errored = true;
    this.dropFileEl.message = message;
    this.dropFileEl.clear();
  }
}
