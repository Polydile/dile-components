import { LitElement, html, css } from 'lit';

export class DemoCountryItem extends LitElement {
  static styles = [
    css`
      :host {
        display: block;
      }
    `
  ];

  static get properties() {
    return {
      country: { type: Object }
    };
  }

  render() {
    return html`
      ${this.country.name} - ${this.country.continent}
    `;
  }
}
customElements.define('demo-country-item', DemoCountryItem);
