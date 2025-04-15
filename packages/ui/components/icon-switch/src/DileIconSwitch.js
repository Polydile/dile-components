import { html, css, LitElement } from "lit";
import '../../icon/icon.js';

export class DileIconSwitch extends LitElement {
  static get properties() {
    return {
      icon: { type: Object },
      active: { 
        type: Boolean,
        reflect: true,
      },
      name: { type: String },
    };
  }

  static get styles() {
    return [
      css`
        :host {
          display: inline-block;
        }
        dile-icon {
          --dile-icon-color: var(--dile-icon-switch-inactive-color, #888);
        }
        :host([active]) dile-icon{
          --dile-icon-color: var(--dile-icon-switch-active-color, #7BB93D);
        }
        .flex {
          display: flex;
          align-items: center;
        }
    `];
  }

  render() {
    return html`
      <div class="flex">
        <dile-icon .icon="${this.icon}" @click=${this.clickHandler}></dile-icon>
      </div>
    `;
  }

  clickHandler() {
    this.active = ! this.active;
    this.dispatchEvent(new CustomEvent('dile-icon-switch-changed', {
      bubbles: true,
      composed: true,
      detail: {
        active: this.active,
        name: this.name,
      }
    }));
  }
}
