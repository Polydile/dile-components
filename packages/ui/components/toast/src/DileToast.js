import { LitElement, html, css } from "lit";
import { repeat } from "lit/directives/repeat.js";

export class DileToast extends LitElement {
  static get properties() {
    return {
      /* Messages array: Array of objects. You usually will not touch directly this array, instead of it, use the open() method */
      messages: { type: Array },
      /* Miliseconds the feedback message remains on the screen */
      duration: { type: Number },
      /* If true, shows a close icon on each toast so the user can dismiss it manually */
      showCloseIcon: { type: Boolean },
    };
  }

  constructor() {
    super();
    this.messages = [];
    this.duration = 3000;
    this.cleanTimeout = false;
    this.showCloseIcon = false;
    this._messageId = 0;
  }

  static get styles() {
    return css`
      :host {
        display: flex;
        flex-direction: column-reverse;
        position: fixed;
        bottom: 20px;
        left: 15px;
      }
    `;
  }

  render() {
    return html`
      ${repeat(
        this.messages,
        (msg) => msg.id,
        (msg) => html`
          <dile-toast-item
            .msg="${msg}"
            .showCloseIcon="${this.showCloseIcon}"
            duration="${this.duration}"
            @dile-toast-item-closed="${(e) => this._closeMessage(e.detail.id)}"
          ></dile-toast-item>
        `
      )}
    `;
  }

  /**
   * Send a message to show in the screen
   * @param text the text of the message
   * @param toastType the status of the message (success, error, neutral)
   */
  open(text, toastType = "neutral") {
    this.messages = [
      ...this.messages,
      {
        id: ++this._messageId,
        text,
        toastType,
        hidden: false,
        opening: true,
      },
    ];
    this._programMessageClean();
    this._programMessageHide();
  }

  /**
   * Closes a specific message before its automatic duration elapses, triggered by the user
   */
  _closeMessage(id) {
    const message = this.messages.find((item) => item.id === id);
    if (!message || message.hidden) return;
    this.messages = this.messages.map((item) =>
      item.id === id ? { ...item, hidden: true } : item
    );
    setTimeout(() => {
      this.messages = this.messages.filter((item) => item.id !== id);
    }, 500);
    this.dispatchEvent(
      new CustomEvent("dile-toast-closed-by-user", {
        bubbles: true,
        composed: true,
        detail: { message },
      })
    );
  }

  /**
   * Programs the hiding of the last message, after it's duration time
   */
  _programMessageHide() {
    setTimeout(() => {
      let foundItemToHide = false;
      this.messages = this.messages.map((item) => {
        if (!foundItemToHide && !item.hidden) {
          foundItemToHide = true;
          return {
            ...item,
            hidden: true,
          };
        } else {
          return item;
        }
      });
    }, this.duration);
  }

  /**
   * Programs the cleaning of the array of messages, removing the hidden messages elements
   */
  _programMessageClean() {
    if (this.cleanTimeout) {
      clearTimeout(this.cleanTimeout);
    }
    this.cleanTimeout = setTimeout(() => {
      this.messages = this.messages.filter((item) => !item.hidden);
    }, this.duration + 1000);
  }
}
