import { LitElement, html, css } from 'lit';
import '@dile/crud/components/single/crud-single'
import { invoiceConfig } from './invoiceConfig.js';
import './demo-invoice-detail.js';
import './demo-invoice-form.js';
import './demo-create-invoice-action.js';

export class DemoTriggerAction extends LitElement {
  static styles = [
    css`
      :host {
        display: block;
      }
      .demo-section {
        margin: 2rem 0;
        padding: 1rem;
        border: 1px solid #ddd;
        border-radius: 4px;
        background-color: #fafafa;
      }
      .button-group {
        display: flex;
        gap: 1rem;
        flex-wrap: wrap;
        margin: 1rem 0;
      }
      .trigger-button {
        padding: 0.75rem 1.5rem;
        background-color: #378dca;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 1rem;
        font-weight: 500;
        transition: background-color 0.3s;
      }
      .trigger-button:hover {
        background-color: #2563a4;
      }
      .trigger-button.secondary {
        background-color: #7BB93D;
      }
      .trigger-button.secondary:hover {
        background-color: #639731;
      }
      .code-example {
        background-color: #2d2d2d;
        color: #f8f8f2;
        padding: 1rem;
        border-radius: 4px;
        overflow-x: auto;
        font-family: monospace;
        font-size: 0.9rem;
        margin: 1rem 0;
      }
      h3 {
        margin-top: 2rem;
        color: #333;
      }
      p {
        color: #555;
        line-height: 1.6;
      }
    `
  ];

  static get properties() {
    return {
      config: { type: Object },
      crudSingleRef: { type: Object },
    };
  }

  constructor() {
    super();
    this.config = invoiceConfig.getConfig();
    this.crudSingleRef = null;
  }

  render() {
    return html`
      <div class="demo-section">
        <h3>Example: Order Management System</h3>
        <p>
          This example demonstrates an order management interface where you can create invoices
          by pre-filling the form with order data using <code>triggerAction()</code> with initial data.
        </p>

        <dile-crud-single
          relatedId="order-001"
          .config="${this.config}"
          language="en"
          @crud-action-success=${this.handleActionSuccess}
        ></dile-crud-single>
      </div>

      <div class="demo-section">
        <h3>API Usage Examples</h3>
        
        <h4>Example 1: Create Invoice with Empty Form</h4>
        <div class="code-example">
// Open action without initial data (clean form)
crudSingle.triggerAction('CreateInvoiceAction');
        </div>
        <div class="button-group">
          <button class="trigger-button" @click=${this.triggerEmpty}>
            ➜ Trigger Empty Form
          </button>
        </div>

        <h4>Example 2: Create Invoice with Pre-filled Items</h4>
        <div class="code-example">
// Open action with initial data
crudSingle.triggerAction('CreateInvoiceAction', {
  items: [
    { product_name: 'Laptop', quantity: 1, price: 1200 },
    { product_name: 'Mouse', quantity: 2, price: 30 }
  ],
  notes: 'Rush delivery requested'
});
        </div>
        <div class="button-group">
          <button class="trigger-button secondary" @click=${this.triggerWithItems}>
            ➜ Create Invoice with Items
          </button>
        </div>

        <h4>Example 3: Quick Invoice from Popular Product</h4>
        <div class="code-example">
// Pre-fill with a popular/habitual product
crudSingle.triggerAction('CreateInvoiceAction', {
  items: [
    { product_name: 'Standard Service Package', quantity: 1, price: 500 }
  ],
  client_name: 'Acme Corp'
});
        </div>
        <div class="button-group">
          <button class="trigger-button secondary" @click=${this.triggerStandardService}>
            ➜ Quick Standard Service Invoice
          </button>
        </div>
      </div>

      <div class="demo-section">
        <h3>Key Features</h3>
        <ul>
          <li>✅ Open actions programmatically with <code>triggerAction(name, data)</code></li>
          <li>✅ Pre-populate form fields with initial values</li>
          <li>✅ Form automatically resets after action completes or is cancelled</li>
          <li>✅ Prevents stale data from persisting between invocations</li>
          <li>✅ Works with <code>triggerDirectAction(name, data)</code> too</li>
          <li>✅ Fully backward compatible - existing code without initialData works as before</li>
        </ul>
      </div>

      <div class="demo-section">
        <h3>Notes</h3>
        <p>
          The <code>initialData</code> parameter is completely optional. If you don't provide it,
          the action opens with an empty form, maintaining backward compatibility with existing code.
          Once the action completes (successfully or via cancellation), the form is automatically reset
          for the next opening.
        </p>
      </div>
    `;
  }

  firstUpdated() {
    this.crudSingleRef = this.shadowRoot.querySelector('dile-crud-single');
  }

  triggerEmpty() {
    if (this.crudSingleRef) {
      this.crudSingleRef.triggerAction('CreateInvoiceAction');
    }
  }

  triggerWithItems() {
    if (this.crudSingleRef) {
      this.crudSingleRef.triggerAction('CreateInvoiceAction', {
        items: [
          { product_name: 'Laptop Pro 15"', quantity: 1, price: 1499.99 },
          { product_name: 'USB-C Cable', quantity: 2, price: 25.00 },
          { product_name: 'Laptop Stand', quantity: 1, price: 89.99 }
        ],
        notes: 'Customer requested expedited shipping',
      });
    }
  }

  triggerStandardService() {
    if (this.crudSingleRef) {
      this.crudSingleRef.triggerAction('CreateInvoiceAction', {
        client_name: 'Acme Corporation',
        items: [
          { product_name: 'Standard Service Package', quantity: 1, price: 500.00 }
        ],
        notes: 'Monthly recurring service',
      });
    }
  }

  handleActionSuccess(e) {
    console.log('Action completed successfully:', e.detail);
  }
}

if (!customElements.get('demo-trigger-action')) {
  customElements.define('demo-trigger-action', DemoTriggerAction);
}
