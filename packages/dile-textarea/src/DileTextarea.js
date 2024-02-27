import { LitElement, html, css } from 'lit';
import { messageStyles } from '@dile/dile-input';

export class DileTextarea extends LitElement {

  static get styles() {
    return [
      messageStyles, 
      css`
      :host {
        display: block;
        margin-bottom: 10px;
      }
      label {
        margin-bottom: var(--dile-textarea-label-margin-bottom, 4px);
        color: var(--dile-textarea-label-color, #59e);
        font-size: var(--dile-textarea-label-font-size, 1em);
        font-weight: var(--dile-textarea-label-font-weight, normal);
      }

      textarea {
        border: var(--dile-textarea-border, 1px solid #888);
        border-radius: var(--dile-textarea-border-radius, 5px);
        padding: var(--dile-textarea-padding, 5px);
        background-color: var(--dile-textarea-background-color, #fff);
        color: var(--dile-textarea-color, #000);
        font-size: var(--dile-textarea-font-size, 1em);
        font-family: var(--dile-textarea-font-family, sans-serif);
        width: 100%;
        box-sizing: border-box; 
        line-height: 1.5rem;
      }

      textarea::placeholder {
        color: var(--dile-textarea-placeholder-color, #999);
      }

      :host([disabled]) textarea {
        background-color: var(--dile-textarea-disabled-background-color, #ebebeb);
        border-color: var(--dile-textarea-disabled-border-color, #ccc);
      }
      
      .errored {
        border-color: var(--dile-input-error-border-color, #c00);
      }
      .for-input {
        display: flex;
      }
      
    `];
  }

  static get properties() {
    return {
      name: { type: String },
      label: { type: String },
      errored: { 
        type: Boolean,
        reflect: true
      },
      message: { type: String },
      hideErrorOnInput: { type: Boolean },
      value: { type: String },
      placeholder: { type: String },
      rows: { type: Number },
      maxRows: { type: Number },
      readonly: { type: Boolean },
      disabled: { 
        type: Boolean,
        reflect: true,
       },
    };
  }

  constructor() {
    super();
    this.errored = false;
    this.hideErrorOnInput = false;
    this.value = '';
    this.rows = 3;
    this.maxRows = 10;
    this._maxHeight = 100;
  }

  firstUpdated() {
    this.eltextarea = this.shadowRoot.getElementById('textArea');
    this.resizeTextarea();
  }

  placeCursorAtEnd() {
    this.eltextarea.setSelectionRange(this.eltextarea.value.length, this.eltextarea.value.length);
    this.eltextarea.focus();
  }

  updated(changedProperties) {
    if(changedProperties.has('maxRows')) {
      this.calculateMaxHeight();
    }
  }
  
  render() {
    return html`
      <main>
        ${this.label
          ? html`<label for="textArea">${this.label}</label>`
          : ""}
         <section class="for-input">
          <textarea
            rows="${this.rows}"
            id="textArea"
            name="${this.name}"
            placeholder="${this.placeholder}"
            ?disabled="${this.disabled}"
            ?readonly="${this.readonly}"
            autocomplete="${this.disableAutocomplete ? "off" : "on"}"
            .value="${this.value}"
            class="${this.errored ? 'errored' : ''}"
            @keypress="${this._lookForEnter}"
            @input="${this.onInput}"
            @blur="${this.doBlur}"
            @focus="${this.doFocus}"
          ></textarea> 
          ${this.labelRight 
            ? html`<span class="labelright">${this.labelRight}</span>`
            : ''
          }
        </section>
        ${this.message 
          ? html`<div class="message ${this.errored ? 'errored-msg' : ''}"><span>${this.message}</span></div>`
          : ''
        }
      </main>
    `;
  }

  onInput(e) {
    if(this.hideErrorOnInput && this.errored) {
      this.errored = false;
      this.message = '';
    }
    this._resizeTextarea();
    this.value = this.eltextarea.value;
  }

  _resizeTextarea() {
    this.eltextarea.style.height = 'auto';
    let scrollHeight = this.eltextarea.scrollHeight;
    if(scrollHeight == 0) {
      scrollHeight = this.lineHeight * this.rows;
    }
    let height = Math.min(scrollHeight, this._maxHeight);
    this.eltextarea.style.height = height + 'px';
  }

  resizeTextarea() {
    this.updateComplete.then(() => this._resizeTextarea());
  }

  get lineHeight() {
    return parseInt(getComputedStyle(this.eltextarea).lineHeight, 10);
  }
  calculateMaxHeight() {
    this._maxHeight = this.lineHeight * this.maxRows;
  }

}