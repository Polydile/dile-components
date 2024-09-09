import { LitElement, html, css } from "lit";
import { DileCloseOnEscPressed } from '../../../mixins/close-on-esc-pressed/index.js';

export const DILE_APP_DRAWER_EVENT_CLOSE_OUTSIDE = 'dile-app-drawer-click-outside';
export const DILE_APP_DRAWER_EVENT_CLOSED = 'dile-app-drawer-closed';

export class DileAppDrawer extends DileCloseOnEscPressed(LitElement) {
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
      noModal: {
        type: Boolean,
        attribute: 'no-modal'
      }
    };
  }

  constructor() {
    super();
    this.direction = 'top';
    this.opened = false;
    this._documentClose = this._documentClose.bind(this);
  }

  static get styles() {
    return css`
      :host {
        display: block;
      }

      .modal {
        display: none;
        position: fixed;
        width: 100vw;
        height: 100vh;
        top: 0;
        left: 0;
        z-index: var(--dile-app-drawer-modal-z-index, var(--dile-app-drawer-z-index, 98));
        opacity: 0;
        transition: opacity 0.3s ease;
        background-color: var(
          --dile-app-drawer-modal-background-color,
          rgba(20, 20, 20, 0.7)
        );
      }

      .menu {
        position: fixed;
        box-sizing: border-box;
        z-index: var(--dile-app-drawer-z-index, 99);
        background-color: var(--dile-primary-light-color, #ddd);
        transition: transform 0.3s ease;
        overflow: auto;
      }

      section {
        transform: translateX(-100vw);
        transition: transform 0.2s ease 0.3s;
      }

      :host([opened]) .modal {
        display: block;
        opacity: 1;
      }

      :host([opened]) .menu {
        display: block;
      }

      :host([opened]) section {
        transform: translateX(0);
      }

      :host([direction="top"]) .menu {
        top: var(--dile-app-drawer-closed-top, -100vh);
        left: var(--dile-app-drawer-closed-left, 0);
        height: var(--dile-app-drawer-content-height, auto);
        width: var(--dile-app-drawer-content-width, 100vw);
        box-shadow: var(--dile-app-drawer-box-shadow, 0 1px 8px #000);
      }

      :host([direction="left"]) .menu {
        top: var(--dile-app-drawer-closed-top, 0);
        left: var(--dile-app-drawer-closed-left, -100vw);
        height: var(--dile-app-drawer-content-height, 100vh);
        width: var(--dile-app-drawer-content-width, auto);
        box-shadow: var(--dile-app-drawer-box-shadow, 1px 0 8px #000);
      }

      :host([direction="top"][opened]) .menu {
        transform: translateY(100vh);
      }

      :host([direction="left"][opened]) .menu {
        transform: translateX(100vw);
      }
    `;
  }

  render() {
    return html`
      ${this.modalTemplate}
      <div class="menu" @click="${this._contentClick}">
        <section>
          <slot></slot>
        </section>
      </div>
    `;
  }

  get modalTemplate() {
    return this.noModal ? '' : html`<div class="modal" @click=${this._documentClose}></div>`;
  }

  _documentClose() {
    if (this.opened) {
      this.close();
      this.dispatchEvent(
        new CustomEvent(DILE_APP_DRAWER_EVENT_CLOSE_OUTSIDE, {
          bubbles: true,
          composed: true,
        })
      );
    }
  }

  toggle() {
    this.opened = !this.opened;
  }

  open() {
    this.opened = true;
  }

  close() {
    this.opened = false;
    this.dispatchEvent(new CustomEvent(DILE_APP_DRAWER_EVENT_CLOSED, {
      bubbles: true,
      composed: true,
    }));
  }

  _contentClick(e) {
    e.stopPropagation();
  }
}
