import { LitElement, html, css } from "lit";
import { closeIcon, closeIconCss } from "@dile/dile-close-icon-template";
import { DileCloseOnEscPressed } from '@dile/dile-close-on-esc-pressed-mixin'

export class DileModal extends DileCloseOnEscPressed(LitElement) {
  static get properties() {
    return {
      _toChange: { type: Boolean },
      /**
       * If true the modal box is in opened status.
       */
      opened: { type: Boolean },
      /**
       * If true the modal box displays a close icon
       */
      showCloseIcon: { type: Boolean },
      /**
       * If true the modal box blocks the screen. That is, when you click in the background layer, the modal box do not close.
       */
      blocking: { type: Boolean },
    };
  }

  constructor() {
    super();
    this._toChange = false;
    this.opened = false;
    this.showCloseIcon = false;
    this.blocking = false;
  }

  static get styles() {
    return [
      closeIconCss,
      css`
        * {
          box-sizing: border-box;
        }
        :host {
          display: block;
          --dile-close-icon-template-color: var(
            --dile-modal-close-icon-color,
            #888
          );
        }
        section {
          position: fixed;
          left: 0;
          top: 0;
          height: 100vh;
          width: 100vw;
          display: none;
          transition: opacity var(--dile-modal-animation-duration, 0.3s) ease-in;
          -webkit-transition: opacity var(--dile-modal-animation-duration, 0.3s)
            ease-in;
          align-items: center;
          justify-content: center;
          z-index: var(--dile-modal-z-index, 100);
          background-color: var(
            --dile-modal-background-color,
            rgba(30, 30, 30, 0.8)
          );
        }
        .content {
          display: block;
          position: relative;
          z-index: var(--dile-modal-content-z-index, 101);
          width: var(--dile-modal-width, 280px);
          min-width: var(--dile-modal-min-width, 250px);
          max-width: var(--dile-modal-max-width, 100vw);
          height: var(--dile-modal-height, auto);
          min-height: var(--dile-modal-min-height, auto);
          max-height: var(--dile-modal-max-height, 100vh);
          background-color: var(--dile-modal-content-background-color, #fff);
          box-shadow: var(--dile-modal-content-shadow-displacement, 6px)
            var(--dile-modal-content-shadow-displacement, 6px)
            var(--dile-modal-content-shadow-blur, 16px)
            var(--dile-modal-content-shadow-color, #000);
          border-radius: var(--dile-modal-border-radius, 15px);
          padding: var(--dile-modal-content-padding, 1em) 0
            var(--dile-modal-content-padding, 1em)
            var(--dile-modal-content-padding, 1em);
        }
        article {
          overflow: auto;
          max-height: 100%;
          height: 100%;
          padding-right: var(--dile-modal-content-padding, 1em);
        }
        .transparent {
          opacity: 0;
        }
        .opaque {
          opacity: 1;
          display: flex !important;
        }
        .opened {
          display: flex !important;
        }
        span {
          position: absolute;
          display: inline-block;
          top: var(--dile-modal-close-icon-top, 5px);
          right: var(--dile-modal-close-icon-right, 18px);
          z-index: 1002;
          width: var(--dile-modal-close-icon-size, 24px);
          height: var(--dile-modal-close-icon-size, 24px);
          cursor: var(--dile-modal-close-icon-cursor, pointer);
        }
        .contentIconSeparation {
          padding-top: var(--dile-modal-extra-top-separation-when-icon, 10px);
        }
      `,
    ];
  }

  render() {
    return html`
      <section
        class="${this.getModalClass(this.opened, this._toChange)}"
        @click="${this._backgroundModalClick}"
        @transitionend="${this.animationEnd}"
        id="backgroundmodal"
      >
        <div class="content" @click="${this.contentClick}">
          ${this.showCloseIcon
            ? html`<span @click="${this.close}">${closeIcon}</span>`
            : ""}
          <article class="${this.showCloseIcon ? "contentIconSeparation" : ""}">
            <slot></slot>
          </article>
        </div>
      </section>
    `;
  }

  getModalClass(opened, _toChange) {
    if (!opened && !_toChange) {
      return "transparent";
    }
    if (opened && _toChange) {
      return "transparent opened";
    }
    if (opened && !_toChange) {
      return "opaque";
    }
    if (!opened && _toChange) {
      return "transparent opened";
    }
  }

  open() {
    this.opened = true;
    this._toChange = true;
    setTimeout(() => {
      this._toChange = false;
    }, 50);
  }

  _backgroundModalClick(e) {
    if (!this.blocking && e.target && e.target.getAttribute("id") === "backgroundmodal") {
      this.close();
      this.dispatchEvent(
        new CustomEvent("dile-modal-background-closed", {
          bubbles: true,
          composed: true,
          detail: this,
        })
      );
    }
  }

  close() {
    this.opened = false;
    this._toChange = true;
    this.dispatchEvent(
      new CustomEvent("dile-modal-closed", {
        bubbles: true,
        composed: true,
        detail: this,
      })
    );
  }

  animationEnd() {
    this._toChange = false;
  }

  
}
