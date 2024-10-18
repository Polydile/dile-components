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
          --dile-icon-color: var(--dile-icon-button-color, var(--dile-on-primary-color, #ffffff));
        }
        dile-icon {
          margin-right: var(--dile-button-icon-separation, 0.3rem);
        }
        button:hover {
          --dile-icon-color: var(--dile-button-icon-hover-color, var(--dile-on-primary-light-color, #888));
        }
        :host([no-wrap]) {
          white-space: nowrap;
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
