import { LitElement, html, css } from 'lit';
import { DileConfirm } from '../../confirm/src/DileConfirm.js';
import '../../modal/modal.js';
import '../../input/input.js';
import '../../inline-feedback/inline-feedback.js';

export class DileConfirmText extends DileConfirm {

  static get styles() {
    return [super.styles, css`
      :host {
        display: block;
        --dile-modal-background-color: rgba(90, 0, 0, 0.8);
        --dile-modal-content-shadow-color: rgba(20, 0, 0, 0.5);
        --dile-confirm-cancel-button-color: #007bff;
        --dile-confirm-accept-button-color: #dc3545;
        --dile-input-message-color: #991010;
      }
      .content {
        padding: 1rem;
        text-align: left;
      }
      .title {
        padding: 0 1rem;
        padding-top: 1rem;
        font-size: 1.2em;
        font-weight: bold;
        margin-bottom: 0.5rem;
      }
    `];
  }

  static get properties() {
    return {
      ...super.properties,
      title: { type: String },
      confirmationText: { type: String },
      inputLabel: { type: String },
      inputMessage: { type: String },
      wrongTextMessage: { type: String },
      emptyTextMessage: { type: String },
    };
  }

  constructor() {
    super();
    this.confirmationText = 'CONFIRM';
    this.inputLabel = 'Type ' + this.confirmationText + ' in the text field to confirm your action.';
    this.inputMessage = 'Your data will be deleted and cannot be recovered.';
    this.wrongTextMessage = `You must type "${this.confirmationText}" in uppercase letters`;
    this.emptyTextMessage = 'You have not typed anything in the text field';
  }

  render() {
    return html`
      <dile-modal 
        ?blocking="${this.blocking}" 
        ?opened="${this.opened}" 
        id="modal" 
        @dile-modal-background-closed="${this.cancel}">
        ${this.title ? html`<div class="title">${this.title}</div>` : ''}
        <div class="content">
          <slot></slot>
          <dile-input 
            id="eltext" 
            @focus="${this.cleanInline}" 
            label="${this.inputLabel}"
            message="${this.inputMessage}"></dile-input>
          <dile-inline-feedback id="feedback"></dile-inline-feedback>
          <div class="actions">
            <a href="#" class="button cancel" @click="${this._cancelHandler}">${this.cancelLabel}</a>
            <a href="#" class="button accept" @click="${this._acceptHandler}">${this.acceptLabel}</a>
          </div>
        </div>
      </dile-modal>
    `;
  }

  _acceptHandler(e) {
    e.preventDefault();
    this.feedback.clear();
    let text = this.shadowRoot.getElementById('eltext').value;
    if(text === '') {
      this.feedback.negativeFeedback(this.emptyTextMessage);
      return;
    }
    if(text !== this.confirmationText) {
      this.feedback.negativeFeedback(this.wrongTextMessage);
      return;
    }
    this.accept();
  }

  firstUpdated() {
    super.firstUpdated();
    this.feedback = this.shadowRoot.getElementById('feedback');
  }

  cleanInline() {
    this.feedback.clear();
  }

  cancel() {
    super.cancel();
    this.cleanInline();
  }
}
