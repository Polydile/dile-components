import { LitElement, html, css } from 'lit';
import { DileState } from '../lib/DileState.js';
import '@dile/ui/components/toast/toast.js';

export const DileAppFeedback = (store) => class extends DileState(store)(LitElement) {
  static styles = [
    css`
      :host {
        display: block;
        position: fixed;
        z-index: 999999;
      }
      @media(min-width: 500px) {
        dile-toast {
          --dile-toast-width: var(--dile-app-feedback-big-toast-width, 450px);
          --dile-toast-padding: var(--dile-app-feedback-big-toast-padding, 15px 20px);
        }
      }
    `
  ];

  static get properties() {
    return {
      time: { type: Number },
      incomingMsg: { type: Object },
    }
  }

  constructor() {
    super();
    this.time = 5000;
  }

  firstUpdated() {
    this.toast = this.shadowRoot.getElementById('toast');
  }

  stateChanged(state) {
    this.incomingMsg = state.feedback.message; 
  }

  updated(changedProperties) {
    if (changedProperties.has('incomingMsg')) {
      this.changeIncomingMsg(this.incomingMsg);
    }
  }

  changeIncomingMsg(feedbackMsg) {
    if (feedbackMsg && feedbackMsg.msg && feedbackMsg.status) {
      this.toast.open(feedbackMsg.msg, feedbackMsg.status);
    }
  }
  
  render() {
    return html`      
      <dile-toast id="toast" duration=${this.time}></dile-toast>
    `;
  }
}