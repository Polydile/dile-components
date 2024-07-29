import { LitElement, html, css } from 'lit';
import '../../ajax-form/ajax-form.js'
import { formStyles } from '../../../styles/form-styles.js';

export class DileCrudInsert extends LitElement {
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
            apiConfig: { type: Object},
            formIdentifier: { type: String },
        };
    }

    constructor() {
        super();
        this.actionLabel = 'Insert';
        this.formIdentifier = 'form';
    }

    get formElement() {
        return this.shadowRoot.getElementById(this.formId);
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
                actionLabel="${this.actionLabel}"
                @save-success="${this.doSuccessSave}"
                ?buttonSmall="${this.buttonSmall}"
                responseDataProperty="${this.apiConfig.responseDataProperty}"
                responseMessageProperty="${this.apiConfig.responseMessageProperty}"
                validationErrorsProperty="${this.apiConfig.validationErrorsProperty}"
                formIdentifier="${this.formIdentifier}"
            >
                ${this.formTemplate}
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
        console.log('han invocado a setData', data);
        
        this.updateComplete.then(() => {
            this.formElement.setData(data);    
        });
        
    }

    clearFeedback() {
        this.formElement.clearFeedback();
    }
}
