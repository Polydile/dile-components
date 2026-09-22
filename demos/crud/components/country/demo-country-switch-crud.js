import { LitElement, html, css } from 'lit';
import './demo-country-form.js';
import './demo-country-detail.js';
import './demo-country-relations.js';
import { countrySwitchConfig } from './countrySwitchConfig.js';

export class DemoCountriesSwitchCrud extends LitElement {
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
    this.config = countrySwitchConfig.getConfig();
  }

  render() {
    return html`
      <dile-crud
        title="Countries with view switch"
        .config="${this.config}"
      ></dile-crud>
    `;
  }
}

if (!customElements.get('demo-countries-switch-crud')) {
  customElements.define('demo-countries-switch-crud', DemoCountriesSwitchCrud);
}
