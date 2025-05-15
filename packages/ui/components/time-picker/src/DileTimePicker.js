import { LitElement, html, css } from 'lit';
import '../../number-picker/number-picker-element.js';

export class DileTimePicker extends LitElement {
  static styles = [
    css`
      :host {
        display: block;
      }
      section {
        display: flex;
        gap: 0.5rem;
      }
    `
  ];

  static get properties() {
    return {
      value: { type: String },
      _hours: { type: String, state: true },
      _minutes: { type: String, state: true },
      _seconds: { type: String, state: true },
    };
  }

  constructor() {
    super();
    this.value = "00:00:00";
    this._setFromValue(this.value);
  }

  render() {
    return html`
      <section>
        <dile-number-picker-element
          min="0"
          max="23"
          step="1"
          digits="2"
          leadingZeros
          .value=${this._hours}
          @dile-number-picker-value-changed=${this._changeHours}
        ></dile-number-picker-element>
        <dile-number-picker-element
          min="0"
          max="59"
          step="5"
          digits="2"
          leadingZeros
          .value=${this._minutes}
          @dile-number-picker-value-changed=${this._changeMinutes}
        ></dile-number-picker-element>
        <dile-number-picker-element
          min="0"
          max="59"
          step="5"
          digits="2"
          leadingZeros
          .value=${this._seconds}
          @dile-number-picker-value-changed=${this._changeSeconds}
        ></dile-number-picker-element>
      </section>
    `;
  }

  willUpdate(changedProperties) {
    console.log('willudate', changedProperties);
    if (changedProperties.has('value')) {
      this._setFromValue(this.value);
    }
  }

  _changeHours(e) {
    this._hours = this._normalize(e.detail);
    this._updateValue();
  }

  _changeMinutes(e) {
    this._minutes = this._normalize(e.detail);
    this._updateValue();
  }

  _changeSeconds(e) {
    this._seconds = this._normalize(e.detail);
    this._updateValue();
  }

  _normalize(value) {
    const num = parseInt(value, 10);
    return isNaN(num) ? '00' : num.toString().padStart(2, '0');
  }

  _setFromValue(value) {
    console.log('setformvalue', value);
    const parts = (value || '00:00:00').split(':');
    this._hours = this._normalize(parts[0]);
    this._minutes = this._normalize(parts[1]);
    this._seconds = this._normalize(parts[2]);
  }

  _updateValue() {
    const newValue = `${this._hours}:${this._minutes}:${this._seconds}`;
    if (this.value !== newValue) {
      this.value = newValue;
      this.dispatchEvent(new CustomEvent('value-changed', {
        detail: this.value,
        bubbles: true,
        composed: true,
      }));
    }
  }
}
