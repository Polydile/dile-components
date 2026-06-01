import { LitElement, html, css } from 'lit';
import { COUNTRIES } from './countriesData.js';

export class FctCountrySelect extends LitElement {
  static styles = [
    css`
      :host {
        display: block;
      }
    `
  ];

  static get properties() {
    return {
      value: { type: String },
      name: { type: String },
      errored: { type: Boolean },
      message: { type: String },
    };
  }

  constructor() {
    super();
    this.countries = COUNTRIES;
  }

  render() {
    return html`
      <dile-select 
          value="${this.value}"
          quietOnStart 
          name="country" 
          label="País" 
          ?errored=${this.errored} 
          hideErrorOnInput 
          message="${this.message}"
          @element-changed=${this.selectChanged}
      >
        <select slot="select">
          <option value="">Selecciona un país</option>
          ${this.countries.map(country => html`<option value="${country.iso}">${country.name} (${country.iso})</option>`)}
        </select>
      </dile-select>
    `;
  }

  selectChanged(e) {
    this.value = e.detail.value;
  }
}
customElements.define('fct-country-select', FctCountrySelect);
