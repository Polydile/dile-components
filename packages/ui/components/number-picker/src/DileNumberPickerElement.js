import { html, css, LitElement } from "lit";
import { arrowDropUpIcon, arrowDropDownIcon } from '@dile/icons';
import '../../icon/icon.js'

export class DileNumberPickerElement extends LitElement {
  static get styles() {
    return css`
        :host {
          display: block;
        }
        section {
          display: flex;
          align-items: stretch;
        }
        input {
          border-radius: var(--dile-input-border-radius, 5px);
          padding: var(--dile-number-picker-padding, 0.15rem 0.25rem);
          width: var(--dile-number-picker-width, 48px);
          text-align: center;
          box-sizing: border-box;
          border-radius: var(--dile-input-border-radius, 5px);
          border: var(--dile-input-border-width, 1px) solid var(--dile-input-border-color, #888);
          font-size: var(--dile-input-font-size, 1em);
          background-color: var(--dile-input-background-color, #fff);
          color: var(--dile-input-color, #303030);
        }
        .controls {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        dile-icon {
          cursor: pointer;
          user-select: none;
        }
        :host([errored]) input {
          border-color: var(--dile-input-error-border-color, #c00);
        }

        input:disabled {
          background-color: #f5f5f5;
          border-color: var(--dile-input-disabled-border-color, #eee);
        }
      `
  }

  static get properties() {
    return {
      value: { type: String },
      digits: { type: Number },
      leadingZeros: { type: Boolean },
      step: { type: Number },
      /** Set errored state */
      errored: { type: Boolean },
      /** Set the application focus to this the input component after the initialization */
      focusOnStart: { type: Boolean },
      min: { 
        type: String,
        converter: {
          fromAttribute: (value, type) => {
            return value === undefined || value === "" ? undefined : parseInt(value);
          },
          toAttribute: (value, type) => {
            return value;
          }
        }
      },
      max: { 
        type: String,
        converter: {
          fromAttribute: (value, type) => {
            return value === undefined || value === "" ? undefined : parseInt(value);
          },
          toAttribute: (value, type) => {
            return value;
          }
        }
      },
      disabled: { type: Boolean },
    };
  }

  constructor() {
    super();
    this.value = "";
    this.digits = 2;
    this.leadingZeros = false;
    this.step = 1;
    this.disabled = false;
  }

  get elinput() {
    return this.shadowRoot.getElementById('elinput');
  }

  firstUpdated() {
    this._transformInput(this.value || "0");
    if(this.focusOnStart) {
      this.focus();
    }
  }

  updated(changedProperties) {
    if(changedProperties.has('value')) {
      this._transformInput(this.value);
    }
  }

  render() {
    return html`
      <section>
        <input 
          type="text" 
          id="elinput"
          @input=${this._onInput}
          ?disabled=${this.disabled}
        >
        <div class="controls">
          <dile-icon .icon=${arrowDropUpIcon} @click=${this.increment}></dile-icon>
          <dile-icon .icon=${arrowDropDownIcon} @click=${this.decrement}></dile-icon>
        </div>
      </section>
    `;
  }

  _onInput(e) {
    this._transformInput(e.target.value);
  }

  _transformInput(value) {
    const cleaned = this._clean(value);
    const formatted = this._formatNumber(cleaned);
    this.elinput.value = formatted;
    this.value = formatted;
    this.dispatchEvent(new CustomEvent('dile-number-picker-value-changed', { 
      bubbles: true,
      composed: true,
      detail: this.value,
    }));
  }

  _clean(value) {
    let cleaned = value.replace(/[^\d]/g, '');

    if (this.leadingZeros && cleaned.length > 1 && cleaned.startsWith('0')) {
      cleaned = cleaned.substring(1);
    }

    if (this.digits && cleaned.length > this.digits) {
      cleaned = cleaned.substring(0, this.digits);
    }

    let num = parseInt(cleaned || "0", 10);

    const maxByDigits = Math.pow(10, this.digits) - 1;
    if (num > maxByDigits) {
      num = maxByDigits;
    }

    if (typeof this.min === 'number' && num < this.min) {
      num = this.min;
    }
    if (typeof this.max === 'number' && num > this.max) {
      num = this.max;
    }

    if (!this.leadingZeros) {
      return num;
    }

    return num.toString();
  }

  _formatNumber(value) {
    let val = value.toString();
    if (this.leadingZeros) {
      val = val.padStart(this.digits, '0');
    }
    return val;
  }

  increment() {
    if(!this.disabled) {
      let current = parseInt(this._clean(this.elinput.value), 10) || 0;
      let next = current + this.step;
      let asString = next.toString();
  
      // Si el resultado excede digits, no hacemos nada
      if (asString.length > this.digits) {
        return;
      }
  
      this._transformInput(asString);
    }
  }

  decrement() {
    if(!this.disabled) {
      let current = parseInt(this._clean(this.elinput.value), 10) || 0;
      let next = Math.max(0, current - this.step);
      let asString = next.toString();

      this._transformInput(asString);
    }
  }

  focus() {
    console.log(this.elinput);
    this.elinput.focus();
  }

  clear() {
    this.value = 0;
    this.elinput.value = 0;
  }
}