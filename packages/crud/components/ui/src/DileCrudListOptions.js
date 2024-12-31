import { LitElement, html, css } from 'lit';
import '@dile/ui/components/icon/icon';
import '@dile/ui/components/button/button-icon.js';
import '@dile/ui/components/menu-overlay/menu-overlay.js';

export class DileCrudListOptions extends LitElement {
    static styles = [
        css`
            :host {
                display: block;
                --dile-icon-color: #fff;
            }
            .content {
                padding: 0.5rem;
                background: var(--dile-primary-light-color);
                color: #303030;
            }
            dile-button-icon {
                display: none;
                --dile-primary-color: var(--dile-crud-action-color, #888);
                --dile-on-primary-color: #fff;
                --dile-primary-dark-color: transparent;
            }
            dile-icon {
                cursor: pointer;
                --dile-icon-rounded-background-color: #888;
            }
            @media (min-width: 605px) {
                dile-button-icon {
                    display: block;
                }   
                dile-icon {
                    display: none;
                }
            }
        `
    ];

    static get properties() {
      return {
        label: { type: String },
        icon: { type: Object },
      };
    }

    render() {
        return html`
            <dile-menu-overlay horizontalAlign="under_right" verticalAlign="bottom">
                <div slot="trigger">
                    <dile-icon rounded .icon="${this.icon}"></dile-icon>
                    <dile-button-icon .icon="${this.icon}" gray>${this.label}</dile-button-icon>
                </div>
                <div class="content" slot="content">
                    <slot></slot>
                </div>
            </dile-menu-overlay>
        `;
    }


    close() {
        this.shadowRoot.querySelector('dile-menu-overlay').close();  
    } 
}
