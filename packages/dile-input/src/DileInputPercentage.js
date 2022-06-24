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
        this.changed = false;
        this.labelRight = '%';
        this.decimalSeparator = '.';
    }
    
    doBlur(e) {
        let num = e.target.value;
        if(num.length > 0) {
            num = this.formatFloat(num);
        }
        if(num != e.target.value || this.changed) {
            this.el.value = num;
            this.emmitChange();
            this.changed = false;
        }
    }

    formatFloat(num) {
        num = num.replace(this.decimalSeparator, '.');
        num = parseFloat(num);
        return isNaN(num) ? '0' : num.toString().replace('.', this.decimalSeparator);
    }

    updated(changedProperties) { 
        if(changedProperties.has('value') && this.value) {
            this.changed = true;
        }
    }
}
