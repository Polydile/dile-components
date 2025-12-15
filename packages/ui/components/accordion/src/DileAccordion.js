import { LitElement, html, css } from 'lit';

export class DileAccordion extends LitElement {
  static styles = [
    css`
      :host {
        display: block;
      }
    `
  ];

  render() {
    return html`
      <h2>Accordion</h2>
    `;
  }
}
