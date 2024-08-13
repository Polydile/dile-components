import { LitElement, html, css } from 'lit';
import '@dile/crud/components/single/crud-single'
import { countryConfig } from './countryConfig.js';
import './demo-country-detail.js';
import './demo-country-form.js';
import './demo-country-relations.js';
import './demo-set-europe-as-continent-action.js';
import './demo-set-asia-as-continent-action.js';

export class DemoCountrySingle extends LitElement {
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
      <dile-crud-single
        relatedId="1"
        .config="${this.config}"
      ></dile-crud-single>
    `;
  }
}
customElements.define('demo-country-single', DemoCountrySingle);
