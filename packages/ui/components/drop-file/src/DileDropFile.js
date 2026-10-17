import { LitElement, html, css } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import '../file-preview.js';
import '../../button/button.js';
import { labelStyles } from '../../input/src/label-styles.js';
import { messageStyles } from '../../input/src/message-styles.js';
import { DileEmmitChange } from '../../../mixins/form/index.js';

export class DileDropFile extends DileEmmitChange(LitElement) {
  static styles = [
    labelStyles,
    messageStyles,
    css`
      * { box-sizing: border-box; }
      :host {
        display: block;
        margin-bottom: 10px;
        padding-bottom: 1px;
      }
      #dropZone {
        width: 100%;
        min-height: var(--dile-drop-zone-min-height, auto);
        border: 2px dashed var(--dile-drop-zone-border-color, #ccc);
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
      extensionErrorMessage: { type: String },
      name: { type: String, reflect: true },
      accept: { type: String },
      capture: { type: String },
      multiple: { type: Boolean, reflect: true },
      files: { state: true },
    };
  }

  static get formAssociated() {
    return true;
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
    this.accept = '';
    this.capture = '';
    this.multiple = false;
    this.files = [];
    this.internals = this.attachInternals();
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
      <input type="file" id="fileInput" ?multiple=${this.multiple} @change=${this._handleFileInput} accept=${ifDefined(this.accept || undefined)} capture=${ifDefined(this.capture || undefined)}>
      ${this.multiple
        ? this.files.map((file, index) => html`
          <dile-file-preview
            fileName="${file.name}"
            selectedFileLabel="${this.selectedFileLabel}"
            @dile-file-clear=${() => this.removeFile(index)}
          ></dile-file-preview>
        `)
        : html`
          <dile-file-preview 
            fileName="${this.fileName}"
            selectedFileLabel="${this.selectedFileLabel}"
            @dile-file-clear=${this.clear}
          ></dile-file-preview>
        `
      }
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
    if (this.multiple) {
      this._processMultipleFiles(files);
      return;
    }
    this.internals.setFormValue(files.length > 0 ? files[0] : null);
    if (files.length > 0) {
      this.fileName = files[0].name;
      this.emmitChange();
      this._emitDropFileChanged(files[0]);
      if(this._isValidExtension(this.fileName)) {
        this.message = this.firstMessage || '';
        this.errored = false;
      } else {
        this.clear();
        this.message = `${this.extensionErrorMessage} ${this.allowedExtensions.join(', ')}`;
        this.errored = true;
      }
    }
  }

  _processMultipleFiles(files) {
    const incoming = Array.from(files);
    if (incoming.length === 0) {
      // Restore the input files, as a canceled dialog empties it
      this._syncFileInput();
      return;
    }
    const validFiles = incoming.filter(file => this._isValidExtension(file.name));
    const newFiles = validFiles.filter(file => !this.files.some(current => this._isSameFile(current, file)));
    this.files = [...this.files, ...newFiles];
    if (validFiles.length < incoming.length) {
      this.message = `${this.extensionErrorMessage} ${this.allowedExtensions.join(', ')}`;
      this.errored = true;
    } else {
      this.message = this.firstMessage || '';
      this.errored = false;
    }
    this._syncFiles();
  }

  _isSameFile(a, b) {
    return a.name === b.name && a.size === b.size && a.lastModified === b.lastModified;
  }

  _syncFileInput() {
    if (!this.fileInput) return;
    const dataTransfer = new DataTransfer();
    this.files.forEach(file => dataTransfer.items.add(file));
    this.fileInput.files = dataTransfer.files;
  }

  _syncFiles() {
    this._syncFileInput();
    if (this.files.length > 0) {
      const formData = new FormData();
      this.files.forEach(file => formData.append(this.name || 'files', file));
      this.internals.setFormValue(formData);
    } else {
      this.internals.setFormValue(null);
    }
    this.emmitChange();
    this._emitDropFileChanged(this.files[0] || null);
  }

  removeFile(index) {
    if (index < 0 || index >= this.files.length) return;
    this.files = this.files.filter((_, i) => i !== index);
    this._syncFiles();
  }

  _isValidExtension(fileName) {
    if(this.allowedExtensions.length === 0) {
      return true;
    }
    // If wildcard '*' is present, allow any extension
    if(this.allowedExtensions.includes('*')) {
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

  _emitDropFileChanged(file) {
    this.dispatchEvent(new CustomEvent('dile-drop-file-changed', {
      bubbles: true,
      composed: true,
      detail: {
        file: file,
        files: this.multiple ? [...this.files] : (file ? [file] : []),
      }
    }));
  }

  openFileDialog() {
    this.fileInput.click();
  }
  
  clear() {
    this.fileInput.value = "";
    this.fileName = "";
    this.files = [];
    this.internals.setFormValue(null);
    this._emitDropFileChanged(null);
    this.emmitChange();
  }

  getFiles() {
    if (this.multiple) {
      return [...this.files];
    }
    return this.fileInput.files;
  }

  get value() {
    if (this.multiple) {
      return [...this.files];
    }
    if(this.fileInput) {
      return this.fileInput.files[0];
    } else {
      return '';
    }
  }

  set value(value) {
    // this.fileInput.value = value;
  }

}