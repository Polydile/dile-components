import { LitElement, html, css } from 'lit';
import '@dile/ui/components/input/input.js';
import '@dile/ui/components/select/select.js';
import { DileForm } from '@dile/ui/mixins/form';

const formStyles = css`
  :host {
    display: block;
  }
`;

export class DemoStepCustomerForm extends DileForm(LitElement) {
  static styles = [formStyles];

  render() {
    return html`
      <dile-input label="Customer name" name="customer_name" id="customer_name" hideErrorOnInput></dile-input>
      <dile-input label="Email" name="customer_email" id="customer_email" hideErrorOnInput></dile-input>
    `;
  }
}
if (!customElements.get('demo-step-customer-form')) {
  customElements.define('demo-step-customer-form', DemoStepCustomerForm);
}

export class DemoStepShippingForm extends DileForm(LitElement) {
  static styles = [formStyles];

  render() {
    return html`
      <dile-input label="Address" name="address" id="address" hideErrorOnInput></dile-input>
      <dile-select name="shipping_method" id="shipping_method" label="Shipping method" hideErrorOnInput>
        <select slot="select">
          <option value="">Select...</option>
          <option value="standard">Standard</option>
          <option value="express">Express</option>
        </select>
      </dile-select>
    `;
  }
}
if (!customElements.get('demo-step-shipping-form')) {
  customElements.define('demo-step-shipping-form', DemoStepShippingForm);
}

export class DemoStepSummaryForm extends DileForm(LitElement) {
  static styles = [
    formStyles,
    css`
      dl {
        display: grid;
        grid-template-columns: max-content 1fr;
        gap: 0.25rem 1rem;
      }
      dt {
        font-weight: bold;
      }
    `,
  ];

  static properties = {
    order: { type: Object },
  };

  constructor() {
    super();
    this.order = {};
  }

  // The summary step has no fields: it only displays the data saved in the previous steps.
  getData() {
    return { notes: this.shadowRoot.getElementById('notes')?.value ?? '' };
  }

  setData(data) {
    this.order = { ...data };
    super.setData(data);
  }

  render() {
    return html`
      <dl>
        <dt>Customer</dt><dd>${this.order.customer_name || '-'}</dd>
        <dt>Email</dt><dd>${this.order.customer_email || '-'}</dd>
        <dt>Address</dt><dd>${this.order.address || '-'}</dd>
        <dt>Shipping</dt><dd>${this.order.shipping_method || '-'}</dd>
      </dl>
      <dile-input label="Notes" name="notes" id="notes"></dile-input>
    `;
  }
}
if (!customElements.get('demo-step-summary-form')) {
  customElements.define('demo-step-summary-form', DemoStepSummaryForm);
}
