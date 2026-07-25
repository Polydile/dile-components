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
    this._triggerElement = null;
    this._handleKeyDown = this._handleKeyDown.bind(this);
    this._focusTrapActive = false;
  }

  static get styles() {
    return css`
      :host {
        display: block;
        overflow-x: hidden;
      }

      .modal {
        display: none;
        position: fixed;
        width: 100%;
        height: 100vh;
        left: 0;
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
        background-color: var(--dile-app-drawer-background-color, var(--dile-primary-light-color, #ddd));
        transition: transform 0.3s ease;
        overflow: auto;
      }

      section {
        transform: none;
        transition: none;
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
        box-shadow: none;
      }

      :host([direction="top"][opened]) .menu {
        transform: translateY(100vh);
        box-shadow: var(--dile-app-drawer-box-shadow, 0 1px 8px #000);
      }

      :host([direction="left"]) .menu {
        top: var(--dile-app-drawer-closed-top, 0);
        left: var(--dile-app-drawer-closed-left, 0);
        height: var(--dile-app-drawer-content-height, 100vh);
        width: var(--dile-app-drawer-content-width, auto);
        box-shadow: none;
        transform: translateX(-100%);
      }

      :host([direction="left"][opened]) .menu {
        transform: translateX(0);
        box-shadow: var(--dile-app-drawer-box-shadow, 1px 0 8px #000);
      }

      /* Respect prefers-reduced-motion */
      @media (prefers-reduced-motion: reduce) {
        .modal {
          transition: none;
        }

        .menu {
          transition: none;
        }
      }
    `;
  }

  render() {
    return html`
      ${this.modalTemplate}
      <div 
        class="menu" 
        role="dialog"
        aria-modal="${this.opened ? 'true' : 'false'}"
        aria-label="Application menu"
        aria-description="Press Escape to close. You can also click outside the menu."
        ?inert="${!this.opened}"
        tabindex="-1"
        @click="${this._contentClick}"
        @keydown="${this._handleKeyDown}">
        <nav aria-label="Main navigation">
          <slot></slot>
        </nav>
      </div>
    `;
  }

  get modalTemplate() {
    return this.noModal ? '' : html`<div 
      class="modal" 
      aria-hidden="true"
      ?inert="${!this.opened}"
      @click=${this._documentClose}>
    </div>`;
  }

  updated(changedProperties) {
    if (changedProperties.has('opened')) {
      if (this.opened) {
        this._openDrawer();
      } else {
        this._closeDrawer();
      }
    }
  }

  _openDrawer() {
    this._triggerElement = document.activeElement;
    this.shadowRoot.querySelector('.menu').focus();
    this._focusTrapActive = true;
    document.addEventListener('keydown', this._handleKeyDown);
  }

  _closeDrawer() {
    this._focusTrapActive = false;
    document.removeEventListener('keydown', this._handleKeyDown);
    
    if (this._triggerElement && typeof this._triggerElement.focus === 'function') {
      setTimeout(() => {
        this._triggerElement.focus();
      }, 0);
    }
  }

  _getFocusableElements() {
    const focusableSelector = `
      button:not([disabled]),
      [href],
      input:not([disabled]),
      select:not([disabled]),
      textarea:not([disabled]),
      [tabindex]:not([tabindex="-1"]):not([disabled]),
      [role="button"]:not([aria-disabled="true"])
    `;
    return Array.from(this.querySelectorAll(focusableSelector)).filter(el => {
      return el.offsetParent !== null;
    });
  }

  _handleKeyDown(e) {
    if (!this._focusTrapActive || e.key !== 'Tab') return;
    
    const focusableElements = this._getFocusableElements();
    if (focusableElements.length === 0) return;
    
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    const activeElement = document.activeElement;
    
    const focusIsInsideDrawer = focusableElements.includes(activeElement);
    if (!focusIsInsideDrawer) return;
    
    if (e.shiftKey && activeElement === firstElement) {
      e.preventDefault();
      lastElement.focus();
    }
    else if (!e.shiftKey && activeElement === lastElement) {
      e.preventDefault();
      firstElement.focus();
    }
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
