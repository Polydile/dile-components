import { LitElement, html, css } from 'lit';
import { DileState } from '../lib/DileState.js';
import '@dile/ui/components/modal/modal.js';
import '@dile/ui/components/icon/icon.js';
import '@dile/ui/components/button/button.js';
import { modalClose } from '../redux/feedback-slice.js';

export const DileAppModalFeedback = (store) => class extends DileState(store)(LitElement) {
  static styles = [
    css`
      :host {
        display: block;
      }
      .content {
        display: flex;
        margin-bottom: 0.75rem;
        gap: 0.5rem;
        align-items: center;
      }
      .message {
        flex-grow: 1;
      }
      .icon {
        display: flex;
        --dile-icon-size: 32px;
      }
      .warning {
        --dile-icon-color: var(--dile-alert-warning-color, #d7b740);
      }
      .success {
        --dile-icon-color: var(--dile-alert-success-color, #00900f);
      }
      .error {
        --dile-icon-color: var(--dile-alert-error-color, #cf3535);
      }
      .neutral {
        --dile-icon-color: var(--dile-alert-neutral-color, #2889a7);
      }
    `
  ];

  static get properties() {
    return {
      incomingMsg: { type: Object },
      modalOpened: { type: Boolean },
    }
  }

  constructor() {
    super();
  }

  get elmodal() {
    return this.shadowRoot.getElementById('modal');
  }

  stateChanged(state) {
    this.incomingMsg = state.feedback.modalMessage; 
    this.modalOpened = state.feedback.modalOpened;
  }

  updated(changedProperties) {
    if (changedProperties.has('modalOpened')) {
      if(this.modalOpened) {
          this.elmodal.open();
      } else if(this.elmodal.opened) {
          this.elmodal.close();
      }
    }
  }
  
  render() {
    return html`
      ${this.modalElement}
    `;
  }

  get modalElement() {
      return html`
        <dile-modal id="modal" blocking @dile-modal-closed=${this.close}>
          <div class="content">
            ${this.incomingMsg?.icon
              ? html`<div class="icon"><dile-icon class="${this.incomingMsg.iconClass}" .icon="${this.incomingMsg.icon}"></dile-icon></div>`
              : ''
            }
            
            <div class="message">${this.incomingMsg?.message}</div>
          </div>
          <div class="actions">
            <dile-button class="cancel" @click="${this.close}">${this.incomingMsg?.label}</dile-button>
          </div>
        </dile-modal>
      `
  }

  close() {
    store.dispatch(modalClose());
  }
}