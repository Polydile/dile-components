import { html, css, LitElement } from "lit";
import { DileSlideDownMixin } from "@dile/dile-slide-down-mixin";
import { closeIcon, closeIconCss } from "@dile/dile-close-icon-template";

export class DileMessage extends DileSlideDownMixin(LitElement) {
  static get styles() {
    return [
      closeIconCss,
      css`
        :host {
          display: block;
          --dile-close-icon-template-color: var(--dile-message-color, #fff);
        }
        #message {
          height: 0;
          overflow: hidden;
          transition: height 0.3s ease-in;
          -webkit-transition: height 0.3s ease-in;
        }
        .fix-on-top,
        .fix-on-bottom {
          position: fixed;
          left: 0;
          width: 100%;
        }
        .fix-on-top {
          top: 0;
        }
        .fix-on-bottom {
          bottom: 0;
        }

        section {
          display: flex;
          align-items: center;
          background-color: var(--dile-message-background-color, #666);
          color: var(--dile-message-color, #fff);
          padding: var(--dile-message-padding, 15px);
        }
        .content {
          flex-grow: 1;
          margin-right: 5px;
        }
        @media (min-width: 420px) {
          .content {
            margin-right: 15px;
          }
        }
        .icon {
          min-width: var(--dile-message-icon-size, 20px);
          width: var(--dile-message-icon-size, 20px);
          cursor: pointer;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        :host([hideCloseIcon]) .icon {
          display: none;
        }
      `,
    ];
  }
  static get properties() {
    return {
      /**
       * If true the feedbak box is in opened status.
       */
      opened: { type: Boolean },
      /**
       * Message to display. If message='' then the component will display the content comming from the slot.
       */
      message: { type: String },
      /**
       * If true the feedbak box is fixed on the top of the page.
       */
      fixedOnTop: { type: Boolean },
      /**
       * If true the feedbak box is fixed on the bottom of the page.
       */
      fixedOnBottom: { type: Boolean },
      /**
       * If true the close icon will be hidden.
       */
      hideCloseIcon: { 
        type: Boolean,
        reflect: true 
      },
    };
  }

  constructor() {
    super();
    this.opened = false;
    this.fixedOnTop = false;
    this.message = "";
    this.fixedOnBottom = false;
  }

  firstUpdated() {
    this.display = this.shadowRoot.getElementById("message");
    if (this.opened) {
      this.slideShow(this.display);
    }
  }

  render() {
    return html`
      <div id="message" class="${this.createFixedClass(this.fixedOnTop, this.fixedOnBottom)}">
        <section>
          <div class="content">
            ${
              this.message != "" && this.message != undefined
                ? this.message
                : html`<slot></slot>`
            }
          </div>
          <div class="icon" @click="${this.closeByUser}">
            ${closeIcon}
          </div>
        </section>
      </div>
    `;
  }

  close() {
    if (this.opened) {
      this.slideHide(this.display);
      this.opened = false;
    }
  }

  closeByUser() {
    this.dispatchEvent(
      new CustomEvent("dile-message-closed-by-user", {
        detail: this,
      })
    );
    this.close();
  }

  open() {
    if(! this.opened ) {
      this.slideShow(this.display);
      this.opened = true;
    }
  }

  openMessage(msg) {
    this.message = msg;
    this.open();
  }

  updated(changedProperties) {
    if (changedProperties.has("opened") && this.opened) {
      this.open();
    }
  }

  createFixedClass(top, bottom) {
    if(top) {
      return 'fix-on-top';
    }
    if(bottom) {
      return 'fix-on-bottom';
    }
    return '';
  }
}
