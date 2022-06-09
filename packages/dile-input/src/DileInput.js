import { LitElement, html, css } from 'lit';
import { DileEmmitChangeMixin } from '@dile/dile-form-mixin'; 

export class DileInput extends DileEmmitChangeMixin(LitElement) {

    /**
     * Fired when user press enter key.
     *
     * @event enter-pressed
     */

    /**
     * Liten to the native input event to recive text input updates
     *
     * @event input
     */

    static get properties() {
        return {
          /** Label to the element */
          label: { type: String },

          /** Input type */
          type: { type: String },

          /** Set a placeholder to the input element */
          placeholder: { type: String },

          /** Disable the input field */
          disabled: { type: Boolean },

          /** Set initial value to the input. This property syncs to the input field value property */
          value: { type: String },

          /** Name for this input field */
          name: { type: String },

          /** Name for this input field */
          errored: { type: Boolean },

          /** Disable the autocomplete of the input field */
          disableAutocomplete: { type: Boolean },

          /** ReadOnly attribute */
          readonly: { type: Boolean },

          /** Select all content on focus */
          selectOnFocus: { type: Boolean },
        };
    }

    updated(changedProperties) {
      if(changedProperties.has('value')) {
        this.emmitChange();
      }
    }

    constructor() {
        super();
        this.placeholder = '';
        this.label = '';
        this.value = '';
        this.disabled = false;
        this.disableAutocomplete = false;
        this.name = '';
        this.type = 'text';
        this.types = ['text', 'password', 'email', 'number', 'tel', 'url', 'search', 'date', 'time', 'datetime', 'datetime-local', 'month', 'week'];
        
    }
    static get styles() {
        return css`
    * {
      box-sizing: border-box;
    }
    :host {
      display: block;
      margin-bottom: 10px;
    }
    label {
      display: block;
      margin-bottom: var(--dile-input-label-margin-bottom, 4px);
      font-size: var(--dile-input-label-font-size, 1em);
      color: var(--dile-input-label-color, #59e);
      font-weight: var(--dile-input-label-font-weight, normal);
    }
    input {
      box-sizing: border-box;
      border-radius: var(--dile-input-border-radius, 5px);
      border: var(--dile-input-border-width, 1px) solid var(--dile-input-border-color, #888);
      font-size: var(--dile-input-font-size, 1em);
      line-height: var(--dile-input-line-height, 1.5em);
      padding: var(--dile-input-padding, 5px);
      width: var(--dile-input-width, 100%);
      background-color: var(--dile-input-background-color, #fff);
      color: var(--dile-input-color, #303030);
      text-align: var(--dile-input-text-align, left);
    }
    input:focus {
      outline: none;
      border-color: var(--dile-input-focus-border-color, #6af)
    }
    input::placeholder {
      color: var(--dile-input-placeholder-color, #ccc);
    }
    input:disabled {
      background-color: #f5f5f5;
      border-color: var(--dile-input-disabled-border-color, #eee);
    }
    .errored {
      border-color: var(--dile-input-error-border-color, #c00);
    }
    `;
    }
    render() {
        return html`
          <div>
            ${this.label
              ? html`<label for="textField">${this.label}</label>`
              : ""}
            <input
              type="${this.availableType(this.type)}"
              id="textField"
              name="${this.name}"
              placeholder="${this.placeholder}"
              ?disabled="${this.disabled}"
              ?readonly="${this.readonly}"
              autocomplete="${this.disableAutocomplete ? "off" : "on"}"
              .value="${this.computeValue(this.value)}"
              class="${this.errored ? "errored" : ""}"
              @keypress="${this._lookForEnter}"
              @input="${this._input}"
              @blur="${this.doBlur}"
              @focus="${this.doFocus}"
            />
          </div>
        `;
    }
    /**
     * Private method to dispatch events on enter key pressed
     */
    _lookForEnter(e) {
        let keycode = (e.keyCode ? e.keyCode : e.which);
        if (keycode == '13') {
            this.dispatchEvent(new CustomEvent('enter-pressed'));
        }
    }
    _input(e) {
        this.value = e.target.value;
    }

    availableType(type) {
        if(this.types.includes(type)) {
            return type;
        }
        return 'text';
    }

    get el() {
        return this.shadowRoot.querySelector('input');
    }

    doBlur() {
      //
    }

    doFocus() {
      if(this.selectOnFocus) {
        this.el.select();
      }
    }

    computeValue(value) {
      return value;
    }
}