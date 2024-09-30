import { LitElement, html, css } from 'lit';
import '../file-preview.js';
import '../../button/button.js';
import { messageStyles } from '../../input/src/message-styles.js';

export class DileDropFile extends LitElement {
  static styles = [
    messageStyles,
    css`
      * { box-sizing: border-box; }
      :host {
        margin-bottom: 10px;
      }
      #dropZone {
        width: 100%;
        min-height: var(--dile-drop-zone-min-height, auto);
        border: 2px dashed #ccc;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        color: #ccc;
        font-size: 16px;
        transition: border-color 0.3s, color 0.3s;
        cursor: pointer;
        padding: 1rem;
      }

      p {
        margin: 0.5rem;
      }
      #dropZone.hover {
        border-color: #333;
        color: #333;
      }

      input[type="file"] {
        display: none;
      }

      label {
        display: block;
        margin-bottom: var(--dile-input-label-margin-bottom, 4px);
        font-size: var(--dile-input-label-font-size, 1em);
        color: var(--dile-input-label-color, #59e);
        font-weight: var(--dile-input-label-font-weight, normal);
      }
      main {
        width: var(--dile-input-section-width, 100%);
      }
    `
  ];

  static get properties() {
    return {
      label: { type: String },
      message: { type: String },
      errored: { type: Boolean },
      dropLabel: { type: String },
      buttonLabel: { type: String },
      fileName: { type: String },
      selectedFileLabel: { type: String },
      allowedExtensions: { type: Array },
      extensionErrorMessage: { type: String},
    };
  }
  
  constructor() {
    super();
    this.label = '';
    this.fileName = '';
    this.message = '';
    this.dropLabel = "Drop here your file";
    this.buttonLabel = "Select file";
    this.selectedFileLabel = "Selected file";
    this.extensionErrorMessage = "Only this file extensions are allowed: "
    this.allowedExtensions = [];
  } 

  firstUpdated() {
    this.firstMessage = this.message;
  }

  render() {
    return html`
      <main>
        ${this.label
          ? html`<label for="fileInput">${this.label}</label>`
          : ""
        }
      </main>
      <div
        id="dropZone"
        @click=${this.openFileDialog}
        @dragenter=${this.dragHover}
        @dragover=${this.dragHover}
        @dragleave=${this.dragLeave}
        @drop=${this.dragHandle}
      >
        ${this.dropLabelTemplate}
      </div>
      ${this.messageTemplate}
      <input type="file" id="fileInput" @change=${this._handleFileInput}>
      <dile-file-preview 
        fileName="${this.fileName}"
        selectedFileLabel="${this.selectedFileLabel}"
        @dile-file-clear=${this.clearInput}
      ></dile-file-preview>
    `;
  }

  get messageTemplate() {
    return html`
      ${this.message 
        ? html`<div class="message ${this.errored ? 'errored-msg' : ''}"><span>${this.message}</span></div>`
        : ''
      }
    `
  }

  get dropLabelTemplate() {
    return html`
      <p>${this.dropLabel}</p>
      <p><dile-button>${this.buttonLabel}</dile-button></p>
    `
  }

  get fileInput() {
    return this.renderRoot.querySelector('#fileInput');
  }

  dragHover(e) {
    this._preventDefaults(e); 
    this._toggleHover(true);
  }

  dragLeave(e) {
    this._preventDefaults(e); 
    this._toggleHover(false);
  }

  dragHandle(e) {
    this._handleDrop(e); 
    this._toggleHover(false);
  }

  _preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
  }

  _handleDrop(e) {
    this._preventDefaults(e);
    const dt = e.dataTransfer;
    const files = dt.files;
    this.fileInput.files = files;
    this._processFile(files);
  }

  _processFile(files) {
    if (files.length > 0) {
      console.log("Mostramos el nombre del archivo",files);
      this.fileName = files[0].name;
      if(this._isValidExtension(this.fileName)) {
        this.message = this.firstMessage || '';
        this.errored = false;
      } else {
        this.clearInput();
        this.message = `${this.extensionErrorMessage} ${this.allowedExtensions.join(', ')}`;
        this.errored = true;
      }
    }
  }

  _isValidExtension(fileName) {
    if(this.allowedExtensions.length === 0) {
      return true;
    }
    const extension = fileName.split('.').pop().toLowerCase();
    if(this.allowedExtensions.includes(extension)) {
      return true;
    }
    return false;
  }

  _handleFileInput(e) {
      this._processFile(this.fileInput.files);
  }

  _toggleHover(isHovering) {
    const dropZone = this.renderRoot.querySelector('#dropZone');
    if (isHovering) {
      dropZone.classList.add('hover');
    } else {
      dropZone.classList.remove('hover');
    }
  }

  openFileDialog() {
    this.fileInput.click();
  }
  
  clearInput() {
    this.fileInput.value = "";
    this.fileName = "";
  }

  getFiles() {
    return this.fileInput.files;
  }

  get value() {
    this.fileInput.value;
  }

  set value(value) {
    this.fileInput.value = value;
  }
  
}