import { LitElement, html, css } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
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
                cursor: pointer;
            }
            article:focus-visible {
                outline: var(--dile-radio-focus-outline, 2px solid #4A90E2);
                outline-offset: 2px;
            }
            :host([disabled]) article {
                cursor: not-allowed;
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
        disabled: {
            type: Boolean,
            reflect: true
        },
        tabbable: { type: Boolean },
        decorative: { type: Boolean, reflect: true },
      };
    }

    constructor() {
        super();
        this.label = '';
        this.value = '';
        this.selected = false;
        this.disabled = false;
        this.tabbable = false;
        this.decorative = false;
    }

    render() {
        return html`
            <article
                @click=${this.handleClick}
                @keydown=${this.handleKeydown}
                role="radio"
                aria-checked="${this.selected}"
                aria-disabled="${this.disabled}"
                aria-hidden="${ifDefined(this.decorative ? 'true' : undefined)}"
                tabindex="${this.decorative || this.disabled ? -1 : (this.tabbable ? 0 : -1)}"
            >
                <span class="radio">
                    <dile-icon .icon="${this.computeIcon(this.selected)}"></dile-icon>
                </span>
                <span class="label">
                    ${this.label}
                </span>
            </article>
        `;
    }

    handleClick() {
        if (this.disabled || this.decorative) return;
        this.select();
    }

    handleKeydown(e) {
        if (this.disabled || this.decorative) return;
        if (e.key === ' ' || e.key === 'Enter') {
            e.preventDefault();
            this.select();
        }
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

    focus(options) {
        this.shadowRoot?.querySelector('article')?.focus(options);
    }

    computeIcon(selected) {
        return selected ? radioCheckedIcon : circleBorderIcon;
    }
}
