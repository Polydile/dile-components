import { LitElement, html, css } from 'lit';

export class DemoInvoiceDetail extends LitElement {
  static styles = [css`
    :host { display: block; }
  `];

  render() {
    return html`<div></div>`;
  }
}

if (!customElements.get('demo-invoice-detail')) {
  customElements.define('demo-invoice-detail', DemoInvoiceDetail);
}
