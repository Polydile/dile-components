import { LitElement, html, css } from 'lit';
import '../../ajax-form/ajax-form.js'
import { formStyles } from '../../../styles/form-styles.js';
import { ResponseApiAdapter } from '../../../lib/ResponseApiAdapter.js';
import { DileI18nMixin } from '../../../lib/DileI18nMixin.js';

export class DileCrudUpdate extends DileI18nMixin(LitElement) {
  static styles = [
    formStyles,
    css`
            
        `
  ];

  static get properties() {
    return {
      title: { type: String },
      relatedId: { type: String },
      endpoint: { type: String },
      actionLabel: { type: String },
      loadOnInit: { type: Boolean },
      formTemplate: { type: Object },
      buttonSmall: { type: Boolean },
      responseAdapter: { type: Object },
      formIdentifier: { type: String },
      sendDataAsFormData: { type: Boolean },
      showCancelButton: { type: Boolean },
      data: { type: Object },
      setDataOnInit: { type: Boolean },
    };
  }

  constructor() {
    super();
    this.responseAdapter = new ResponseApiAdapter();
    this.loadOnInit = false;
    this.formIdentifier = 'updateform';
  }

  get formElement() {
    return this.shadowRoot.getElementById('elform');
  }

  render() {
    return html`
      ${this.titleTemplate}
      ${this.ajaxFormTemplate}
    `;
  }

  get titleTemplate() {
    return html`
        ${this.title
            ? html`<h1>${this.title}</h1>`
            : ''
        }    
    `;
  }

  get ajaxFormTemplate() {
    return html`
        <dile-ajax-form
            id="elform"
            operation="update"
            endpoint="${this.endpoint}"
            actionLabel="${this.actionLabelComputed(this.actionLabel, this.translations)}"
            @save-success="${this.doSuccessSave}"
            ?buttonSmall="${this.buttonSmall}"
            relatedId="${this.relatedId}"
            ?loadOnInit="${this.loadOnInit}"
            .responseAdapter="${this.responseAdapter}"
            formIdentifier="${this.formIdentifier}"
            language="${this.language}"
            ?sendDataAsFormData=${this.sendDataAsFormData}
            ?showCancelButton=${this.showCancelButton}
            ?setDataOnInit=${this.setDataOnInit}
            .data=${this.data}
        >
            ${this.formTemplate()}
        </dile-ajax-form>
    `;
  }

  doSuccessSave(e) {
    this.dispatchEvent(new CustomEvent('crud-update-success', {
      bubbles: true,
      composed: true,
      detail: e.detail
    }));
  }

  edit(id) {
    this.relatedId = id;
    this.updateComplete.then(() => {
      this.formElement.loadData();
    });
  }

  clearFeedback() {
    this.formElement.clearFeedback();
  }

  actionLabelComputed(label, translations) {
    return label ? label : translations?.update_label ? translations.update_label : 'Update';
  }
}
