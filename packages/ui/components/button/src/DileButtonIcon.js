import { html, css, LitElement } from "lit";
import { DileButton } from './DileButton.js';
import '../../icon/icon.js';

export class DileButtonIcon extends DileButton {
  static get properties() {
    return {
      icon: { type: Object },
    };
  }

  static get styles() {
    return [
      super.styles,
      css`
        button {
          display: flex;
          align-items: center;
        }
        dile-icon {
          margin-right: var(--dile-button-icon-separation, 0.3rem);
        }
        button:hover {
          --dile-icon-color: var(--dile-button-icon-hover-color, #303030);
        }
      `
    ];
  }

  render() {
    return html`
      <button @click="${this.doClick}">
          <dile-icon .icon=${this.icon}></dile-icon>
          <slot></slot>
      </button>
    `;
  }
}
