import { html, css, LitElement } from "lit";
import { DileSelectableItem } from "../../../mixins/selectable";

export class DileBoxSelectorItem extends DileSelectableItem(LitElement) {

  static get styles() {
    return css`
      :host {
        cursor: pointer;
        background-color: var(--dile-primary-color, #fff);
        color: var(--dile-on-primary-color, #303030);
        border: var(--dile-primary-dark-color, 1px solid #ccc);
        border-radius: var(--dile-box-selector-item-border-radius, 0.5rem);
        padding: var(--dile-box-selector-item-padding, 0.8rem);
        text-align: var(--dile-box-selector-item-text-align, center);
        font-weight: var(--dile-box-selector-item-font-weight, normal);
        display: flex;
        align-items: center;
        justify-content: center;
      }
    `;
  }

  static get properties() {
    return {
      label: { type: String },
    };
  }

  constructor() {
    super();
    this.label = '';
    this.onClick = this.select.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('click', this.onClick);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('click', this.onClick);
  }

  render() {
    return html`
        ${this.label}
    `;
  }

}