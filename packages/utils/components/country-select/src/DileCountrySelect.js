import { html, css, LitElement } from 'lit';
import { getCountries } from './countriesData.js';
import '@dile/ui/components/select/select.js';

export class DileCountrySelect extends LitElement {
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
      label: { type: String },
      language: { type: String },
      errored: { type: Boolean },
      message: { type: String },
      quietOnStart: { type: Boolean },
      hideErrorOnInput: { type: Boolean },
      priorityCountries: { type: String, attribute: 'priority-countries' },
    };
  }

  constructor() {
    super();
    this.value = '';
    this.name = '';
    this.language = 'en';
    this.label = '';
    this.errored = false;
    this.message = '';
    this.quietOnStart = false;
    this.hideErrorOnInput = false;
    this.priorityCountries = '';
    this.selectChanged = this.selectChanged.bind(this);
  }

  updated(changedProperties) {
    if (changedProperties.has('language') || changedProperties.has('priorityCountries')) {
      this.requestUpdate();
    }
  }

  getTexts() {
    const texts = {
      es: {
        label: 'País',
        placeholder: 'Selecciona un país'
      },
      en: {
        label: 'Country',
        placeholder: 'Select a country'
      }
    };
    return texts[this.language] || texts.en;
  }

  getOrderedCountries() {
    const countries = getCountries(this.language);
    
    if (!this.priorityCountries) {
      return countries;
    }
    
    const priorityIsos = this.priorityCountries.split('|').map(iso => iso.trim().toUpperCase());
    const priorityCountriesList = [];
    const otherCountries = [];
    
    countries.forEach(country => {
      if (priorityIsos.includes(country.iso)) {
        priorityCountriesList.push(country);
      } else {
        otherCountries.push(country);
      }
    });
    
    // Mantener el orden especificado en priorityCountries
    const orderedPriority = priorityIsos
      .map(iso => priorityCountriesList.find(c => c.iso === iso))
      .filter(Boolean);
    
    return [...orderedPriority, ...otherCountries];
  }

  render() {
    const countries = this.getOrderedCountries();
    const texts = this.getTexts();
    const label = this.label || texts.label;
    const hasPriority = this.priorityCountries && this.priorityCountries.trim().length > 0;
    
    let optionsHtml;
    if (hasPriority) {
      const priorityIsos = this.priorityCountries.split('|').map(iso => iso.trim().toUpperCase());
      const priorityCountriesList = countries.filter(c => priorityIsos.includes(c.iso));
      const otherCountries = countries.filter(c => !priorityIsos.includes(c.iso));
      
      optionsHtml = html`
        ${priorityCountriesList.map(country => html`<option value="${country.iso}">${country.name}</option>`)}
        <option disabled>———————————————————</option>
        ${otherCountries.map(country => html`<option value="${country.iso}">${country.name}</option>`)}
      `;
    } else {
      optionsHtml = html`
        ${countries.map(country => html`<option value="${country.iso}">${country.name}</option>`)}
      `;
    }

    return html`
      <dile-select 
          value="${this.value || ''}"
          ?quietOnStart=${this.quietOnStart}
          name="${this.name}" 
          label="${label}" 
          ?errored=${this.errored} 
          ?hideErrorOnInput=${this.hideErrorOnInput}
          message="${this.message || ''}"
          @element-changed=${this.selectChanged}
      >
        <select slot="select">
          <option value="">${texts.placeholder}</option>
          ${optionsHtml}
        </select>
      </dile-select>
    `;
  }

  selectChanged(e) {
    this.value = e.detail.value;
    this.dispatchEvent(new CustomEvent('country-changed', {
      detail: { value: this.value },
      bubbles: true,
      composed: true
    }));
  }
}

customElements.define('dile-country-select', DileCountrySelect);
