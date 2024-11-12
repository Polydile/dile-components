import { LitElement, html, css } from 'lit';
import { DileInput } from './DileInput';

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
    
    doBlur(e) {
        let num = e.target.value;
        if(num.length > 0) {
            num = this.formatFloat(num);
        }
        if(num != e.target.value || this.changed) {
            this.value = num;
            this.emmitChange();
            this.changed = false;
        }
    }

    doFormat() {
        this.value = this.formatFloat(this.value);
    }

    formatFloat(num) {
        num = num.replace(this.decimalSeparator, '.');
        num = parseFloat(num);
        return isNaN(num) ? '0' : num;
    }

    updated(changedProperties) { 
        super.updated(changedProperties);
        if(changedProperties.has('value') && this.value) {
            this.changed = true;
        }
    }

    computeValue(value) {
        return value.toString().replace('.', this.decimalSeparator);
    }
}
