import { html, css, LitElement } from "lit-element";
import '@dile/dile-app-drawer/dile-app-drawer';
import '@dile/dile-hamburger/dile-hamburger';

export class DileMenuHamburger extends LitElement {
  static get properties() {
    return {
      direction: {
        type: String,
        reflect: true
      },
      opened: {
        type: Boolean,
        reflect: true
      },
      hamburgerAlwaysVisible: {
        type: Boolean,
        reflect: true
      }
    };
  }

  static get styles() {
    return css`
      :host {
        display: inline-block;
      }
      :host([hamburgerAlwaysVisible]) dile-hamburger {
        position: relative;
        z-index: 100020;
      }
    `;
  }

  constructor() {
    super();
    this.direction = 'top';
    this.opened = false;
    this.hamburgerAlwaysVisible = false;
  }

  firstUpdated() {
    this.drawer = this.shadowRoot.getElementById('drawer');
  }

  updated(changedProperties) {
    if(changedProperties.has('opened')) {
      let theEvent = this.opened ? 'dile-menu-hamburger-opened' : 'dile-menu-hamburger-closed';
      this.dispatchEvent(new CustomEvent(theEvent, {
        bubbles: true,
        composed: true,
        detail: {
          opened: this.opened,
        }
      }));
    }
  }

  render() {
    return html`
      <dile-hamburger @click="${this.toggle}" ?active="${this.opened}"></dile-hamburger>
      <dile-app-drawer 
        id="drawer" 
        ?opened="${this.opened}" 
        direction="${this.direction}"
        @dile-app-drawer-closed="${this.close}"
      >
        <slot name="menu"></slot>
      </dile-app-drawer>
    `;
  }

  toggle() {
    this.opened = ! this.opened;
  }

  open() {
    this.opened = true;
  }

  close() {
    this.opened = false;
  }
}