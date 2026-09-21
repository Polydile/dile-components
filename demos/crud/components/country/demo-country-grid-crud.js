import { LitElement, html, css } from 'lit';
import './demo-country-form.js';
import './demo-country-detail.js';
import './demo-country-relations.js';
import './demo-set-europe-as-continent-action.js';
import './demo-set-asia-as-continent-action.js';
import { countryGridConfig } from './countryGridConfig.js';

export class DemoCountriesGridCrud extends LitElement {
  static styles = [
    css`
      :host {
        display: block;
      }
    `
  ];

  static get properties() {
    return {
      config: { type: Object },
    };
  }

  constructor() {
    super();
    this.config = countryGridConfig.getConfig();
  }

  render() {
    return html`
      <dile-crud
        title="Countries with DataGrid"
        .config="${this.config}"
      ></dile-crud>
    `;
  }
}

if (!customElements.get('demo-countries-grid-crud')) {
  customElements.define('demo-countries-grid-crud', DemoCountriesGridCrud);
}
