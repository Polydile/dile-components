import { LitElement, html, css } from 'lit';
import { DileInput } from './DileInput';

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

    doBlur(e) {
        let num = e.target.value;
        if(num.length > 0) {
            num = this.formatMoney(num);
        }
        if(num != e.target.value || this.changed) {
            this.value = num;
            this.emmitChange();
            this.changed = false;
        }
    }

    doFormat() {
        this.value = this.formatMoney(this.value);
    }

    formatMoney(num) {
        num = num.replace(this.decimalSeparator, '.');
        num = parseFloat(num);
        if(isNaN(num)) {
            return '0.00';
        } else {
            return num.toFixed(2);
        }
    }

    updated(changedProperties) { 
        if(changedProperties.has('value') && this.value) {
            this.changed = true;
        }
    }

    computeValue(value) {
        if(value) {
            value = value.toString();
            return value.replace('.', this.decimalSeparator);
        }
        return '';
    }
}
