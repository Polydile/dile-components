import { LitElement, html, css } from "lit";
import { DileOverlay } from "../../../mixins/overlay/index.js"
import { DileCloseDocumentClick } from "../../../mixins/close-document-click/index.js";

export class DileMenuOverlay extends DileOverlay(DileCloseDocumentClick(LitElement)) {
  static get styles() {
    return css`
      :host {
        display: inline-block;
        position: relative;
        box-sizing: border-box;
      }
      #overlay {
        box-sizing: border-box;
        color: var(--dile-menu-overlay-color, #303030);
        z-index: var(--dile-menu-overlay-z-index, 999);
        background-color: var(--dile-menu-overlay-background-color, #fff);
        border-radius: var(--dile-menu-overlay-border-radius, 5px);
        width: var(--dile-menu-overlay-width, 280px);
        max-width: var(--dile-menu-overlay-max-width, 300px);
        box-shadow: var(--dile-menu-overlay-box-shadow, 0 0 20px rgba(102, 102, 102, 0.5));
        padding: var(--dile-menu-overlay-padding, 1px);
        display: none;
        position: absolute;
        opacity: 0;
        transition: var(--dile-menu-overlay-transition, ease 0.5s);
        transition-property: transform, opacity;
        transform: translateY(-10px);
      }
      #overlay.opened {
        opacity: 1;
        transform: translateY(0);
      }
      #trigger {
        display: flex;
      }
    `;
  }

  static get properties() {
    return {
      closeOnClickInside: { type: Boolean },
    };
  }

  constructor() {
    super();
    this.closeOnClickInside = false;
    this._escKeydownHandler = this._onEscKeydown.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    // In the capture phase, so an opened menu gets the key before the layers that contain it, like a modal.
    window.addEventListener('keydown', this._escKeydownHandler, true);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener('keydown', this._escKeydownHandler, true);
  }

  updated(changedProperties) {
    super.updated(changedProperties);
    if (changedProperties.has('_overlayClass') && this._overlayClass === 'opened') {
      this.dispatchEvent(new CustomEvent('overlay-ready', {
        bubbles: true,
        composed: true,
      }));
    }
  }

  render() {
    return html`
      <span @click="${this.toggle}" id="trigger">
        <slot name="trigger"></slot>
      </span>
      <div
        id="overlay"
        class="${this._overlayClass}"
        ?inert="${!this._overlayClass && !this._opening}"
        @click="${this.clickHandler}"
      >
        <slot name="content"></slot>
      </div>
    `;
  }

  open() {
    if (!this._overlayClass && !this._opening) {
      this._focusBeforeOpen = this._getActiveElement();
    }
    super.open();
  }

  _getActiveElement() {
    let active = document.activeElement;
    while (active?.shadowRoot?.activeElement) {
      active = active.shadowRoot.activeElement;
    }
    return active;
  }

  _onEscKeydown(e) {
    if (e.key !== 'Escape' || this._overlayClass !== 'opened') {
      return;
    }
    // Only the menu closes: a modal or drawer that contains it stays opened until the next Escape.
    e.stopPropagation();
    this.close();
    if (this.overlay.matches(':focus-within') && this._focusBeforeOpen?.isConnected) {
      this._focusBeforeOpen.focus();
    }
  }

  clickHandler(e) {
    if(! this.closeOnClickInside) {
      e.stopPropagation();
    }
  }
}