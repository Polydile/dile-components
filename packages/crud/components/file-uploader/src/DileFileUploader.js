import { LitElement, html, css } from 'lit';
import '../../ajax-form/ajax-form.js';
import '../file-uploader-form.js';
import { ResponseApiAdapter } from '../../../lib/ResponseApiAdapter.js';
import { DileI18nMixin } from '../../../lib/DileI18nMixin.js';

export class DileFileUploader extends DileI18nMixin(LitElement) {
  static styles = [
    css`
      :host {
        display: block;
      }
    `
  ];

  static get properties() {
    return {
      endpoint: { type: String },
      selectFileLabel: { type: String },
      saveLabel: { type: String },
      allowedExtensions: { type: Array },
      responseAdapter: { type: Object },
    };
  }
  
  constructor() {
    super();
    this.responseAdapter = new ResponseApiAdapter();
    this.allowedExtensions = ['*'];
  }

  render() {
    return html`
      <dile-ajax-form 
        id="elform"
        operation="insert"
        endpoint=${this.endpoint}
        actionLabel="${this.saveLabelComputed(this.saveLabel, this.translations)}"
        sendDataAsFormData
        language="${this.language}"
        @save-success=${this.fileSaveSuccess}
        .responseAdapter=${this.responseAdapter}
      >
        <dile-file-uploader-form 
          id="form"
          label="${this.selectLabelComputed(this.selectFileLabel, this.translations)}"
          .allowedExtensions=${this.allowedExtensions}
          .translations=${this.translations}
        ></dile-file-uploader-form>
      </dile-ajax-form>
    `;
  }

  selectLabelComputed(label, translations) {
    return label ? label : translations?.select_file_label ? translations.select_file_label : 'Select a file';
  }

  saveLabelComputed(label, translations) {
    return label ? label : translations?.save_file_label ? translations.save_file_label : 'Save file';
  }

  fileSaveSuccess(e) {
    this.dispatchEvent(new CustomEvent('file-uploaded', {
      bubbles: true,
      composed: true,
      detail: e.detail
    }));
  }
}
