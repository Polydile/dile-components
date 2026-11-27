import { LitElement, html, css } from 'lit';
import { DileInput } from './DileInput.js';

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

    /** Normalizes the typed text on blur. The element-changed event is dispatched by DileInput when the value changes */
    doBlur(e) {
        const typed = e.target.value;
        const num = typed.length > 0 ? this.formatInteger(typed) : typed;
        if (num !== typed) {
            this.el.value = num;
        }
        this.value = num;
    }

    /** Returns the integer as a string, or '0' when the text is not a number */
    formatInteger(num) {
        num = parseInt(num, 10);
        return isNaN(num) ? '0' : String(num);
    }
}
