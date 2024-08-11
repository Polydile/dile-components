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
                color: var(--dile-on-primary-color, #303030);
                --dile-icon-rounded-background-color: var(--dile-primary-color, #2962FF);
                --dile-icon-color: var(--dile-modal-help-icon-color, #fff);
            }
            h1 {
                margin: 0 0 1rem;
                font-size: 1.5rem;
                font-weight: 300;
                color: var(--primary-dark-color, #303030);
                padding-bottom: 0.5rem;
                border-bottom: 1px solid var(--dile-primary-color, #2962FF);
            }
            dile-icon {
                cursor: pointer;
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
                ? html`<dile-icon .icon=${this.icon} @click=${this.open} rounded></dile-icon>`
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

    get elmodal() {
        return this.shadowRoot.getElementById('elmodal');
    }

    open() {
        this.elmodal.open();
    }
    close() {
        this.elmodal.close();
    }
}
