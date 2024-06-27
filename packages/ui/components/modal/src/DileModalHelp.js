import { LitElement, html, css } from 'lit';
import { helpIcon } from '@dile/icons';
import '../../icon/icon.js';
import '../../button/button-icon.js'

export class DileModalHelp extends LitElement {
    static styles = [
        css`
            :host {
                display: flex;
                align-items: center;
                --dile-modal-width: var(--dile-modal-help-width, 95vw);
                --dile-modal-height: auto;
                --dile-modal-max-height: 95vh;
                color: #303030;
            }
            h1 {
                margin: 0 0 1rem;
                font-size: 1.5rem;
                font-weight: 300;
                color: var(--primary-dark-color);
                padding-bottom: 0.5rem;
                border-bottom: 1px solid var(--primary-color);
            }
            .content {
                overflow: auto;
                max-height: 90vh;
            }
            @media(min-width: 380px) {
                :host {
                    --dile-modal-width: var(--dile-modal-help-width, 85vw);
                }
            }
            @media(min-width: 580px) {
                :host {
                    --dile-modal-width: var(--dile-modal-help-width, 65vw);
                }
            }
        `
    ];

    static get properties() {
      return {
        label: { type: String },
        icon: { type: Object },
        title: { type: String },
        onlyIcon: { type: Boolean },
      };
    }

    constructor() {
        super();
        this.label = 'Help';
        this.icon = helpIcon;
    }

    render() {
        return html`
            ${this.onlyIcon
                ? html`<dile-icon .icon=${this.icon} @click=${this.open}></dile-icon>`
                : html`
                    <dile-button-icon 
                        .icon="${this.icon}" 
                        @click=${this.open}
                    >${this.label}</dile-button-icon>    
                `
            }
            <dile-modal id="elmodal" showCloseIcon>
                <div class="content">
                    ${this.title
                        ? html`<h1>${this.title}</h1>`
                        : ''
                    }
                    <slot></slot>
                </div>
            </dile-modal>
        `;
    }

    open() {
        this.shadowRoot.getElementById('elmodal').open();
    }
}
