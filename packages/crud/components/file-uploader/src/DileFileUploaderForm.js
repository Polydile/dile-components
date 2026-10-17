import { LitElement, html, css } from 'lit';
import { DileForm } from '@dile/ui/mixins/form/index.js'
import '@dile/ui/components/drop-file/drop-file.js';

export class DileFileUploaderForm extends DileForm(LitElement) {
  static styles = [
    css`
      :host {
        display: block;
      }
      dile-drop-file {
        margin-bottom: 0;
      }
    `
  ];

  static get properties() {
    return {
      label: { type: String },
      allowedExtensions: { type: Array },
      translations: { type: Object },
      multiple: { type: Boolean },
    };
  }

  render() {
    return html`
      <dile-drop-file 
        name="${this.multiple ? 'files' : 'file'}"
        label="${this.label}" 
        id="dropfile" 
        ?multiple=${this.multiple}
        .allowedExtensions=${this.allowedExtensions}
        dropLabel="${this.multiple ? this.translations.files_drop : this.translations.file_drop}"
        buttonLabel="${this.multiple ? this.translations.select_files : this.translations.select_file}"
        selectedFileLabel="${this.translations.selected_file}"
        extensionErrorMessage="${this.translations.extension_allowed}"
      ></dile-drop-file>
    `;
  }
}
