import { LitElement, html, css } from 'lit';
import { DileForm } from '@dile/ui/mixins/form/index.js'
import "@dile/ui/components/drop-file/drop-file.js"

export class DileImageUploaderForm extends DileForm(LitElement) {
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
    };
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
      ></dile-drop-file>
    `;
  }
}
