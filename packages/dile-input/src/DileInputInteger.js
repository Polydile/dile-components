import { LitElement, html, css } from 'lit';
import { DileInput } from './DileInput';

export class DileInputInteger extends DileInput {
    static styles = [
        DileInput.styles,
        css`
            :host {
                display: block;
            }
            input {
              text-align: var(--dile-input-integer-text-align, var(--dile-input-text-align, right));
            }
        `
    ];
    
    doBlur(e) {
        let num = e.target.value;
        if(num.length > 0) {
            num = this.formatInteger(num);
        }
        this.el.value = num;
    }

    formatInteger(num) {
        num = parseInt(num);
        return isNaN(num) ? '0' : num;
    }
}
