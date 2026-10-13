import { describe, it, expect, afterEach, vi } from 'vitest';
import { html, LitElement } from 'lit';
import { DileForm } from '@dile/ui/mixins/form';
import '../crud-single.js';

// Create a test form component
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

describe('DileCrudSingle.triggerAction and triggerDirectAction', () => {
  afterEach(() => {
    document.body.innerHTML = '';
    delete window.axiosInstance;
  });

  function mockAxios({ get = vi.fn(() => Promise.resolve({ status: 200, data: {} })) } = {}) {
    window.axiosInstance = { get };
    return window.axiosInstance;
  }

  const testActions = [
    {
      name: 'CreateInvoiceAction',
      label: 'Create Invoice',
      destructive: false,
    },
  ];

  function createFormTemplate() {
    return (selection, element) => html`
      ${selection === 'CreateInvoiceAction'
        ? html`<test-action-form action="CreateInvoiceAction"></test-action-form>`
        : ''
      }
    `;
  }

  const testConfig = {
    endpoint: 'https://example.test/api/items',
    actions: {
      single: testActions,
      directSingleActions: [],
      list: [],
    },
    customization: {
      disableEdit: true,
      disableListActionsOnSingleComponent: true,
    },
    labels: {
      startUpdateAction: 'Edit',
    },
    templates: {
      detail: (item) => html`<div class="item-detail">${item?.name || ''}</div>`,
      formSingleActions: createFormTemplate(),
      relations: () => html``,
      updateForm: () => html``,
    },
    formIds: {
      updateForm: 'update-form',
    },
    translations: {
      element_actions: 'Actions',
    },
    responseAdapter: {
      setResponse: () => {},
      getData: () => ({ id: 1, name: 'Test Item' }),
      getActionResponseMessage: () => 'Success',
      getActionResponseActionName: () => 'CreateInvoiceAction',
      getActionResponseActionData: () => ({}),
    },
    destructiveActionNames: [],
  };

  async function createCrudSingle() {
    mockAxios({
      get: vi.fn(() => Promise.resolve({ 
        status: 200, 
        data: { data: { id: 1, name: 'Test Item' } }
      }))
    });
    const el = document.createElement('dile-crud-single');
    el.relatedId = '1';
    el.config = testConfig;
    el.element = { id: 1, name: 'Test Item' };
    document.body.appendChild(el);
    await el.updateComplete;
    return el;
  }

  it('triggerAction delegates to singleActionsElement.triggerAction', async () => {
    const el = await createCrudSingle();
    
    const singleActionsElement = el.singleActionsElement;
    const triggerActionSpy = vi.spyOn(singleActionsElement, 'triggerAction');
    
    const initialData = { productUuid: 'uuid-123', units: 5 };
    el.triggerAction('CreateInvoiceAction', initialData);
    
    expect(triggerActionSpy).toHaveBeenCalledWith('CreateInvoiceAction', initialData);
    triggerActionSpy.mockRestore();
  });

  it('triggerDirectAction delegates to singleActionsElement.triggerAction', async () => {
    const el = await createCrudSingle();
    
    const singleActionsElement = el.singleActionsElement;
    const triggerActionSpy = vi.spyOn(singleActionsElement, 'triggerAction');
    
    const initialData = { productUuid: 'uuid-456', units: 2 };
    el.triggerDirectAction('CreateInvoiceAction', initialData);
    
    expect(triggerActionSpy).toHaveBeenCalledWith('CreateInvoiceAction', initialData);
    triggerActionSpy.mockRestore();
  });

  it('triggerDirectAction without initialData still works (backward compatibility)', async () => {
    const el = await createCrudSingle();
    
    const singleActionsElement = el.singleActionsElement;
    const triggerActionSpy = vi.spyOn(singleActionsElement, 'triggerAction');
    
    el.triggerDirectAction('CreateInvoiceAction');
    
    expect(triggerActionSpy).toHaveBeenCalledWith('CreateInvoiceAction', undefined);
    triggerActionSpy.mockRestore();
  });

  it('triggerAction without initialData works', async () => {
    const el = await createCrudSingle();
    
    const singleActionsElement = el.singleActionsElement;
    const triggerActionSpy = vi.spyOn(singleActionsElement, 'triggerAction');
    
    el.triggerAction('CreateInvoiceAction');
    
    expect(triggerActionSpy).toHaveBeenCalledWith('CreateInvoiceAction', undefined);
    triggerActionSpy.mockRestore();
  });
});


