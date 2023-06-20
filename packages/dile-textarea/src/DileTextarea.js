import { html, css } from 'lit';
import { LionTextarea } from '@lion/textarea';
import { messageStyles } from '@dile/dile-input';

export class DileTextarea extends LionTextarea {

  static get styles() {
    return [
      ...super.styles, 
      messageStyles, 
      css`
      :host {
        margin-bottom: 10px;
      }
      ::slotted(label) {
        display: none;
        margin-bottom: var(--dile-textarea-label-margin-bottom, 4px);
        color: var(--dile-textarea-label-color, #59e);
        font-size: var(--dile-textarea-label-font-size, 1em);
      }
      :host([label]) ::slotted(label){
        display: inline-block;
      }
      ::slotted(textarea) {
        border: var(--dile-textarea-border, 1px solid #888);
        border-radius: var(--dile-textarea-border-radius, 5px);
        padding: var(--dile-textarea-padding, 5px);
      }
      .input-group__container > .input-group__input ::slotted(textarea.form-control) {
        font-size: var(--dile-textarea-font-size, 1em);
        font-family: var(--dile-textarea-font-family, sans-serif);
      }
      :host([errored]) ::slotted(textarea) {
        border-color: var(--dile-input-error-border-color, #c00);
      }
      
    `];
  }

  static get properties() {
    return {
      errored: { 
        type: Boolean,
        reflect: true
      },
      message: { type: String },
      hideErrorOnInput: { type: Boolean },
    };
  }
  get textareaElement() {
    return this.querySelector('textarea');
  }

  placeCursorAtEnd() {
    let element = this.textareaElement;
    element.setSelectionRange(element.value.length, element.value.length);
    element.focus();
  }
  
  render() {
    return html`
      ${super.render()}
      ${this.message 
        ? html`<div class="message ${this.errored ? 'errored-msg' : ''}"><span>${this.message}</span></div>`
        : ''
      }
    `;
  }
  
  constructor() {
    super();
    this.errored = false;
    this.hideErrorOnInput = false;
    this.inputHandler = this.onInput.bind(this)
  }

  connectedCallback() {
    super.connectedCallback();
    this.textareaElement.addEventListener('input', this.inputHandler);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.textareaElement.removeEventListener('input', this.inputHandler);
  }

  onInput() {
      if(this.hideErrorOnInput && this.errored) {
        this.errored = false;
        this.message = '';
      }
  }
}