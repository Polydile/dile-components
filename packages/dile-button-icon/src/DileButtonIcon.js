import { html, css, LitElement } from "lit";
import { DileButton } from '@dile/dile-button';
import { iconStyles } from "@dile/icons";

export class DileButtonIcon extends DileButton {
  static get properties() {
    return {
      icon: { type: Object },
    };
  }

  static get styles() {
    return [
      super.styles,
      iconStyles,
      css`
        div, span {
          display: flex;
          align-items: center;
        }
        span {
          margin-right: var(--dile-button-icon-margin-right, 0.3rem);
        }
        button:hover {
          --dile-icon-color: var(--dile-button-icon-hover-color, #303030);
        }
        path {
          transition-duration: 0.3s;
          transition-timing-function: ease-in-out;
          transition-property: fill;
        }
      `
    ];
  }

  render() {
    return html`
      <button @click="${this.doClick}">
        <div>
          <span>${this.icon}</span>
          <slot></slot>
        </div>
      </button>
    `;
  }
}
