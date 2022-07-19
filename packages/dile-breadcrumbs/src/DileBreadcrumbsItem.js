import { LitElement, html, css } from 'lit';

export class DileBreadcrumbsItem extends LitElement {
    static styles = [
        css`
            :host {
                display: inline-block;
                font-size: var(--dile-breadcrumbs-font-size, 1rem);
            }
            a {
                text-decoration: var(--dile-breadcrumbs-text-decoration, none);
                color: var(--dile-breadcrumbs-link-color, #39c);
            }  
        `
    ];

    static get properties() {
      return {
        href: { type: String }
      };
    }

    render() {
        return html`
            ${this.href 
                ? html`<a href="${this.href}">${this.contentTemplate}</a>`
                : html`<span>${this.contentTemplate}</span>`
            }
        `;
    }

    get contentTemplate() {
        return html`<slot></slot>`;
    }

}
