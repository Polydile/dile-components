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
    this.separator = '>'
  }

  static get styles() {
    return css`
      :host {
        display: inline-block;
      }
      ul
      {
        padding: 0;
        margin: 0;
      }
      li {
        display: inline;
      }
      .separator
      {
        margin-left: var(--dile-breadcrumbs-separator-width, 10px);
        padding-left: var(--dile-breadcrumbs-separator-width, 10px);
      }
      .separator::before {
        padding-right: var(--dile-breadcrumbs-separator-before-width, 15px);
        font-size: var(--dile-breadcrumbs-font-size, 25px);
        color: var(--dile-breadcrumbs-text-color, #000);
      }
      a {
        text-decoration: var(--dile-breadcrumbs-text-decoration, none);
        color: var(--dile-breadcrumbs-text-color, #000);
        font-size: var(--dile-breadcrumbs-font-size, 25px);
      }      
    `;
  }

  render() {
    return html`
      <style>
        .separator::before {
          content: "${this.separator}";
        }          
      </style>
      <ul>
      ${this.items.map((item, index) => 
        {
          return html`<li class="${index != 0 ? 'separator' : ''}">
                        <a href="${item.url}">${item.text}</a>
                      </li>`
        }                      
      )}                
      </ul>
    `;
  }

}
