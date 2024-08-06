import { LitElement, html, css } from 'lit';
import { countryConfig } from './countryConfig.js';
import './demo-country-form.js'
import './demo-country-item.js'

export class DemoCountryList extends LitElement {
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
    console.log(this.config);
  }

  render() {
    return html`
      <dile-crud-list
        @continent-event=${this.showOnConsole}
        @crud-item-edit=${this.showOnConsole}
        @crud-item-delete=${this.showOnConsole}
        .config="${this.config}"
      ></dile-crud-list>
    `;
  }

  showOnConsole(e) {
    console.log(e.detail);
  }

}
customElements.define('demo-country-list', DemoCountryList);