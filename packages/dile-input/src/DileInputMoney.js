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

    // updated(changedProperties) {
    //     if (changedProperties.has('value') && this.value) {
    //         this.value = this.currencyFormat(this.value);        
    //     }
    //     super.updated(changedProperties);
    // }


    
    doBlur(e) {
        let num = e.target.value;
        if(num.length > 0) {
            num = this.formatMoney(num);
        }
        if(num != e.target.value || this.changed) {
            this.el.value = num;
            this.emmitChange();
            this.changed = false;
        }
    }

    updated(changedProperties) { }

    formatMoney(num) {
        num = num.replace(this.decimalSeparator, '.');
        num = parseFloat(num);
        if(isNaN(num)) {
            return '0.00';
        } else {
            return num.toFixed(2).replace('.', this.decimalSeparator);
        }
    }

    updated(changedProperties) { 
        if(changedProperties.has('value') && this.value) {
            this.changed = true;
        }
    }
}
