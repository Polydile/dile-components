import { LitElement, html, css } from 'lit';
import { DileEmmitChange } from '../../../mixins/form/index.js';
import '../../number-picker/number-picker-element.js';
import { messageStyles } from '../../input/src/message-styles.js';

export class DileTimePicker extends DileEmmitChange(LitElement) {
  static styles = [
    messageStyles,
    css`
      :host {
        display: block;
        margin-bottom: 10px;
      }
      label {
        display: block;
        margin-bottom: var(--dile-input-label-margin-bottom, 4px);
        font-size: var(--dile-input-label-font-size, 1em);
        color: var(--dile-input-label-color, #59e);
        font-weight: var(--dile-input-label-font-weight, normal);
      }
      section {
        display: flex;
        gap: 0.5rem;
      }
    `
  ];

  static get formAssociated() {
    return true;
  }

  static get properties() {
    return {
      value: { type: String },
      _hours: { type: String, state: true },
      _minutes: { type: String, state: true },
      _seconds: { type: String, state: true },

      label: { type: String },
      disabled: { type: Boolean },
      message: { type: String },
      errored: { type: Boolean },
      hideErrorOnInput: { type: Boolean },
      focusOnStart: { type: Boolean },
      name: { type: String },
    };
  }

  constructor() {
    super();
    this.value = "00:00:00";
    this._setFromValue(this.value);
    this.internals = this.attachInternals();
  }

  render() {
    return html`
      <main>
        ${this.label ? html`<label>${this.label}</label>` : ''}
        <section class="for-input">
          <dile-number-picker-element
            min="0"
            max="23"
            step="1"
            digits="2"
            leadingZeros
            .value=${this._hours}
            ?disabled=${this.disabled}
            ?errored=${this.errored}
            ?focusOnStart=${this.focusOnStart}
            @dile-number-picker-value-changed=${this._changeHours}
          ></dile-number-picker-element>
          <dile-number-picker-element
            min="0"
            max="59"
            step="5"
            digits="2"
            leadingZeros
            .value=${this._minutes}
            ?disabled=${this.disabled}
            ?errored=${this.errored}
            @dile-number-picker-value-changed=${this._changeMinutes}
          ></dile-number-picker-element>
          <dile-number-picker-element
            min="0"
            max="59"
            step="5"
            digits="2"
            leadingZeros
            .value=${this._seconds}
            ?disabled=${this.disabled}
            ?errored=${this.errored}
            @dile-number-picker-value-changed=${this._changeSeconds}
          ></dile-number-picker-element>
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
    `
  }

  get hoursEl() {
    return this.shadowRoot.querySelectorAll('dile-number-picker-element')[0];
  }

  willUpdate(changedProperties) {
    if (changedProperties.has('value')) {
      this._setFromValue(this.value);
    }
  }

  updated(changedProperties) {
    if(changedProperties.has('value')) {
      this.emmitChange();
      this.internals.setFormValue(this.value);
    }
  }

  _changeHours(e) {
    this._hours = this._normalize(e.detail);
    this._updateValue();
    if (this.hideErrorOnInput && this.errored) this.clearError();
  }

  _changeMinutes(e) {
    this._minutes = this._normalize(e.detail);
    this._updateValue();
    if (this.hideErrorOnInput && this.errored) this.clearError();
  }

  _changeSeconds(e) {
    this._seconds = this._normalize(e.detail);
    this._updateValue();
    if (this.hideErrorOnInput && this.errored) this.clearError();
  }

  _normalize(value) {
    const num = parseInt(value, 10);
    return isNaN(num) ? '00' : num.toString().padStart(2, '0');
  }

  _setFromValue(value) {
    const parts = (value || '00:00:00').split(':');
    this._hours = this._normalize(parts[0]);
    this._minutes = this._normalize(parts[1]);
    this._seconds = this._normalize(parts[2]);
  }

  _updateValue() {
    const newValue = `${this._hours}:${this._minutes}:${this._seconds}`;
    if (this.value !== newValue) {
      this.value = newValue;
    }
  }

  focus() {
    this.hoursEl.focus();
  }

  clearError() {
    this.errored = false;
    this.message = '';
  }
}
