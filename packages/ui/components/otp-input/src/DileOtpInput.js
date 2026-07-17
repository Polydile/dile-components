import { LitElement, html, css } from 'lit';
import { DileEmmitChange } from '../../../mixins/form/index.js';
import { messageStyles } from '../../input/index.js';
import { sanitizeOtpValue } from '../../../lib/otp/sanitizeOtpValue.js';

export class DileOtpInput extends DileEmmitChange(LitElement) {

  /**
   * Fired when user press enter key.
   *
   * @event enter-pressed
   */

  /**
   * Fired when value changes, alongside the generic `element-changed` event.
   *
   * @event dile-otp-input-changed
   */

  /**
   * Fired once, when the last empty box has just been filled and the code is complete.
   *
   * @event dile-otp-input-completed
   */

  static get properties() {
    return {
      /** Label to the element */
      label: { type: String },

      /** Number of characters (boxes) of the code */
      length: { type: Number },

      /** Set initial value to the input. This property syncs to each box value */
      value: { type: String },

      /** Name for this input field */
      name: { type: String },

      /** Disable the input field */
      disabled: { type: Boolean },

      /** ReadOnly attribute */
      readonly: { type: Boolean },

      /** Has error on this input field */
      errored: { type: Boolean },

      /** Message Displayed */
      message: { type: String },

      /** Hide errors on input */
      hideErrorOnInput: { type: Boolean },

      /** Set the application focus to this the input component after the initialization */
      focusOnStart: { type: Boolean },
    };
  }

  static get formAssociated() {
    return true;
  }

  constructor() {
    super();
    this.label = '';
    this.value = '';
    this.name = '';
    this.length = 6;
    this.disabled = false;
    this.internals = this.attachInternals();
  }

  firstUpdated() {
    if (this.focusOnStart) {
      this.focus();
    }
  }

  updated(changedProperties) {
    if (changedProperties.has('value')) {
      this.emmitChange();
      this.internals.setFormValue(this.value);
      this.dispatchEvent(new CustomEvent('dile-otp-input-changed', {
        bubbles: true,
        composed: true,
        detail: {
          name: this.name,
          value: this.value
        }
      }));

      const previousValue = changedProperties.get('value') || '';
      if (this.value.length === this.length && previousValue.length !== this.length) {
        this.dispatchEvent(new CustomEvent('dile-otp-input-completed', {
          bubbles: true,
          composed: true,
          detail: {
            name: this.name,
            value: this.value
          }
        }));
      }
    }
  }

  static get styles() {
    return [
      messageStyles,
      css`
        * {
          box-sizing: border-box;
        }
        :host {
          display: block;
          margin-bottom: 10px;
        }
        main {
          width: var(--dile-otp-input-section-width, auto);
        }
        label {
          display: block;
          margin-bottom: var(--dile-otp-input-label-margin-bottom, 4px);
          font-size: var(--dile-otp-input-label-font-size, 1em);
          color: var(--dile-otp-input-label-color, #59e);
          font-weight: var(--dile-otp-input-label-font-weight, normal);
        }
        section.for-input {
          display: flex;
          gap: var(--dile-otp-input-gap, 8px);
        }
        input {
          box-sizing: border-box;
          width: var(--dile-otp-input-box-size, 2.5em);
          height: var(--dile-otp-input-box-size, 2.5em);
          padding: 0;
          text-align: center;
          border-radius: var(--dile-otp-input-border-radius, 5px);
          border: var(--dile-otp-input-border-width, 1px) solid var(--dile-otp-input-border-color, #888);
          font-size: var(--dile-otp-input-font-size, 1.25em);
          background-color: var(--dile-otp-input-background-color, #fff);
          color: var(--dile-otp-input-color, #303030);
        }
        input:focus {
          outline: none;
          border-color: var(--dile-otp-input-focus-border-color, #6af);
        }
        input:disabled {
          background-color: #f5f5f5;
          border-color: var(--dile-otp-input-disabled-border-color, #eee);
        }
        .errored {
          border-color: var(--dile-otp-input-error-border-color, #c00);
          background-color: var(--dile-otp-input-error-background-color, var(--dile-otp-input-background-color, #fff));
        }
      `
    ];
  }

  render() {
    return html`
      <main>
        ${this.label
          ? html`<label>${this.label}</label>`
          : ''}
        <section class="for-input">
          ${this.boxesChars.map((char, index) => html`
            <input
              type="text"
              inputmode="numeric"
              pattern="[0-9]*"
              maxlength="1"
              autocomplete="${index === 0 ? 'one-time-code' : 'off'}"
              ?disabled="${this.disabled}"
              ?readonly="${this.readonly}"
              .value="${char}"
              class="${this.errored ? 'errored' : ''}"
              @input="${(e) => this._onInput(e, index)}"
              @keydown="${(e) => this._onKeydown(e, index)}"
              @keypress="${this._lookForEnter}"
              @paste="${(e) => this._onPaste(e)}"
              @focus="${this._onFocus}"
            />
          `)}
        </section>
        ${this.messageTemplate}
      </main>
    `;
  }

  get messageTemplate() {
    return html`
      ${this.message
        ? html`<div class="message ${this.errored ? 'errored-msg' : ''}"><span>${this.message}</span></div>`
        : ''
      }
    `;
  }

  /**
   * The current value split into one character per box, padded with empty strings.
   */
  get boxesChars() {
    return Array.from({ length: this.length }, (_, index) => this.value.charAt(index));
  }

  /**
   * The rendered box input elements, in order.
   */
  get boxes() {
    return Array.from(this.shadowRoot.querySelectorAll('input'));
  }

  _setChar(index, char) {
    const chars = this.boxesChars;
    chars[index] = char;
    this.value = chars.join('');
  }

  _onInput(e, index) {
    const raw = e.target.value;

    // Autofill (e.g. iOS/Android SMS autofill) can drop the whole code into a single box
    if (raw.length > 1) {
      const digits = sanitizeOtpValue(raw, this.length);
      if (digits) {
        if (this.hideErrorOnInput && this.errored) {
          this.clearError();
        }
        this.value = digits;
        this._focusBox(Math.min(digits.length, this.length - 1));
      } else {
        e.target.value = this.boxesChars[index];
      }
      return;
    }

    const digit = raw.replace(/\D/g, '');
    if (!digit && raw !== '') {
      e.target.value = this.boxesChars[index];
      return;
    }

    if (this.hideErrorOnInput && this.errored) {
      this.clearError();
    }

    this._setChar(index, digit);

    if (digit && index < this.length - 1) {
      this._focusBox(index + 1);
    }
  }

  _onKeydown(e, index) {
    if (e.key === 'Backspace' && !this.boxesChars[index] && index > 0) {
      e.preventDefault();
      this._focusBox(index - 1);
      return;
    }
    if (e.key === 'ArrowLeft' && index > 0) {
      e.preventDefault();
      this._focusBox(index - 1);
      return;
    }
    if (e.key === 'ArrowRight' && index < this.length - 1) {
      e.preventDefault();
      this._focusBox(index + 1);
      return;
    }
    if (e.key.length === 1 && !/[0-9]/.test(e.key) && !e.ctrlKey && !e.metaKey) {
      e.preventDefault();
    }
  }

  _onPaste(e) {
    e.preventDefault();
    const pasted = (e.clipboardData || window.clipboardData).getData('text');
    const digits = sanitizeOtpValue(pasted, this.length);
    if (!digits) {
      return;
    }
    if (this.hideErrorOnInput && this.errored) {
      this.clearError();
    }
    this.value = digits;
    this._focusBox(Math.min(digits.length, this.length - 1));
  }

  _onFocus(e) {
    e.target.select();
  }

  _focusBox(index) {
    const input = this.boxes[index];
    if (input) {
      input.focus();
      input.select();
    }
  }

  /**
   * Private method to dispatch events on enter key pressed
   */
  _lookForEnter(e) {
    let keycode = (e.keyCode ? e.keyCode : e.which);
    if (keycode == '13') {
      this.dispatchEvent(new CustomEvent('enter-pressed'));
    }
  }

  clearError() {
    this.errored = false;
    this.message = '';
  }

  focus() {
    const emptyIndex = this.boxesChars.findIndex((char) => !char);
    this._focusBox(emptyIndex === -1 ? this.length - 1 : emptyIndex);
  }

  clear() {
    this.value = '';
    this.focus();
  }
}
