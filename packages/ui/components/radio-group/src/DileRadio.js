import { LitElement, html, css } from 'lit';
import { radioCheckedIcon, circleBorderIcon } from '@dile/icons/index.js';
import '../../icon/icon.js';

export class DileRadio extends LitElement {
    static styles = [
        css`
            :host {
                display: block;
                --radio-default-color: var(--dile-on-background-color, #303030);
            }
            article {
                display: flex;
                align-items: center;
            }
            .radio {
                margin-right: var(--dile-radio-space-between-label-and-icon, 0.4rem);
                display: flex;
                --dile-icon-size: var(--dile-radio-icon-size, 1.2rem);
                --dile-icon-color: var(--dile-radio-icon-color, var(--radio-default-color));
            }
            .label {
                font-size: var(--dile-radio-label-font-size, 1rem);
                color: var(--dile-radio-label-color, var(--radio-default-color));
            }
            :host([selected]) .radio {
                --dile-icon-color: var(--dile-radio-selected-icon-color, var(--dile-radio-icon-color, var(--radio-default-color)));
            }
            :host([selected]) .label {
                color: var(--dile-radio-selected-label-color, var(--dile-radio-label-color, var(--radio-default-color)));
            }
        `
    ];

    static get properties() {
      return {
        label: { type: String },
        value: { type: String },
        selected: { 
            type: Boolean,
            reflect: true
        },
      };
    }

    constructor() {
        super();
        this.label = '';
        this.value = '';
        this.selected = false;
    }

    render() {
        return html`
            <article @click=${this.select}>
                <span class="radio">
                    <dile-icon .icon="${this.computeIcon(this.selected)}"></dile-icon>
                </span>
                <span class="label">
                    ${this.label}
                </span>
            </article>
        `;
    }

    select() {
        this.dispatchEvent(new CustomEvent('dile-radio-selected', {
            bubbles: true,
            composed: true,
            detail: {
                value: this.value,
                label: this.label
            }
        }));
    }

    computeIcon(selected) {
        return selected ? radioCheckedIcon : circleBorderIcon;
    }
}
