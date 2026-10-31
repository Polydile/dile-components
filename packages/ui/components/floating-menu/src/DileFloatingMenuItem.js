import { LitElement, html, css } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';

export class DileFloatingMenuItem extends LitElement {
    static styles = [
        css`
            :host {
                display: block;
            }

            a {
                display: block;
                text-decoration: none;
                color: var(--dile-floating-menu-item-color, aliceblue);
                margin: var(--dile-floating-menu-item-margin, 0.5rem 0);
            }

            a:hover {
                color: var(--dile-floating-menu-item-color-hover, lightblue);
            }

            a:focus-visible {
                outline: 2px solid currentColor;
                outline-offset: 2px;
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
            <a href="${ifDefined(this.href || undefined)}" target="${ifDefined(this.target || undefined)}"><slot></slot></a>
        `;
    }
}
