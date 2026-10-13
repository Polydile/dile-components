import { LitElement, html, css } from 'lit';

export class DemoCreateInvoiceAction extends LitElement {
  static styles = [css`
    :host { display: block; }
  `];

  render() {
    return html`<div></div>`;
  }
}

if (!customElements.get('demo-create-invoice-action')) {
  customElements.define('demo-create-invoice-action', DemoCreateInvoiceAction);
}
