import { LitElement, html, css } from 'lit';
import { DileInput } from './DileInput.js';

export class DileInputMoney extends DileInput {
    static styles = [
        DileInput.styles,
        css`
            :host {
                display: block;
            }
            input {
              text-align: var(--dile-input-money-text-align, var(--dile-input-text-align, right));
            }
        `
    ];

    static get properties() {
      return {
        decimalSeparator: { type: String }
      };
    }

    constructor() {
        super();
        this.decimalSeparator = '.';
    }

    /** Normalizes the typed text on blur. The element-changed event is dispatched by DileInput when the value changes */
    doBlur(e) {
        const typed = e.target.value;
        this.value = typed.length > 0 ? this.formatMoney(typed) : typed;
    }

    set(value) {
        this.value = value;
        this.doFormat();
    }

    doFormat() {
        this.value = this.formatMoney(this.value);
    }

    formatMoney(num) {
        num = String(num ?? '').replace(this.decimalSeparator, '.');
        num = parseFloat(num);
        if(isNaN(num)) {
            return '0.00';
        } else {
            return num.toFixed(2);
        }
    }

    computeValue(value) {
        return String(value ?? '').replace('.', this.decimalSeparator);
    }
}
