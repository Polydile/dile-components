import { LitElement, html, css } from 'lit';
import '../../ajax/ajax.js';
import '@dile/ui/components/button/button.js';
import '@dile/ui/components/inline-feedback/inline-feedback.js';
import {capitalizeFirstLetter} from '../../../lib/capitalizeString.js';
import { ResponseApiAdapter } from '../../../lib/ResponseApiAdapter.js';

export class DileAjaxForm extends LitElement {
    static styles = [
        css`
            :host {
                display: block;
            }
            :host([buttonSmall]) {
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
        responseAdapter: { type: Object },
      };
    }

    constructor() {
        super();
        this.responseAdapter = new ResponseApiAdapter();
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
        if(this.ajaxget) {
            this.ajaxget.generateRequest();
        } else {
            setTimeout(() => this.loadData(), 100);
        }
    }

    doAction() {
        this.feedback.clear();
        this.ajaxsave.data = this.form.getData();
        this.ajaxsave.generateRequest();
    }

    doErrorGet(e) {
        this.responseAdapter.setResponse(e.detail);
        let msg = this._customErrorMessage();
        this.feedback.negativeFeedback(msg);
        this.dispatchEvent(new CustomEvent('dile-ajax-form-get-error', { 
            bubbles: true,
            composed: true,
            detail: {
                msg: msg,
                previousDetail: e.detail
            }
        }));
    }

    doSuccessGet(e) {
        this.responseAdapter.setResponse(e.detail);
        let data = this.responseAdapter.getData()
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
        this.responseAdapter.setResponse(e.detail);
        let msg = this._customErrorMessage();
        this.feedback.negativeFeedbackWithDelay(msg, 5000);
        let validationErrors = this.responseAdapter.getValidationErrors();
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
        this.responseAdapter.setResponse(e.detail);
        let data = this.responseAdapter.getData();
        let msg = this._customSuccessMessage();
        this.feedback.positiveFeedbackWithDelay(msg, 5000);
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
        throw "Operation not supported in fct-ajax-form use 'insert' or 'update'";
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

    _customErrorMessage() {
        return this._customMessage(false);
    }

    _customSuccessMessage() {
        return this._customMessage(true);
    }
    
    _customMessage(success) {
        let message = this.responseAdapter.getMessage();
        if(message) {
            return message;
        }
        if(success) {
            return `Success ${this.operation}`;
        } 
        return `Error ${this.operation}`;
    }
}

