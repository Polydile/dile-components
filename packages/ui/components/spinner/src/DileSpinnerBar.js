import { LitElement, html, css } from 'lit';
import { DileSpinnerMixin } from './DileSpinnerMixin.js';

export class DileSpinnerBar extends DileSpinnerMixin(LitElement) {
    static styles = [
        css`
            :host {
                display: block;
            }
            .bar {
                width: 100%;
                height: var(--dile-spinner-bar-height, 4px);
                border-radius: var(--dile-spinner-bar-border-radius, 0);
                background: linear-gradient(
                    90deg,
                    var(--dile-spinner-bar-color-1, #1e3c72) 0%,
                    var(--dile-spinner-bar-color-2, #00d4ff) 50%,
                    var(--dile-spinner-bar-color-1, #1e3c72) 100%
                );
                background-size: 200% 100%;
                animation: dile-bar-shimmer var(--dile-spinner-bar-animation-time, 1.8s) ease-in-out infinite;
            }
            @keyframes dile-bar-shimmer {
                0% { background-position: 0% 50%; }
                50% { background-position: 100% 50%; }
                100% { background-position: 0% 50%; }
            }
        `
    ];

    render() {
        return html`
            ${this.active
                ? html`<div class="bar"></div>`
                : ''
            }
        `;
    }
}
