import { LitElement, html, css } from 'lit';
import '../../ajax-form/ajax-form.js';
import '../image-uploader-form.js';
import { ResponseApiAdapter } from '../../../lib/ResponseApiAdapter.js';
import { DileI18nMixin } from '../../../lib/DileI18nMixin.js';

export class DileImageUploader extends DileI18nMixin(LitElement) {
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
      selectImageLabel: { type: String },
      saveLabel: { type: String },
      allowedExtensions: { type: Array },
      responseAdapter: { type: Object },
    };
  }
  
  constructor() {
    super();
    this.responseAdapter = new ResponseApiAdapter();
    this.allowedExtensions = ['jpeg', 'jpg', 'png'];
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
        @save-success=${this.imageSaveSuccess}
        .responseAdapter=${this.responseAdapter}
      >
        <dile-image-uploader-form 
          id="form"
          label="${this.selectLabelComputed(this.selectImageLabel, this.translations)}"
          .allowedExtensions=${this.allowedExtensions}
          .translations=${this.translations}
        ></dile-image-uploader-form>
      </dile-ajax-form>
    `;
  }

  selectLabelComputed(label, translations) {
      return label ? label : translations?.select_image ? translations.select_image : 'Select an image';
  }

  saveLabelComputed(label, translations) {
    return label ? label : translations?.save_image ? translations.save_image : 'Save image';
}

  imageSaveSuccess(e) {
    this.dispatchEvent(new CustomEvent('image-uploaded', {
      bubbles: true,
      composed: true,
      detail: e.detail
    }));
  }

}