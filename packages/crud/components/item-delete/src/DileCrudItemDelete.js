import { LitElement, html, css } from 'lit';
import '@dile/ui/components/confirm/confirm';
import { ResponseApiAdapter } from '../../../lib/ResponseApiAdapter.js';

export class DileCrudItemDelete extends LitElement {
  static styles = [
    css`
      :host {
          display: block;
          --dile-modal-border-radius: 2px;
          --dile-modal-width: 300px;
          --dile-modal-height: auto;
          --dile-modal-content-padding: 1.5rem;
          --dile-modal-background-color: rgba(90, 20, 20, 0.7);
          --dile-modal-content-shadow-color: rgba(90, 20, 20, 0.5);
          --dile-confirm-buttons-text-align: center;
          --dile-confirm-accept-button-color: var(--delete-icon-color, #e33);
          --dile-confirm-accept-text-button-color: #fff;
          --dile-confirm-cancel-button-color: var(--neutral-icon-color, #337aad);
          --dile-confirm-cancel-text-button-color: #fff;
      }
      p {
          text-align: center;
          color: #303030;
      }
    `
  ];

  static get properties() {
    return {
      endpoint: { type: String },
      relatedId: { type: String },
      apiConfig: { type: Object},
      confirmMessage: { type: String },
      cancelLabel: { type: String },
      acceptLabel: { type: String },
    };
  }

  constructor() {
    super();
    this.responseAdapter = new ResponseApiAdapter();
    this.confirmMessage = 'Are you sure you want to delete this item?';
    this.cancelLabel = 'Cancel';
    this.acceptLabel = 'Delete'
  }

  firstUpdated() {
    this.elconfirm = this.shadowRoot.getElementById('elconfirm');
    this.ajaxdelete = this.shadowRoot.getElementById('ajaxdelete');
  }

  render() {
    return html`
      <dile-ajax
          id="ajaxdelete"
          method="delete"
          url="${this.endpoint}/${this.relatedId}"
          @ajax-success="${this.doSuccessDelete}"
          @ajax-error="${this.doErrorDelete}"
      ></dile-ajax>
      <dile-confirm 
          cancelLabel="${this.cancelLabel}"
          acceptLabel="${this.acceptLabel}"
          id="elconfirm"
          @dile-confirm-accepted=${this.deleteAccepted}
      >
          <p>${this.confirmMessage}</p>
      </dile-confirm>
  `;
  }

  delete(itemId) {
    this.relatedId = itemId;
    this.elconfirm.open();
  }

  deleteAccepted() {
    this.ajaxdelete.generateRequest();
  }

  doSuccessDelete(e) {
    this.dispatchEvent(new CustomEvent('delete-success', { bubbles: true, composed: true }));
  }
  
  doErrorDelete(e) {
    let msg = this.computeResponseMessage(e.detail);
    this.dispatchEvent(new CustomEvent('delete-error', { 
      bubbles: true, 
      composed: true,
      detail: {
        msg,
        previousDetail: e.detail,
      }
    }));
  }

  computeResponseMessage(detail) {
    this.responseAdapter.setResponse(detail);
    let msg = this.responseAdapter.getMessage();
    if(! msg) {
      msg = 'Error';
    }  
    return msg;
  }
}
