import { LitElement, html, css } from 'lit';
import { DileEmmitChange } from '../../../mixins/form/index.js';
import '../number-picker-element.js';
import { messageStyles } from '../../input/src/message-styles.js';


export class DileNumberPicker extends DileEmmitChange(LitElement) {
  static styles = [
      messageStyles,
      css`
      :host {
        display: block;
        margin-bottom: 10px;
      }
      * {
        box-sizing: border-box;
      }
      label {
        display: block;
        margin-bottom: var(--dile-input-label-margin-bottom, 4px);
        font-size: var(--dile-input-label-font-size, 1em);
        color: var(--dile-input-label-color, #59e);
        font-weight: var(--dile-input-label-font-weight, normal);
      }
  `
  ];

  static get formAssociated() {
    return true;
  }

  static get properties() {
    return {
      value: { type: String },
      digits: { type: Number },
      leadingZeros: { type: Boolean },
      step: { type: Number },
      
      /** Label to the element */
      label: { type: String },

      /** Disable the input field */
      disabled: { type: Boolean },

      /** Name for this input field */
      name: { type: String },

      /** Message Displayed */
      message: { type: String },

      /** Has error on this input field */
      errored: { type: Boolean },

      /** Hide errors on input */
      hideErrorOnInput: { type: Boolean },

      /** Set the application focus to this the input component after the initialization */
      focusOnStart: { type: Boolean },

      min: { type: Number },
      max: { type: Number },
    };
  }

  constructor() {
    super();
    this.value = "";
    this.digits = 2;
    this.leadingZeros = false;
    this.step = 1;
    this.internals = this.attachInternals();
  }

  render() {
    return html`

      <main>
            ${this.label
              ? html`<label for="textField">${this.label}</label>`
              : ""}
             <section class="for-input">
              <dile-number-picker-element
                value="${this.value}"
                digits="${this.digits}"
                ?leadingZeros="${this.leadingZeros}"
                step="${this.step}"
                @dile-number-picker-value-changed=${this.valueChanged}
                ?focusOnStart=${this.focusOnStart}
                ?errored=${this.errored}
                min=${this.min}
                max=${this.max}
              ></dile-number-picker-element>
            </section>
            ${this.messageTemplate}
          </main>
    `;
  }

  get el() {
    return this.shadowRoot.querySelector('dile-number-picker-element')
  }

  get messageTemplate() {
    return html`
      ${this.message 
        ? html`<div class="message ${this.errored ? 'errored-msg' : ''}"><span>${this.message}</span></div>`
        : ''
      }
    `
  }

  clear() {
    this.value = 0;
    this.el.clear();
  }


  valueChanged(e) {
    this.value = e.detail;
    if (this.hideErrorOnInput && this.errored) {
      this.clearError();  
    }
  }

  updated(changedProperties) {
    if(changedProperties.has('value')) {
      this.emmitChange();
      this.internals.setFormValue(this.value);
    }
  }

  focus() {
    this.el.focus();
  }

  clearError() {
      this.errored = false;
      this.message = '';
    }
}

