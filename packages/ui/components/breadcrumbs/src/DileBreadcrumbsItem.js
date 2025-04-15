import { LitElement, html, css } from 'lit';

export class DileBreadcrumbsItem extends LitElement {
    static styles = [
        css`
            :host {
                display: inline-block;
                font-size: var(--dile-breadcrumbs-font-size, 1rem);
            }
            a, .named {
                text-decoration: var(--dile-breadcrumbs-text-decoration, none);
                color: var(--dile-breadcrumbs-link-color, var(--dile-link-color, #39c));
            }  
            .named {
                cursor: pointer;
            }
        `
    ];

    static get properties() {
      return {
        href: { type: String },
        name: { type: String },
      };
    }

    render() {
        return html`
            ${this.href 
                ? html`<a href="${this.href}">${this.contentTemplate}</a>`
                : html`<span class="${this.name ? 'named' : ''}" @click=${this.dispatchClick}>${this.contentTemplate}</span>`
            }
        `;
    }

    get contentTemplate() {
        return html`<slot></slot>`;
    }

    dispatchClick(e) {
        if(this.name) {
            this.dispatchEvent(new CustomEvent('dile-breadcrumbs-click', { 
                bubbles: true,
                composed: true,
                detail: {
                    name: this.name,
                }
            }));
        }
    }
}
