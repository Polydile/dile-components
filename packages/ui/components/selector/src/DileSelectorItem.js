import { html, css, LitElement } from "lit";
import { DileSelectableItem } from "../../../mixins/selectable/index.js";

const icons = {
  "navigate_next": html`<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0z" fill="none"/><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg>`,
  "arrow_forward": html`<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/></svg>`,
  "star": html`<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#f26"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>`,
  "label_important": html`<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M3.5 18.99l11 .01c.67 0 1.27-.33 1.63-.84L20.5 12l-4.37-6.16c-.36-.51-.96-.84-1.63-.84l-11 .01L8.34 12 3.5 18.99z"/></svg>`,
  "add": html`<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0z" fill="none"/><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>`,
}

export class DileSelectorItem  extends DileSelectableItem(LitElement) {

  static get styles() {
    return css`
      :host {
        display: block;
        cursor: pointer;
      }
      article {
        display: flex;
        align-items: center;
        padding-top: var(--dile-selector-padding-y, 0.2rem); 
        padding-bottom: var(--dile-selector-padding-y, 0.2rem); 
        padding-left:  var(--dile-selector-padding-x, 0.5rem); 
        padding-right:  var(--dile-selector-padding-x, 0.5rem); 
        background-color: var(--dile-selector-background-color, transparent);
        color: var(--dile-selector-text-color, var(--dile-on-background-color, #303030));
        transition: all 0.3s ease-in;
      }
      .selected {
        background-color: var(--dile-selector-selected-background-color, #039be5);
        color: var(--dile-selector-selected-text-color, #fff);
        font-weight: var(--dile-selector-selected-font-weight, normal);
        border-radius: var(--dile-selector-selected-border-radius, 0);
      }
      .icon {
        margin-right: 0.3rem;
        display: flex;
        align-items: center;
      }
      .icon svg {
        color: red;
        fill: var(--dile-selector-icon-color, var(--dile-selector-primary-color, #039be5));
        width: var(--dile-selector-icon-size, 20px);
        height: var(--dile-selector-icon-size, 20px);
      }
      .selected .icon svg {
        fill: var(--dile-selector-selected-icon-color, #fff);
      }
      a {
        display: block;
        text-decoration: var(--dile-selector-text-decoration, none);
      }
    `;
  }

  static get properties() {
    return {
      icon: { type: String },
      href: { type: String },
    };
  }

  constructor() {
    super();
    this.href = '';
  }

  render() {
    return html`
      ${this.href == '' 
        ? this.itemTemplate
        : html`<a href="${this.href}">${this.itemTemplate}</a>`
       }
    `;
  }

  get itemTemplate() {
    return html`
      <article @click='${this.select}' class="${this.selected ? 'selected' : ''}">
        ${this.icon
          ? html`<div class="icon">${this.iconElement(this.icon)}</div>`
          : ''
        }
        <div class="line"><slot></slot></div>
      </article>
    `;
  }
  iconElement(icon) {
    return icons[icon];
  }

}
