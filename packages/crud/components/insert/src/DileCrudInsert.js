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
            apiConfig: { type: Object}
        };
    }

    constructor() {
        super();
        this.actionLabel = 'Insert';
    }

    get formElement() {
        return this.shadowRoot.getElementById('form');
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
            >
                ${this.formTemplate}
            </dile-ajax-form> 
        `;
    }

    doSuccessSave() {
        //
    }

    setData(data) {
        console.log('han invocado a setData', data);
        
        this.updateComplete.then(() => {
            this.formElement.setData(data);    
        });
        
    }
}
