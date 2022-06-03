import { html, css, LitElement } from "lit";

export class DileBreadcrumbs extends LitElement {
  static get properties() {
    return {
      items: { type: Array },
      separator: { type: String },
    };
  }

  constructor() {
    super();
    this.items = [];
    this.separator = '/'
  }

  static get styles() {
    return css`
      :host {
        display: block;
      }
      ::slotted(dile-breadcrumbs-item.separator) {
        padding-left: var(--dile-breadcrumbs-separator-width, 0.5rem);
      }
      ::slotted(dile-breadcrumbs-item.separator)::before {
        padding-right: var(--dile-breadcrumbs-separator-width, 0.5rem);
        font-size: var(--dile-breadcrumbs-font-size, 1rem);
        color: var(--dile-breadcrumbs-text-color, #303030);
      }
      ul {
        padding: 0;
        margin: 0;
      }
      li {
        display: inline;
        color: var(--dile-breadcrumbs-text-color, #000);
        font-size: var(--dile-breadcrumbs-font-size, 1rem);
      }
      .separator {
        padding-left: var(--dile-breadcrumbs-separator-width, 0.5rem);
      }
      .separator::before {
        padding-right: var(--dile-breadcrumbs-separator-width, 0.5rem);
        font-size: var(--dile-breadcrumbs-font-size, 1rem);
        color: var(--dile-breadcrumbs-text-color, #000);
      }
      a {
        text-decoration: var(--dile-breadcrumbs-text-decoration, none);
        color: var(--dile-breadcrumbs-link-color, #39c);
      }  
    `;
  }

  firstUpdated() {
    this.querySelectorAll('dile-breadcrumbs-item').forEach( (item, index) => {
      if(index > 0) {
        item.classList.add('separator');
      }
    })
  }

  render() {
    return html`
      <style>
        .separator::before,
        ::slotted(dile-breadcrumbs-item.separator)::before {
          content: "${this.separator}";
        }          
      </style>
      ${this.items.length > 0
        ? this.arrayTemplate
        : html`<slot></slot>`
      }
    `;
  }

  get arrayTemplate() {
    return html`
      <ul>
        ${this.items.map((item, index) => html`
            <li class="${ index != 0 ? 'separator' : '' }">
              ${item.href 
                ? html`<a href="${ item.href }">${ item.text }</a>`
                : html`<span>${ item.text }</span>`
              }
            </li>`                      
        )}                
      </ul>
    `;
  }
}
