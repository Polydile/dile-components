import { LitElement, html, css } from 'lit';
import '../../ajax-form/ajax-form.js'
import { formStyles } from '../../../styles/form-styles.js';
import { ResponseApiAdapter } from '../../../lib/ResponseApiAdapter.js';
import { DileI18nMixin } from '../../../lib/DileI18nMixin.js';

export class DileCrudInsert extends DileI18nMixin(LitElement) {
    static styles = [
        formStyles,
        css`
            
        `
    ];
    
    static get properties() {
        return {
            title: { type: String },
            endpoint: { type: String },
            actionLabel: { type: String },
            belongsTo: { type: String },
            relationId: { type: String },
            formTemplate: { type: Object },
            buttonSmall: { type: Boolean },
            responseAdapter: { type: Object},
            formIdentifier: { type: String },
            sendDataAsFormData: { type: Boolean },
            showCancelButton: { type: Boolean },
        };
    }

    constructor() {
        super();
        this.responseAdapter = new ResponseApiAdapter();
        this.formIdentifier = 'insertform';
    }

    get formElement() {
        return this.shadowRoot.getElementById(this.formIdentifier);
    }

    render() {
        return html`
            ${this.title
                ? html`<h1>${this.title}</h1>`
                : ''
            }
            
            <dile-ajax-form
                operation="insert"
                endpoint="${this.endpoint}"
                actionLabel="${this.actionLabelComputed(this.actionLabel, this.translations)}"
                @save-success="${this.doSuccessSave}"
                ?buttonSmall="${this.buttonSmall}"
                .responseAdapter="${this.responseAdapter}"
                formIdentifier="${this.formIdentifier}"
                language="${this.language}"
                ?sendDataAsFormData=${this.sendDataAsFormData}
                ?showCancelButton=${this.showCancelButton}
            >
                ${this.formTemplate(this.belongsTo, this.relationId)}
            </dile-ajax-form> 
        `;
    }

    doSuccessSave(e) {
        this.dispatchEvent(new CustomEvent('crud-insert-success', { 
            bubbles: true,
            composed: true,
            detail: e.detail
        }));
    }

    setData(data) {        
        this.updateComplete.then(() => {
            this.formElement.setData(data);    
        });
        
    }

    clearFeedback() {
        this.formElement.clearFeedback();
    }

    actionLabelComputed(label, translations) {
        return label ? label : translations?.insert_label ? translations.insert_label : 'Insert';
    }
}
