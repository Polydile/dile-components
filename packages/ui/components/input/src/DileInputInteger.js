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

    constructor() {
        super();
        this.changed = false;
    }
    
    doBlur(e) {
        let num = e.target.value;
        if(num.length > 0) {
            num = this.formatInteger(num);
        }
        if(num != e.target.value || this.changed) {
            this.el.value = num;
            this.value = num;
            this.emmitChange();
            this.changed = false;
        }
    }

    formatInteger(num) {
        num = parseInt(num);
        return isNaN(num) ? '0' : num;
    }

    updated(changedProperties) { 
        if(changedProperties.has('value') && this.value) {
            this.changed = true;
        }
    }
}
