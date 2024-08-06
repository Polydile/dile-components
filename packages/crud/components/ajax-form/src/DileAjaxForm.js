import { LitElement, html, css } from 'lit';
import '../../ajax/ajax.js';
import '@dile/ui/components/button/button.js';
import '@dile/ui/components/inline-feedback/inline-feedback.js';
import {capitalizeFirstLetter} from '../../../lib/capitalizeString.js';

export class DileAjaxForm extends LitElement {
    static styles = [
        css`
            :host {
                display: block;
            }
            :host([small]) {
                --dile-button-padding-y: 0.25rem;
                --dile-button-padding-x: 0.5rem;
                --dile-button-font-size: 0.875rem;
            }
            .actions {
                margin-top: var(--dile-ajax-form-actions-margin-top, 1.2rem);
                padding-left: 3px;
            }
        `
    ];

    static get properties() {
      return {
        operation: { type: String },
        endpoint: { type: String },
        actionLabel: { type: String },
        data: { type: Object },
        relatedId: { type: String },
        loadOnInit: { type: Boolean },
        buttonSmall: { type: Boolean, reflect: true },
        formIdentifier: { type: String, },
        setDataOnInit: { type: Boolean },
        responseDataProperty: { type: String },
        responseMessageProperty: { type: String },
        validationErrorsProperty: { type: String },
        apiConfig: { type: Object },
      };
    }

    constructor() {
        super();
        this.formIdentifier = 'form';
        this.operation = '';
    }

    updated(changedProperties) {
        if (changedProperties.has('relatedId') || changedProperties.has('endpoint')) {
            if(this.loadOnInit) {
                this.loadData();
            }
        }
    }

    firstUpdated() {
        this.feedback = this.shadowRoot.getElementById('feedback');
        this.ajaxsave = this.shadowRoot.getElementById('ajaxsave');
        this.ajaxget = this.shadowRoot.getElementById('ajaxget');
        if(this.setDataOnInit) {
            this.initData();
        }
        if(!this.actionLabel) {
            this.actionLabel = capitalizeFirstLetter(this.operation);
        }
    }

    get form() {
        // console.log('get form', this.formIdentifier, this);
        return this.querySelector('#' + this.formIdentifier);
    }

    render() {
        return html`
            ${this.ajaxComponents}
            <slot></slot>
            <dile-inline-feedback id="feedback"></dile-inline-feedback>
            <div class="actions">
                <dile-button @click=${this.doAction}>${this.actionLabel}</dile-button>
            </div> 
        `;
    }

    get ajaxComponents() {
        return html`
            <dile-ajax
                id="ajaxget"
                method="get"
                url="${this.endpoint}/${this.relatedId}"
                @ajax-success="${this.doSuccessGet}"
                @ajax-error="${this.doErrorGet}"
            ></dile-ajax>
            <dile-ajax
                id="ajaxsave"
                method="${this.saveMethod(this.operation)}"
                url="${this.endpoint}${this.operation == 'insert' ? '' : `/${this.relatedId}`}"
                @ajax-success="${this.doSuccessSave}"
                @ajax-error="${this.doErrorSave}"
            ></dile-ajax>
        `
    }

    loadData() {
        this.ajaxget.generateRequest();
    }

    doAction() {
        this.feedback.clear();
        this.ajaxsave.data = this.form.getData();
        this.ajaxsave.generateRequest();
    }

    doErrorGet(e) {
        this.feedback.negativeFeedback(e.detail.message);
        this.dispatchEvent(new CustomEvent('dile-ajax-form-get-error', { 
            bubbles: true,
            composed: true,
            detail: {
                msg: e.detail,
            }
        }));
    }

    doSuccessGet(e) {
        let data = this.customData(e.detail)
        this.form.setData(data);
        this.form.clearErrors();
        this.feedback.clear();
        this.dispatchEvent(new CustomEvent('dile-ajax-form-loaded', {
            bubbles: true,
            composed: true,
            detail: {
                data,
                previousDetail: e.detail
            }
        }));
    }
    
    doErrorSave(e) {
        let msg = this.customMessage(e.detail, true);
        this.feedback.negativeFeedbackWithDelay(e.detail.message, 5000);
        let validationErrors = this.validationErrors(e.detail);
        this.form.showErrors(validationErrors);
        this.dispatchEvent(new CustomEvent('save-error', { 
            bubbles: true,
            composed: true,
            detail: {
                msg, 
                validationErrors,
                previousDetail: e.detail
            }
        }));
    }

    doSuccessSave(e) {
        let msg = this.customMessage(e.detail, true);
        this.feedback.positiveFeedbackWithDelay(msg, 5000);
        let data = this.customData(e.detail);
        this.dispatchEvent(new CustomEvent('save-success', { 
            bubbles: true,
            composed: true,
            detail: {
                data,
                msg,
                previousDetail: e.detail
            }
        }));
        if(this.operation == 'insert') {
            this.form.clearData();
        }
    }

    saveMethod(operation) {
        switch(operation) {
            case 'insert':
                return 'post';
            case 'update':
                return 'put';
        }
        throw "Operation not supported in fct-ajax-form, only available 'insert' / 'update'";
    }

    clearErrors() {
        this.form.clearErrors();
        this.feedback.clear();
    }

    clearFeedback() {
        this.feedback.clear();
    }

    initData() {
        if(this.form && this.form.setData) {
            setTimeout(() => this.form.setData(this.data), 300);
        } else {
            setTimeout(this.initData.bind(this), 100);
        }
    }

    customMessage(detail, success) {
        if(this.apiConfig) {
            return this.apiConfig.responseMessageGetter(detail);
        }
        if (this.responseMessageProperty && detail[this.responseMessageProperty]) {
            return detail[this.responseMessageProperty];
        }
        if(success) {
            return `Success ${this.operation}`;
        } 
        return `Error ${this.operation}`;
    }

    customData(detail) {
        if (this.apiConfig) {
            return this.apiConfig.responseDataGetter(detail);
        }
        if(this.responseDataProperty && detail[this.responseDataProperty]) {
            return detail[this.responseDataProperty];
        }
        return data;
    }

    validationErrors(detail) {
        if (this.apiConfig) {
            return this.apiConfig.validationErrorsGetter(detail);
        }
        if(this.validationErrorsProperty && detail[this.validationErrorsProperty]) {
            return detail[this.validationErrorsProperty];
        }
        return [];
    }
}

