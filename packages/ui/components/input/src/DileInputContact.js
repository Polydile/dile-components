import { html } from 'lit';
import { DileInput } from './DileInput.js';
import { FIELD_MESSAGE_ID } from '../../../mixins/form/index.js';

let deprecationWarned = false;

/**
 * Input that validates Spanish phone / mobile / fax numbers or an email on blur.
 *
 * @deprecated Not maintained and not documented publicly. It will be removed in a future
 * major version. Use `dile-input-phone` (from `@dile/utils`) for phone numbers and
 * `dile-input` with `type="email"` plus form validation for emails.
 */
export class DileInputContact extends DileInput {

    static get properties() {
      return {
        value: { type: String },
        phone: { type: Boolean },
        mobile: { type: Boolean },
        fax: { type: Boolean },
        email: { type: Boolean },
        messageError: { type: String }
      };
    }

    constructor() {
        super();
        this.valid = true;
    }

    connectedCallback() {
        super.connectedCallback();
        if (!deprecationWarned) {
            deprecationWarned = true;
            console.warn('dile-input-contact is deprecated and will be removed in a future major version. Use dile-input-phone (@dile/utils) for phone numbers or dile-input type="email" for emails.');
        }
    }

    firstUpdated() {
        super.firstUpdated();
        if(this.value !== '' && this.value !== undefined) {
            this._isValidInput();
        }
    }

    /** Shows messageError while the value is not valid, otherwise the regular message */
    get messageTemplate() {
        if (this.showMessageError) {
            return html`
                <div id="${FIELD_MESSAGE_ID}" class="message errored-msg"><span>${this.messageError}</span></div>
            `;
        }
        return super.messageTemplate;
    }

    get showMessageError() {
        return this.errored && !!this.messageError;
    }

    get messageDescribedBy() {
        return this.showMessageError ? FIELD_MESSAGE_ID : super.messageDescribedBy;
    }

    doBlur() {
        this._isValidInput();
    }

    _input(ev) {
        this.value = ev.target.value;
        this.dispatchEvent(new CustomEvent('dile-input-contact-input', {
            bubbles: true,
            composed: true,
            detail: {
                value: this.value
            }
        }));
        if (this.hideErrorOnInput && this.errored) {
            this.clearError();
        }
    }

    _isValidInput() {
        const rePhone = /^(\+34|0034|34)?[89]\d{8}$/;
        const reMobile = /^(\+34|0034|34)?[67]\d{8}$/;
        const reMail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(this.value === '') {
            this.valid = true;
        } else {
            if (this.phone || this.fax) {
                if (rePhone.test(this.value) || this.value === "") {
                    this._isPhone = this.phone;
                    this._isFax = this.fax;
                    this.valid = true;
                } else {
                    this.valid = false;
                }
            } else if (this.mobile) {
                this._isMobile = true;
                if (reMobile.test(this.value) || this.value === "") {
                    this.valid = true;
                } else {
                    this.valid = false;
                }
            } else if(this.email) {
                this._isMail = true;
                if(reMail.test(this.value) || this.value === ""){
                    this.valid = true;
                }else{
                    this.valid = false;
                }
            }
        }
        this.errored = !this.valid;
        this.dispatchEvent(
            new CustomEvent('dile-input-contact-blur', {
            bubbles: true,
            composed: true,
            detail: {
                value: this.value,
                isValid: this.valid,
                isMobile: this._isMobile,
                isPhone: this._isPhone,
                isFax: this._isFax,
                isMail: this._isMail
            }
          }),
        );
    }
}