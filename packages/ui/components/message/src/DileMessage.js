import { html, css, LitElement } from "lit";
import { DileSlideDown } from "../../../mixins/slide-down/index.js";
import '../../icon/icon.js';
import { closeIcon } from '@dile/icons/index.js'

export class DileMessage extends DileSlideDown(LitElement) {
  static get styles() {
    return [
      css`
        :host {
          display: block;
          --dile-close-icon-template-color: var(--dile-message-icon-color, #fff);
        }
        #message {
          height: 0;
          overflow: hidden;
          transition: height 0.3s ease-in;
          -webkit-transition: height 0.3s ease-in;
          position: fixed;
          width: 100%;
          z-index: var(--dile-message-z-index, 1);
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
          cursor: pointer;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        :host([hideCloseIcon]) .icon {
          display: none;
        }
        :host([position='top']) #message {
          top: 0;
          left: 0;
        }
        :host([position='bottom']) #message {
          bottom: 0;
          left: 0;
        }
        :host([position='relative']) #message {
          position: relative;
        }
        :host([position='right-bottom']) #message {
          bottom: var(--dile-message-right-bottom-separation, 1.5rem);
          right: var(--dile-message-right-bottom-separation, 1.5rem);
          width: var(--dile-message-right-bottom-width, 80vw);
          max-width: var(--dile-message-right-bottom-max-width, 400px);
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
       * Position between top, bottom, right-bottom.
       */
      position: {
         type: String,
         reflect: true,
      },

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
    this.position = 'bottom';
    this.message = "";
  }

  firstUpdated() {
    this.display = this.shadowRoot.getElementById("message");
    if (this.opened) {
      this.slideShow(this.display);
    }
  }

  render() {
    return html`
      <div id="message">
        <section>
          <div class="content">
            ${
              this.message != "" && this.message != undefined
                ? this.message
                : html`<slot></slot>`
            }
          </div>
          <dile-icon .icon="${closeIcon}" class="icon" @click="${this.closeByUser}">
            
          </dile-icon>
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

}
