import { LitElement, html, css } from "lit-element";
import { DileCloseOnEscPressed } from '@dile/dile-close-on-esc-pressed-mixin'
export class DileAppDrawer extends DileCloseOnEscPressed(LitElement) {
  static get properties() {
    return {
      opened: { type: Boolean },
      _currentClass: { type: String },
    };
  }

  constructor() {
    super();
    this.opened = false;
    this._currentClass = "";
    this.documentCloseHandler = this._documentClose.bind(this);
  }

  static get styles() {
    return css`
      :host {
        display: block;
      }

      .menu {
        display: none;
        position: fixed;
        box-sizing: border-box;
        top: -100vh;
        left: 0;
        width: 100vw;
        height: var(--dile-app-drawer-content-height, auto);
        background-color: var(--dile-app-drawer-background-color, #ddd);
        z-index: var(--dile-app-drawer-z-index, 10000);
        padding-top: var(--dile-app-drawer-closed-top, 40vh);
        padding-left: var(--dile-app-drawer-closed-left, 0);
        overflow: hidden;
        transition-property: top, padding;
        transition-duration: 0.3s, 0.3s;
        transition-delay: 0s, 0.31s;
        transition-timing-function: ease, ease-in;
      }

      .opening {
        display: block;
      }

      .opened {
        top: 0;
        padding: 0;
        display: block;
      }
    `;
  }

  render() {
    return html`
      <div
        class="menu ${this._currentClass}"
        @click="${this._contentClick}"
      >
        <slot></slot>
      </div>
    `;
  }

  updated(changedProperties) {
    if (changedProperties.has("opened")) {
      if (this.opened) {
        document.addEventListener("click", this.documentCloseHandler);
        this._currentClass = "opening";
        setTimeout(() => (this._currentClass = "opened"), 100);
      } else {
        document.removeEventListener("click", this.documentCloseHandler);
        this._currentClass = "opening";
        setTimeout(() => (this._currentClass = ""), 200);
      }
    }
  }

  _documentClose() {
    if (this._currentClass == "opened") {
      this.close();
      this.dispatchEvent(
        new CustomEvent("dile-app-drawer-click-outside", {
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
    this.dispatchEvent(new CustomEvent('dile-app-drawer-closed', {
      bubbles: true,
      composed: true,
    }));
  }

  _contentClick(e) {
    e.stopPropagation();
  }
}
