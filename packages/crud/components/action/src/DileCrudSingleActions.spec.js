import { describe, it, expect, afterEach, vi } from 'vitest';
import { html, LitElement } from 'lit';
import { DileForm } from '@dile/ui/mixins/form';
import '../crud-single-actions.js';

// Create a test form component that extends DileForm
class TestActionForm extends DileForm(LitElement) {
  render() {
    return html`
      <input name="productUuid" />
      <input name="units" type="number" value="1" />
    `;
  }
}

if (!customElements.get('test-action-form')) {
  customElements.define('test-action-form', TestActionForm);
}

describe('DileCrudSingleActions with triggerAction', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  const testActions = [
    {
      name: 'CreateInvoiceAction',
      label: 'Create Invoice',
      destructive: false,
    },
  ];

  function createFormTemplate(selection) {
    return (selection, element) => html`
      ${selection === 'CreateInvoiceAction'
        ? html`<test-action-form action="CreateInvoiceAction"></test-action-form>`
        : ''
      }
    `;
  }

  async function createSingleActions() {
    const el = document.createElement('dile-crud-single-actions');
    el.actions = testActions;
    el.directSingleActions = [];
    el.formActionsTemplate = createFormTemplate(testActions[0].name);
    el.actionIds = [1];
    el.element = { id: 1, name: 'Test Item' };
    el.endpoint = 'https://example.test/api';
    el.language = 'en';
    document.body.appendChild(el);
    await el.updateComplete;
    return el;
  }

  async function waitForForm(el, maxWait = 2000) {
    const startTime = Date.now();
    while (Date.now() - startTime < maxWait) {
      const form = el.selectedActionForm;
      if (form) {
        await form.updateComplete;
        return form;
      }
      await new Promise(r => setTimeout(r, 50));
    }
    return null;
  }

  it('triggerAction with initialData sets form values', async () => {
    const el = await createSingleActions();
    
    const initialData = { productUuid: 'uuid-123', units: '5' };
    el.triggerAction('CreateInvoiceAction', initialData);
    
    const form = await waitForForm(el);
    expect(form).toBeTruthy();
    
    const productInput = form.shadowRoot.querySelector('[name="productUuid"]');
    const unitsInput = form.shadowRoot.querySelector('[name="units"]');
    
    expect(productInput.value).toBe('uuid-123');
    expect(unitsInput.value).toBe('5');
  });

  it('triggerAction without initialData resets form to empty', async () => {
    const el = await createSingleActions();
    
    // First open with initial data
    el.triggerAction('CreateInvoiceAction', { productUuid: 'uuid-old', units: '10' });
    let form = await waitForForm(el);
    expect(form.shadowRoot.querySelector('[name="productUuid"]').value).toBe('uuid-old');
    
    // Close the dialog
    const confirm = el.confirmElement;
    confirm.close();
    await new Promise(r => setTimeout(r, 100));
    
    // Open again without initial data - should reset
    el.triggerAction('CreateInvoiceAction');
    form = await waitForForm(el);
    
    // Form should be empty after reset
    expect(form.shadowRoot.querySelector('[name="productUuid"]').value).toBe('');
  });

  it('triggerAction opens confirm dialog', async () => {
    const el = await createSingleActions();
    
    el.triggerAction('CreateInvoiceAction');
    await waitForForm(el);
    
    const confirm = el.confirmElement;
    expect(confirm).toBeTruthy();
  });

  it('initialData is cleared after being applied', async () => {
    const el = await createSingleActions();
    
    el.triggerAction('CreateInvoiceAction', { productUuid: 'uuid-first' });
    await waitForForm(el);
    
    // _initialData should be null after being used
    expect(el._initialData).toBeNull();
  });
});

