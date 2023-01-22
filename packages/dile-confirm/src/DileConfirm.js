import { LitElement, html, css } from "lit";
import "@dile/dile-modal/dile-modal.js";

export class DileConfirm extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
      }
      .button {
        border-radius: var(--dile-confirm-border-radius-button, 5px);
        padding: var(--dile-confirm-padding-button, 7px);
        font-size: var(--dile-confirm-font-size-button, 1em);
        text-transform: var(--dile-confirm-text-transform, uppercase);
        text-decoration: none;
      }
      .cancel {
        background-color: var(--dile-confirm-cancel-button-color, #dc3545);
        color: var(--dile-confirm-cancel-text-button-color, #fff);
      }
      .accept {
        background-color: var(--dile-confirm-accept-button-color, #007bff);
        color: var(--dile-confirm-accept-text-button-color, #fff);
      }
      .actions {
        margin-top: var(--dile-confirm-buttons-margin-top, 10px);
        margin-bottom: var(--dile-confirm-buttons-margin-bottom, 10px);
        margin-right: var(--dile-confirm-buttons-margin-right, 0);
        margin-left: var(--dile-confirm-buttons-margin-left, 0);
        text-align: var(--dile-confirm-buttons-text-align, right);
      }
      .actions a {
        margin: 4px;
        white-space: nowrap;
        display: inline-block;
      }
    `;
  }

  static get properties() {
    return {
      opened: { type: Boolean },
      acceptLabel: { type: String },
      cancelLabel: { type: String },
      blocking: { type: Boolean },
    };
  }

  constructor() {
    super();
    this.acceptLabel = "Accept";
    this.cancelLabel = "Cancell";
    this.opened = false;
    this.blocking = false;
  }

  render() {
    return html`
      <dile-modal
        ?blocking="${this.blocking}"
        ?opened="${this.opened}"
        id="modal"
        @dile-modal-background-closed="${this.cancel}"
      >
        <slot></slot>
        <div class="actions">
          <a href="#" class="button cancel" @click="${this._cancelHandler}"
            >${this.cancelLabel}</a
          >
          <a href="#" class="button accept" @click="${this._acceptHandler}"
            >${this.acceptLabel}</a
          >
        </div>
      </dile-modal>
    `;
  }

  _cancelHandler(e) {
    e.preventDefault();
    this.cancel();
  }
  _acceptHandler(e) {
    e.preventDefault();
    this.accept();
  }

  open() {
    this.opened = true;
  }

  close() {
    this.opened = false;
  }

  firstUpdated() {
    this.modal = this.shadowRoot.getElementById("modal");
  }

  accept() {
    this.close();
    this.dispatchEvent(
      new CustomEvent("dile-confirm-accepted", {
        bubbles: true,
        composed: true,
      })
    );
  }

  cancel() {
    this.close();
    this.dispatchEvent(
      new CustomEvent("dile-confirm-cancelled", {
        bubbles: true,
        composed: true,
      })
    );
  }
}
