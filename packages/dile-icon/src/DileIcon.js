import { html, css, LitElement } from "lit";
import { iconStyles } from '@dile/icons';

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
    `];
  }

  render() {
    return html`
      <span>${this.icon}</span>
    `;
  }
}
