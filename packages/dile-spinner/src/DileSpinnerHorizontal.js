import { LitElement, html, css } from 'lit';

export class DileSpinnerHorizontal extends LitElement {
    static styles = [
        css`
            .loader {
                display: flex;
                flex-direction: column;
                align-items: flex-start;
                justify-content: space-between;
                width: 70px;
                height: var(--dile-spinner-horizontal-height, 1rem);
            }
            .loader div {
                height: var(--dile-spinner-horizontal-line-size, 2px);
                background: var(--dile-spinner-horizontal-color, #888);
                animation: loader var(--dile-spinner-animation-time, 2.2s) linear infinite;
            }
            .loader div:nth-child(2) {
                animation-delay: -0.65s;
            }
            .loader div:nth-child(1) {
                animation-delay: -0.25s;
            }
            @keyframes loader {
                0% {
                    width: 12px;
                }
                25% {
                    width: 60px;
                }
                50% {
                    width: 10px;
                }
                75% {
                    width: 45px;
                }
                100% {
                    width: 12px;
                }
            }
        `
    ];

    static properties = {
        active: { type: Boolean }
    }

    render() {
        return html`
            ${this.active
              ? html`
                <div class="loader">
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
              `
              : ''
            }
            
        `;
    }
}