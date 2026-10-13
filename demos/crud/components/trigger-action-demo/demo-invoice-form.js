import { LitElement, html, css } from 'lit';
import { DileForm } from '@dile/ui/mixins/form';

export class DemoInvoiceForm extends DileForm(LitElement) {
  static styles = [
    css`
      :host {
        display: block;
      }
      .form-section {
        margin-bottom: 1.5rem;
        padding: 1rem;
        background-color: #f9f9f9;
        border-radius: 4px;
      }
      .form-section h4 {
        margin: 0 0 1rem 0;
        color: #333;
        font-size: 1rem;
        border-bottom: 2px solid #378dca;
        padding-bottom: 0.5rem;
      }
      .form-group {
        margin-bottom: 1rem;
      }
      .form-group label {
        display: block;
        margin-bottom: 0.5rem;
        font-weight: 500;
        color: #333;
      }
      input[type="text"],
      input[type="number"],
      textarea {
        width: 100%;
        padding: 0.75rem;
        border: 1px solid #ddd;
        border-radius: 4px;
        font-size: 1rem;
        font-family: inherit;
        box-sizing: border-box;
      }
      input[type="text"]:focus,
      input[type="number"]:focus,
      textarea:focus {
        outline: none;
        border-color: #378dca;
        box-shadow: 0 0 0 2px rgba(55, 141, 202, 0.1);
      }
      textarea {
        min-height: 80px;
        resize: vertical;
      }
      .items-container {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
      }
      .item-group {
        display: grid;
        grid-template-columns: 2fr 1fr 1fr auto;
        gap: 0.5rem;
        padding: 0.75rem;
        background-color: white;
        border: 1px solid #e0e0e0;
        border-radius: 4px;
      }
      .item-group input {
        margin: 0;
      }
      .item-remove {
        padding: 0.5rem 1rem;
        background-color: #e74c3c;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 0.9rem;
      }
      .item-remove:hover {
        background-color: #c0392b;
      }
      .add-item-btn {
        padding: 0.75rem 1.5rem;
        background-color: #27ae60;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-weight: 500;
      }
      .add-item-btn:hover {
        background-color: #229954;
      }
      .demo-note {
        background-color: #e8f4f8;
        border-left: 4px solid #378dca;
        padding: 1rem;
        margin: 1rem 0;
        border-radius: 2px;
        color: #333;
      }
      .demo-note strong {
        color: #378dca;
      }
    `
  ];

  static get properties() {
    return {
      action: { type: String },
      itemCount: { type: Number },
    };
  }

  constructor() {
    super();
    this.action = '';
    this.itemCount = 0;
  }

  render() {
    return html`
      <div class="demo-note">
        <strong>ℹ️ Note:</strong> When you click a "Trigger" button in the demo, 
        this form will be automatically pre-filled with the data from that button. 
        After you submit or cancel, the form resets for the next use.
      </div>

      <div class="form-section">
        <h4>Client Information</h4>
        <div class="form-group">
          <label for="client_name">Client Name</label>
          <input type="text" id="client_name" name="client_name" placeholder="e.g., Acme Corporation" />
        </div>
        <div class="form-group">
          <label for="client_email">Client Email</label>
          <input type="text" id="client_email" name="client_email" placeholder="e.g., contact@acme.com" />
        </div>
      </div>

      <div class="form-section">
        <h4>Invoice Items</h4>
        <div class="items-container" id="items-container">
          <!-- Items will be dynamically added here -->
        </div>
        <button class="add-item-btn" @click=${this.addItem} type="button">
          + Add Item
        </button>
      </div>

      <div class="form-section">
        <h4>Additional Notes</h4>
        <div class="form-group">
          <label for="notes">Notes</label>
          <textarea id="notes" name="notes" placeholder="Any special instructions or notes for this invoice..."></textarea>
        </div>
      </div>
    `;
  }

  firstUpdated() {
    super.firstUpdated();
    this.addItem();
  }

  addItem() {
    const container = this.shadowRoot.getElementById('items-container');
    const itemIndex = container.children.length;
    const itemDiv = document.createElement('div');
    itemDiv.className = 'item-group';
    itemDiv.innerHTML = `
      <input type="text" name="product_name_${itemIndex}" placeholder="Product name" />
      <input type="number" name="quantity_${itemIndex}" placeholder="Qty" value="1" />
      <input type="number" name="price_${itemIndex}" placeholder="Price" step="0.01" />
      <button class="item-remove" type="button">✕ Remove</button>
    `;
    
    const removeBtn = itemDiv.querySelector('.item-remove');
    removeBtn.addEventListener('click', () => itemDiv.remove());
    
    container.appendChild(itemDiv);
    this.itemCount++;
  }

  async setData(data) {
    // Handle nested items array by flattening it to individual fields
    if (data && Array.isArray(data.items)) {
      const container = this.shadowRoot.getElementById('items-container');
      
      // Clear existing items except the first one
      while (container.children.length > 1) {
        container.children[container.children.length - 1].remove();
      }
      
      // Create new items based on the data
      for (let i = 0; i < data.items.length; i++) {
        if (i > 0) {
          this.addItem();
        }
      }
      
      // Wait for DOM updates and ensure inputs are available
      await this.updateComplete;
      await new Promise(r => setTimeout(r, 100));
      
      // Verify inputs were created
      const allInputs = this.shadowRoot.querySelectorAll('[name]');
      console.log('Demo form: Created inputs after items addition:', allInputs.length);
    }
    
    // Now set the flattened data
    const flatData = this.flattenData(data);
    console.log('Demo form: Flattened data to set:', flatData);
    await super.setData(flatData);
    
    // Verify values were set
    const allInputs = this.shadowRoot.querySelectorAll('[name]');
    console.log('Demo form: Values after setData:');
    allInputs.forEach(input => {
      console.log(`  ${input.name}: "${input.value}"`);
    });
  }

  flattenData(data) {
    const result = { ...data };
    
    if (Array.isArray(data.items)) {
      data.items.forEach((item, index) => {
        result[`product_name_${index}`] = item.product_name || '';
        result[`quantity_${index}`] = item.quantity || '1';
        result[`price_${index}`] = item.price || '';
      });
      delete result.items;
    }
    
    return result;
  }
}

if (!customElements.get('demo-invoice-form')) {
  customElements.define('demo-invoice-form', DemoInvoiceForm);
}
