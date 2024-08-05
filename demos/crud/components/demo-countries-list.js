import { LitElement, html, css } from 'lit';
import { makeResourceConfig } from '../../../packages/crud/lib/makeResourceConfig';

export class CrudListDemo extends LitElement {
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
    this.config = makeResourceConfig('https://timer.escuelait.com/api/countries', {
      templates: {
        item: (country) => html`<demo-country-item @continent-event=${this.showOnConsole} .country=${country}></demo-country-item>`,
      }, 
      customization: {
        disablePagination: true,
      },
    });
  }

  render() {
    return html`

      <dile-crud-list
        .config="${this.config}"
      ></dile-crud-list>
    `;
  }

  showOnConsole(e) {
    console.log(e.detail);
  }

}
customElements.define('crud-list-demo', CrudListDemo);