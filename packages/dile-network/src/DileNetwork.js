import { html, css, LitElement } from "lit";
import { closeIcon, warningIcon } from "@dile/icons";
import '@dile/dile-toast-persistent/dile-toast-persistent';
import '@dile/dile-icon/dile-icon';

export class DileNetwork extends LitElement {
  static get styles() {
    return css`
      :host {
        display: inline;
        --dile-toast-persistent-padding: var(--dile-network-toast-padding, 0.65rem);
        --dile-toast-persistent-background-color: var(--dile-network-toast-background-color, #e33);
      }
      .msg {
        display: flex;
        align-items: center;
      }
      .label {
        display: flex;
        align-items: center;
        flex-grow: 1;
        color: var(--dile-network-label-text-color, #fff);
      }
      .label dile-icon {
        margin-right: 0.5rem;
        --dile-icon-color: var(--dile-network-warning-icon-color, #fff);
      }
      .closeicon {
        cursor: pointer;
        display: flex;
        align-items: center;
        --dile-icon-color: var(--dile-network-close-icon-color, #fff);
      }
    `;
  }
  static get properties() {
    return {
      onLine: {
        attribute: false,
      },
      showOffLineStatus: { type: Boolean },
      offLineLabel: { type: String },
      showCloseIcon: { type: Boolean },
    };
  }

  constructor() {
    super();
    this.onLine = window.navigator.onLine;
    window.addEventListener("online", () => this.dispatchOnline());
    window.addEventListener("offline", () => this.dispatchOffline());
    this.showOffLineStatus = false;
    this.showCloseIcon = false;
    this.offLineLabel = "Network is offline";
  }

  dispatchOffline() {
    this.onLine = false;
    this.sendEvent();
  }

  dispatchOnline() {
    this.onLine = true;
    this.sendEvent();
  }

  sendEvent() {
    this.dispatchEvent(
      new CustomEvent("dile-network-status", {
        bubbles: true,
        composed: true,
        detail: { onLine: this.onLine },
      })
    );
  }

  render() {
    return html`${!this.onLine && this.showOffLineStatus ? this.offlineTemplate : ""}`;
  }

  get offlineTemplate() {
    return html`<dile-toast-persistent id="eltoast" openOnInit>
          <div class="msg">
            <span class="label">
              <dile-icon .icon=${warningIcon}></dile-icon>
              ${this.offLineLabel}
            </span>
            ${this.showCloseIcon
              ? html`<span class="closeicon" @click=${this.closeToast}><dile-icon .icon=${closeIcon}></dile-icon></span>`
              : ''
            }
          </div>
      </dile-toast-persistent>`
  }

  closeToast() {
    this.shadowRoot.querySelector('#eltoast').close();
  }
}
