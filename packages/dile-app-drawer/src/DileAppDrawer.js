import { LitElement, html, css } from "lit-element";
import { DileCloseOnEscPressed } from '@dile/dile-close-on-esc-pressed-mixin';

export class DileAppDrawer extends DileCloseOnEscPressed(LitElement) {
  static get properties() {
    return {
      direction: { type: String },
      opened: { type: Boolean },
      _currentClass: { type: String },
      _directionClass: { type: String },
    };
  }

  constructor() {
    super();
    this.opened = false;
    this._currentClass = "";
    this.documentCloseHandler = this._documentClose.bind(this);
    this.direction = 'top';
    this._directionClass = 'top';
  }

  static get styles() {
    return css`
      :host {
        display: block;
      }
      .menu {
        position: fixed;
        box-sizing: border-box;
        background-color: var(--dile-app-drawer-background-color, #ddd);
        z-index: var(--dile-app-drawer-z-index, 10001);
        overflow: hidden;
        transition: transform 0.3s ease;
        align-items: flex-end;
      }
      div.top {
        top: var(--dile-app-drawer-closed-top, -100vh);
        left: var(--dile-app-drawer-closed-left, 0);
        height: var(--dile-app-drawer-content-height, auto);
        width: var(--dile-app-drawer-content-width, 100vw);
      }
      div.left {
        top: var(--dile-app-drawer-closed-top, 0);
        left: var(--dile-app-drawer-closed-left, -100vw);
        height: var(--dile-app-drawer-content-height, 100vh);
        width: var(--dile-app-drawer-content-width, auto);
        box-shadow: 4px 0 8px #000;
      }
      section {
        transform: translateX(-100vw);
        transition-property: transform;
        transition-duration: 0.2s;
        transition-delay: 0.3s;
        transition-timing-function: ease;
      }
      .opening {
        display: block;
      }
      div.opened {
        display: block;
      }
      div.top.opened {
        transform: translateY(100vh);
        box-shadow: var(--dile-app-drawer-box-shadow, 0 1px 8px #000);
      }
      section.top.opened {
        transform: translateX(0);
      }
      div.left.opened {
        transform: translateX(100vw);
        box-shadow: var(--dile-app-drawer-box-shadow, 1px 0 8px #000);
      }
      section.left.opened {
        transform: translateX(0);
      }

      div.modal {
        background-color: var(
          --dile-app-drawer-modal-background-color,
          rgba(20, 20, 20, 0.7)
        );
        position: fixed;
        width: 100vw;
        height: 100vh;
        top: 0;
        left: 0;
        z-index: var(--dile-app-drawer-modal-z-index, 10000);
        opacity: 0;
        transition: opacity 0.3s ease;
      }
      div.modal.opened {
        opacity: 1;
      }
    `;
  }

  render() {
    return html`
      ${this.modalTemplate}
      <div
        class="menu ${this._directionClass} ${this._currentClass}"
        @click="${this._contentClick}"
      >
        <section class="${this._directionClass} ${this._currentClass}">
          <slot></slot>
        </section>
      </div>
    `;
  }

  get modalTemplate() {
    return html`
      ${this.opened
        ? html`
            <div
              @click=${this.documentCloseHandler}
              class="modal ${this._currentClass}"
            ></div>
          `
        : ""}
    `;
  }

  updated(changedProperties) {
    if (changedProperties.has("opened")) {
      if (this.opened) {
        this._currentClass = "opening";
        setTimeout(() => (this._currentClass = "opened"), 100);
        document.body.style.overflow = 'hidden';
      } else {
        this._currentClass = "opening";
        setTimeout(() => (this._currentClass = ""), 200);
        document.body.style.overflow = "visible";
      }
    }
    if(changedProperties.has("direction")) {
      if (this.direction == "left") {
        this._directionClass = "left";
      } else {
        this._directionClass = "top";
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
