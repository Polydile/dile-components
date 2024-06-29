import { LitElement, html, css } from 'lit';
import { clearIcon } from '@dile/icons';
import '@dile/ui/components/icon/icon.js';

export class DileChip  extends LitElement {

  static get styles() {
    return css`
      :host {
        display: inline-block;
      }
      div {
        display: flex;
        align-items: center;
        background-color: var(--dile-chip-background-color, #e5e5e5);
        padding-right: var(--dile-chip-padding-x, 0.5rem);
        padding-left: var(--dile-chip-padding-x, 0.5rem);
        padding-top: var(--dile-chip-padding-y, 0.3rem);
        padding-bottom: var(--dile-chip-padding-y, 0.3rem);
        border-radius: var(--dile-chip-border-radius, 0);
      }
      span {
        font-size: var(--dile-chip-font-size, 1rem);
        font-weight: var(--dile-chip-font-weight, bold);
        color: var(--dile-chip-text-color, #303030);
        display: inline-block;
        margin-right: 20px;
        transition: color 0.3s ease;
      }
      dile-icon {
        --dile-icon-color: var(--dile-chip-icon-color, #303030);
        --dile-icon-size: var(--dile-chip-icon-size, 16px);
        cursor: pointer;
      }
      dile-icon:hover {
        --dile-icon-color: var(--dile-chip-icon-hover-color, #d06060);
      }
    `;
  }

  static get properties() {
    return {
      name: { type: String },
      icon: { type: Object },
    };
  }

  constructor() {
    super();
    this.icon = clearIcon;
  }

  render() {
    return html`
      <div>
        <span><slot></slot></span>
        <dile-icon .icon="${this.icon}" @click="${this.doClick}"></dile-icon>
      </div>
    `;
  }

  doClick() {
    this.dispatchEvent(new CustomEvent('dile-chip-icon-click', {
      bubbles: true,
      composed: true,
      detail: {
          name: this.name,
      }
    }));
  }
}
