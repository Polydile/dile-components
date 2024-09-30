import { LitElement, html, css } from 'lit';
import { clearIcon, imageIcon, pdfIcon, videocamIcon, draftIcon, folderZipIcon } from '@dile/icons';
import '../../icon/icon.js';

export class DileFilePreview extends LitElement {
  static styles = [
    css`
      * { box-sizing: border-box }
      :host {
        display: block;
        margin-top: var(--dile-file-preview-margin-top, 7px);
      }
      div {
        display: flex;
        align-items: center;
        width: 100%;
        background-color: var(--dile-file-preview-background-color, #eee);
        color: var(--dile-file-preview-color, #303030);
        padding: var(--dile-file-preview-padding, 0.5rem 1rem);
        border-radius: var(--dile-file-preview-border-radius, 1rem);
        font-size: var(--dile-file-preview-font-size, 0.8rem);
      }
      div span {
        flex-grow: 1;
        margin: 0 0.75rem;
      }
      .clearicon {
        --dile-icon-color: var(--dile-file-preview-clear-icon-color, #39f);
      }
      .fileicon {
        --dile-icon-color: var(--dile-file-preview-file-icon-color, #303030);
      }
    `
  ];

  static get properties() {
    return {
      fileName: { type: String },
      fileExtension: { type: String },
      fileIcon:  { type: Object },
      selectedFileLabel: { type: String },
    };
  }

  constructor() {
    super();
    this.fileIcon = draftIcon;
    this.availableExtensions = [
      {
        extensions: ['png', 'jpg', 'jpeg', 'gif'],
        icon: imageIcon, 
      },
      {
        extensions: ['pdf'],
        icon: pdfIcon, 
      },
      {
        extensions: ['mp4', 'avi', 'mkv', 'mov'],
        icon: videocamIcon,
      },
      {
        extensions: ['zip', 'gz', 'rar'],
        icon: folderZipIcon,
      },
    ]
  }

  render() {
    return html`
      ${this.fileName
        ? html`
          <div>
            <dile-icon class="fileicon" .icon=${this.fileIcon}></dile-icon>
            <span>${this.selectedFileLabel}: ${this.fileName}</span>
            <a href="#" @click=${this.dispatchClear}><dile-icon class="clearicon" .icon="${clearIcon}"></dile-icon></a>
          </div>
        `
        : ''
      }
    `;
  }

  updated(changedProperties) {
    if(changedProperties.has('fileName')) {
      this.fileExtension = this._getFileExtension(this.fileName);
      this.fileIcon = this._getIconFromExtension(this.fileExtension);
    }
  }

  _getFileExtension(fileName) {
    return fileName.split('.').pop().toLowerCase();
  }

  _getIconFromExtension(fileExtension) {
    const extensionMatch = this.availableExtensions.find(item =>
      item.extensions.includes(fileExtension)
    );
    return extensionMatch ? extensionMatch.icon : draftIcon;
  }

  dispatchClear(e) {
    e.preventDefault();
    this.dispatchEvent(new CustomEvent('dile-file-clear', {
      bubbles: true,
      composed: true,
      detail: {
        fileName: this.fileName
      }
    }));
  }
}
