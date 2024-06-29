import { LitElement, html, css } from 'lit';
import '../../ajax-form/ajax-form.js'
import { formStyles } from '../../../styles/form-styles.js';

export class DileCrudUpdate extends LitElement {
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
            apiConfig: { type: Object}
        };
    }

    constructor() {
        super();
        this.actionLabel = 'Update';
        this.loadOnInit = false;
    }

    get formElement() {
        return this.shadowRoot.getElementById('elform');
    }

    render() {
        return html`
            ${this.title
                ? html`<h1>${this.title}</h1>`
                : ''
            }
            <dile-ajax-form
                id="elform"
                operation="update"
                endpoint="${this.endpoint}"
                actionLabel="${this.actionLabel}"
                @save-success="${this.doSuccessSave}"
                ?buttonSmall="${this.buttonSmall}"
                relatedId="${this.relatedId}"
                ?loadOnInit="${this.loadOnInit}"
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

    edit(id) {
        // console.log('voy a load data ', id);
        this.relatedId = id;
        this.updateComplete.then(() => {
            this.formElement.loadData();
        });
    }
}
