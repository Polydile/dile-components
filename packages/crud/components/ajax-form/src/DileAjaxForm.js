import { LitElement, html, css } from 'lit';
import '../../ajax/ajax.js';
import '@dile/ui/components/button/button.js';
import '@dile/ui/components/inline-feedback/inline-feedback.js';
import {capitalizeFirstLetter} from '../../../lib/capitalizeString.js';
import { ResponseApiAdapter } from '../../../lib/ResponseApiAdapter.js';
import { DileI18nMixin } from '../../../lib/DileI18nMixin.js';

export class DileAjaxForm extends DileI18nMixin(LitElement) {
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
                margin-top: var(--dile-ajax-form-actions-margin-top, 1rem);
                padding-left: 3px;
                display: flex; 
                gap: var(--dile-form-actions-gap, 1.2rem);
                justify-content: var(--dile-form-actions-justify-content, flex-start);
            }
            .cancel_button {
                --dile-primary-color: var(--dile-ajax-form-cancel-button-background-color, transparent);
                --dile-on-primary-color: var(--dile-ajax-form-cancel-button-text-color, #303030);
                --dile-primary-dark-color: var(--dile-ajax-form-cancel-button-border-color, transparent);
                --dile-button-hover-background-color: var(--dile-ajax-form-cancel-button-hover-background-color, transparent);
                --dile-button-hover-text-color: var(--dile-ajax-form-cancel-button-hover-text-color, #303030);
                --dile-button-hover-border-color: var(--dile-ajax-form-cancel-button-hover-border-color, #303030);
            }
            :host([inline]) section {
                display: flex;
                align-items: center;
                gap: var(--inline-gap, 1rem);
            }
            :host([inline]) dile-inline-feedback {
                display: none;
            }
            :host([hidefeedback]) dile-inline-feedback {
                display: none;
            }
            .actionIcon {
                --dile-icon-color: var(--action-icon-color, var(--dile-primary-color, #674cdc));
            }
            .cancelIcon {
                --dile-icon-color: var(--cancel-icon-color, #d74c3c);
            }
        `
    ];

    static get properties() {
      return {
        operation: { type: String },
        endpoint: { type: String },
        actionLabel: { type: String },
        cancelLabel: { type: String },
        data: { type: Object },
        relatedId: { type: String },
        loadOnInit: { type: Boolean },
        buttonSmall: { type: Boolean, reflect: true },
        formIdentifier: { type: String, },
        setDataOnInit: { type: Boolean },
        responseAdapter: { type: Object },
        sendDataAsFormData: { type: Boolean },
        showCancelButton: { type: Boolean },
        inline: { type: Boolean, reflect: true },
        actionIcon: { type: Object },
        cancelIcon: { type: Object },
        disableClearAfterInsert: { type: Boolean },
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
    }

    get form() {
        return this.querySelector('#' + this.formIdentifier);
    }

    actionLabelComputed(label, translations, operation) {
        if(label) {
            return label;
        }
        if(! translations) {
            return operation == 'insert' ? 'Insert' : 'Update';
        }
        if(operation == 'insert') {
            return translations.insert_label;
        }
        if(operation == 'update') {
            return translations.update_label;
        }
        return translations.send_label;
    }

    cancelLabelComputed(label, translations) {
        if(label) {
            return label;
        }
        return translations ? translations.cancel_label : 'Cancel';
    }

    render() {
        return html`
            ${this.ajaxComponents}
            <section>
                <slot></slot>
                ${this.inline ? this.actionsTemplate : ''}
            </section>
            <dile-inline-feedback id="feedback"></dile-inline-feedback>
            ${this.inline ? '' : this.actionsTemplate}
        `;
    }

    get actionsTemplate() {
        return html`
            <div class="actions">
                ${this.actionIcon 
                    ? html`<a href="#" @click=${this.doActionHandler}><dile-icon .icon=${this.actionIcon} class="actionIcon"></dile-icon></a>`
                    : html`<dile-button @click=${this.doActionHandler}>${this.actionLabelComputed(this.actionLabel, this.translations, this.operation)}</dile-button>`
                }
                ${this.showCancelButton ? 
                    this.cancelIcon 
                        ? html`<a href="#" @click=${this.doCancel}><dile-icon @click=${this.doActionHandler} .icon=${this.cancelIcon} class="cancelIcon"></dile-icon></a>`
                        : html`<dile-button class="cancel_button" @click=${this.doCancel}>${this.cancelLabelComputed(this.cancelLabel, this.translations)}</dile-button>`
                    : ''
                }
            </div> 
        `
    }

    get ajaxComponents() {
        return html`
            <dile-ajax
                id="ajaxget"
                method="get"
                url="${this.endpoint}/${this.relatedId}"
                @ajax-success="${this.doSuccessGet}"
                @ajax-error="${this.doErrorGet}"
                language="${this.language}"
            ></dile-ajax>
            <dile-ajax
                id="ajaxsave"
                method="${this.saveMethod(this.operation)}"
                url="${this.endpoint}${this.operation == 'insert' ? '' : `/${this.relatedId}`}"
                @ajax-success="${this.doSuccessSave}"
                @ajax-error="${this.doErrorSave}"
                language="${this.language}"
                ?sendDataAsFormData=${this.sendDataAsFormData}
            ></dile-ajax>
        `
    }

    loadData() {
        this.updateComplete.then(()=> {
            if(this.ajaxget) {
                this.ajaxget.generateRequest();
            } else {
                setTimeout(() => this.loadData(), 100);
            }
        })
    }

    doActionHandler(e) {
        e.preventDefault();
        this.doAction();
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
        if(this.operation == 'insert' && !this.disableClearAfterInsert) {
            this.clearForm();
        }
        this.dispatchEvent(new CustomEvent('save-success', { 
            bubbles: true,
            composed: true,
            detail: {
                data,
                msg,
                previousDetail: e.detail
            }
        }));
        
    }

    saveMethod(operation) {
        switch(operation) {
            case 'insert':
                return 'post';
            case 'update':
                return 'put';
        }
        throw this.translations.ajax_form_not_supported;
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
            return this.translations.success_operation(this.operation);
        } 
        return this.translations.error_operation(this.operation);
    }

    doCancel(e) {
        e.preventDefault();
        this.dispatchEvent(new CustomEvent('form-canceled', {
            bubbles: true,
            composed: true,
            detail: {
                data: this.form.getData(),
                isDirty: this.form.isDirty(),
            }
        }));
    }

    clearForm() {
        this.form.clearData();
    }
}

