import { html, css, LitElement } from "lit";
import { iconStyles } from '@dile/icons/index.js';

export class DileIcon extends LitElement {
  static get properties() {
    return {
      icon: { type: Object },
    };
  }

  static get styles() {
    return [
      iconStyles,
      css`
        :host {
          display: inline-block;
        }
        span {
          display: flex;
          align-items: center;
        }
        path {
          transition-duration: 0.3s;
          transition-timing-function: ease-in-out;
          transition-property: fill;
        }
        :host([rounded]) {
          background-color: var(--dile-icon-rounded-background-color, #eee);
          border-radius: 50%;
          padding: var(--dile-icon-rounded-padding, 0.5rem);
        }
    `];
  }

  render() {
    return html`
      <span>${this.icon}</span>
    `;
  }
}
