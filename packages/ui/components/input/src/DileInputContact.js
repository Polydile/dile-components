import { LitElement, html, css } from 'lit';
import { DileInput } from '../../input/index.js';

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

    firstUpdated() {
        super.firstUpdated();
        if(this.value !== '' && this.value !== undefined) {
            this._isValidInput();
        }
    }

    render() {
        return html`
            <div>
                ${this.label ? this.renderLabel : ''}
                ${this.renderInput}
                ${this.errored && this.messageError != '' ? this.renderMsgError : ''}
            </div>
        `;
    }

    get renderLabel() {
        return html`
            <label for="textField">${this.label}</label>
        `;
    }

    get renderInput() {
        return html`
            <input
                type="${this.availableType(this.type)}"
                id="textField"
                name="${this.name}"
                placeholder="${this.placeholder}"
                ?disabled="${this.disabled}"
                ?readonly="${this.readonly}"
                autocomplete="${this.disableAutocomplete ? "off" : "on"}"
                .value="${this.computeValue(this.value)}"
                class="${this.errored ? 'errored' : ''}"
                @keypress="${this._lookForEnter}"
                @input="${this._input}"
                @blur="${this._isValidInput}"
                @focus="${this.doFocus}"
            >
            </input>
        `;
    }

    get renderMsgError() {
        return html`
            <div class="message ${this.errored ? 'errored-msg' : ''}"><span>${this.messageError}</span></div>
        `;
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
                if(reMail.test(this.value) || this.value === ""){
                    this.valid = true;
                }else{
                    this.valid = false;
                }
            }
        }
        this.errored = !this.valid;
        console.log("Válido: " + this.valid);
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