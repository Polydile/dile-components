import { LitElement, html, css } from 'lit';

export class DileFloatingMenuItem extends LitElement {
    static styles = [
        css`
            :host {
                display: block;
            }
            
            a {
                text-decoration: none;
                color: var(--dile-floating-menu-item-color, aliceblue);
                margin: var(--dile-floating-menu-item-margin, 0.5rem 0);
            }

            a:hover {
                color: var(--dile-floating-menu-item-color-hover, lightblue);
            }
        `
    ];

    static properties = {

        href: {
            type: String,
            reflect: true,   
        },

        target: {
            type: String,
            reflect: true,
        }
    }

    constructor() {
        super();
        this.href = '';
        this.target = '';
        
    }

    connectedCallback() {
        super.connectedCallback && super.connectedCallback();
        this.setAttribute('role', 'listitem');
    }

    render() {
        return html`
            <a href="${this.href}" target="${this.target}" ><slot></slot></a>        
        `;
    }
}