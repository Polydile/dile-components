import { html, css, LitElement } from "lit";
import { ifDefined } from 'lit/directives/if-defined.js';

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
      .separator {
        padding-left: var(--dile-breadcrumbs-separator-width, 0.5rem);
      }
      .separator::before {
        padding-right: var(--dile-breadcrumbs-separator-width, 0.5rem);
        font-size: var(--dile-breadcrumbs-font-size, 1rem);
        color: var(--dile-breadcrumbs-text-color, #000);
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
      ${this.items.map((item, index) => html`
          <dile-breadcrumbs-item 
            class="${ index != 0 ? 'separator' : '' }" 
            href="${ifDefined(item.href)}"
            name="${ifDefined(item.name)}"
            >${item.text}</dile-breadcrumbs-item>`                      
      )}                
    `;
  }
}
