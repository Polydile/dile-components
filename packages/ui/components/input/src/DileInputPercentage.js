import { LitElement, html, css } from 'lit';
import { DileInput } from './DileInput.js';

export class DileInputPercentage extends DileInput {
    static styles = [
        DileInput.styles,
        css`
            :host {
                display: block;
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
        this.labelRight = '%';
        this.decimalSeparator = '.';
    }
    
    /** Normalizes the typed text on blur. The element-changed event is dispatched by DileInput when the value changes */
    doBlur(e) {
        const typed = e.target.value;
        this.value = typed.length > 0 ? this.formatFloat(typed) : typed;
    }

    doFormat() {
        this.value = this.formatFloat(this.value);
    }

    /** Returns the number as a string with "." as decimal separator, or '0' when the text is not a number */
    formatFloat(num) {
        const text = String(num ?? '').replace(this.decimalSeparator, '.');
        const parsed = parseFloat(text);
        return isNaN(parsed) ? '0' : String(parsed);
    }

    computeValue(value) {
        return String(value ?? '').replace('.', this.decimalSeparator);
    }
}
