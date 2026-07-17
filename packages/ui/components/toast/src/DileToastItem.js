import { LitElement, html, css } from "lit";
import { clearIcon } from "@dile/icons/index.js";
import "../../icon/icon.js";

export class DileToastItem extends LitElement {
  static get properties() {
    return {
      msg: { type: Object },
      showCloseIcon: { type: Boolean },
    };
  }

  constructor() {
    super();
    this.msg = {
      msg: "",
      toastType: "neutral",
      hidden: false,
      opening: true,
    };
    this.showCloseIcon = false;
  }

  static get styles() {
    return css`
      * {
        box-sizing: border-box;
      }
      :host {
        display: block;
      }
      div {
        display: flex;
        align-items: center;
        justify-content: space-between;
        color: var(--dile-toast-text-color, #fff);
        padding: var(--dile-toast-padding, 10px 15px);
        margin-top: 10px;
        position: relative;
        top: 0;
        opacity: 1;
        width: var(--dile-toast-width, 280px);
        overflow: hidden;
        transition: all 0.4s ease;
        z-index: var(--dile-toast-z-index, 1001);
        font-size: var(--dile-toast-font-size, 1em);
        font-weight: var(--dile-toast-font-weight, normal);
        border-radius: var(--dile-toast-border-radius, 0);
      }
      .text {
        flex-grow: 1;
      }
      .closeicon {
        cursor: pointer;
        flex-shrink: 0;
        margin-left: 10px;
        --dile-icon-color: var(--dile-toast-close-icon-color, var(--dile-toast-text-color, #fff));
        --dile-icon-size: var(--dile-toast-close-icon-size, 16px);
      }
      .hidden {
        top: 20px;
        opacity: 0;
        height: 0;
        padding: 0;
      }
      .error {
        background-color: var(--dile-toast-error-color, #e74c3c);
      }
      .success {
        background-color: var(--dile-toast-success-color, #27ae60);
      }
      .neutral {
        background-color: var(--dile-toast-neutral-color, #303030);
      }
      .opening {
        top: -20px;
      }
    `;
  }

  render() {
    return html`
      <div
        class="${this.msg.hidden ? "hidden" : ""} ${this.msg.opening
          ? "opening"
          : ""} ${this.getClassType(this.msg.toastType)}"
      >
        <span class="text">${this.msg.text}</span>
        ${this.showCloseIcon
          ? html`<dile-icon
              .icon="${clearIcon}"
              class="closeicon"
              @click="${this.closeByUser}"
            ></dile-icon>`
          : ""}
      </div>
    `;
  }

  closeByUser() {
    this.dispatchEvent(
      new CustomEvent("dile-toast-item-closed", {
        bubbles: true,
        composed: true,
        detail: { id: this.msg.id, msg: this.msg },
      })
    );
  }

  firstUpdated() {
    setTimeout(() => {
      this.msg.opening = false;
      this.requestUpdate();
    }, 20);
  }

  getClassType(toastType) {
    switch (toastType) {
      case "error":
      case "success":
        return toastType;
      default:
        return "neutral";
    }
  }
}
