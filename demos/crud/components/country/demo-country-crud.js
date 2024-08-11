import { LitElement, html, css } from 'lit';
import './demo-country-form';
import { countryConfig } from './countryConfig.js';

export class DemoCountriesCrud extends LitElement {
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
    this.config = countryConfig.getConfig();
  }

  render() {
    return html`
      <dile-crud
        .config="${this.config}"
      ></dile-crud>
    `;
  }
}
customElements.define('demo-countries-crud', DemoCountriesCrud);
