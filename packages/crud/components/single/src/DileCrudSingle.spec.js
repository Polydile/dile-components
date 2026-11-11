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



describe('DileCrudSingle layout', () => {
  afterEach(() => {
    document.body.innerHTML = '';
    delete window.axiosInstance;
  });

  const actions = [
    { name: 'DirectAction', label: 'Direct action' },
    { name: 'CardAction', label: 'Card action' },
  ];

  function createConfig(customization = {}) {
    return {
      endpoint: 'https://example.test/api/items',
      actions: {
        single: actions,
        directSingleActions: ['DirectAction'],
        list: [],
      },
      customization: {
        disableEdit: true,
        disableListActionsOnSingleComponent: true,
        ...customization,
      },
      labels: {},
      templates: {
        detail: (item) => html`<div class="item-detail">${item?.name || ''}</div>`,
        formSingleActions: () => html``,
        relations: () => html`<div class="relations">Relations</div>`,
        updateForm: () => html``,
      },
      formIds: { updateForm: 'update-form' },
      responseAdapter: {
        setResponse: () => {},
        getData: () => ({ id: 1, name: 'Test Item' }),
      },
      destructiveActionNames: [],
    };
  }

  async function createCrudSingle({ layout, customization } = {}) {
    window.axiosInstance = {
      get: vi.fn(() => Promise.resolve({ status: 200, data: { data: { id: 1, name: 'Test Item' } } })),
    };
    const el = document.createElement('dile-crud-single');
    el.relatedId = '1';
    el.config = createConfig(customization);
    el.element = { id: 1, name: 'Test Item' };
    if (layout) el.layout = layout;
    document.body.appendChild(el);
    await el.updateComplete;
    return el;
  }

  it('uses the stacked layout by default (no sidebar)', async () => {
    const el = await createCrudSingle();
    const root = el.shadowRoot;
    expect(el.computedLayout).toBe('stacked');
    expect(root.querySelector('aside.sidebar')).toBeNull();
    const main = root.querySelector('main.elcontainer');
    expect(main.querySelector('#eldetail')).not.toBeNull();
    expect(main.querySelector('.actions')).not.toBeNull();
    // The action card stays outside main, below it
    expect(main.querySelector('dile-crud-single-actions')).toBeNull();
    expect(root.querySelector('dile-crud-single-actions')).not.toBeNull();
  });

  it('renders detail on main and actions on the aside with layout="sidebar"', async () => {
    const el = await createCrudSingle({ layout: 'sidebar' });
    const root = el.shadowRoot;
    expect(el.getAttribute('layout')).toBe('sidebar');
    const main = root.querySelector('.sidebar-layout > main.elcontainer');
    const aside = root.querySelector('.sidebar-layout > aside.sidebar');
    expect(main.querySelector('#eldetail')).not.toBeNull();
    expect(main.querySelector('.actions')).toBeNull();
    expect(aside.querySelector('.actions dile-button.action-controller')).not.toBeNull();
    expect(aside.querySelector('dile-crud-single-actions')).not.toBeNull();
  });

  it('renders relations outside the sidebar grid', async () => {
    const el = await createCrudSingle({ layout: 'sidebar' });
    const relations = el.shadowRoot.querySelector('.relations');
    expect(relations).not.toBeNull();
    expect(relations.closest('.sidebar-layout')).toBeNull();
  });

  it('takes the layout from config.customization.singleLayout when the property is not set', async () => {
    const el = await createCrudSingle({ customization: { singleLayout: 'sidebar' } });
    expect(el.computedLayout).toBe('sidebar');
    expect(el.shadowRoot.querySelector('aside.sidebar')).not.toBeNull();
  });

  it('the layout property has priority over the config', async () => {
    const el = await createCrudSingle({ layout: 'stacked', customization: { singleLayout: 'sidebar' } });
    expect(el.computedLayout).toBe('stacked');
    expect(el.shadowRoot.querySelector('aside.sidebar')).toBeNull();
  });

  it('falls back to stacked with an unknown layout', async () => {
    const el = await createCrudSingle({ layout: 'unknown' });
    expect(el.computedLayout).toBe('stacked');
    expect(el.shadowRoot.querySelector('aside.sidebar')).toBeNull();
  });

  it('switches layout reactively', async () => {
    const el = await createCrudSingle();
    el.layout = 'sidebar';
    await el.updateComplete;
    expect(el.shadowRoot.querySelector('aside.sidebar dile-crud-single-actions')).not.toBeNull();
  });

  async function detailDataStyle(el) {
    const detail = el.detailElement;
    await vi.waitFor(() => {
      if (!detail.shadowRoot.querySelector('.detail-data .item-detail')) throw new Error('not loaded');
    });
    return getComputedStyle(detail.shadowRoot.querySelector('.detail-data'));
  }

  it('keeps the default detail look in the stacked layout', async () => {
    const style = await detailDataStyle(await createCrudSingle());
    expect(style.backgroundColor).toBe('rgb(245, 245, 245)');
    expect(style.borderTopStyle).toBe('none');
    expect(style.boxShadow).toBe('none');
    expect(style.borderTopLeftRadius).toBe('9.6px');
    expect(style.borderBottomLeftRadius).toBe('0px');
    expect(style.borderBottomRightRadius).toBe('0px');
  });

  it('gives the detail the action group card look in the sidebar layout', async () => {
    const style = await detailDataStyle(await createCrudSingle({ layout: 'sidebar' }));
    expect(style.backgroundColor).toBe('rgb(255, 255, 255)');
    expect(style.borderTopWidth).toBe('1px');
    expect(style.borderTopStyle).toBe('solid');
    expect(style.borderTopColor).toBe('rgba(0, 0, 0, 0.08)');
    expect(style.boxShadow).toBe('rgba(0, 0, 0, 0.08) 0px 1px 3px 0px');
    for (const corner of ['TopLeft', 'TopRight', 'BottomLeft', 'BottomRight']) {
      expect(style[`border${corner}Radius`]).toBe('8px');
    }
  });

  it('follows the --dile-crud-single-group-* variables in the sidebar layout', async () => {
    const el = await createCrudSingle({ layout: 'sidebar' });
    el.style.setProperty('--dile-crud-single-group-border', '3px dashed rgb(0, 0, 255)');
    el.style.setProperty('--dile-crud-single-group-border-radius', '12px');
    const style = await detailDataStyle(el);
    expect(style.borderTopWidth).toBe('3px');
    expect(style.borderTopStyle).toBe('dashed');
    expect(style.borderBottomRightRadius).toBe('12px');
  });

  it('lets --dile-crud-detail-data-* set from outside win in the sidebar layout', async () => {
    const el = await createCrudSingle({ layout: 'sidebar' });
    el.style.setProperty('--dile-crud-detail-data-border', 'none');
    el.style.setProperty('--dile-crud-detail-data-box-shadow', 'none');
    el.style.setProperty('--dile-crud-detail-data-background-color', 'rgb(1, 2, 3)');
    el.style.setProperty('--dile-crud-detail-data-border-bottom-left-radius', '0px');
    const style = await detailDataStyle(el);
    expect(style.borderTopStyle).toBe('none');
    expect(style.boxShadow).toBe('none');
    expect(style.backgroundColor).toBe('rgb(1, 2, 3)');
    expect(style.borderBottomLeftRadius).toBe('0px');
    // Not overridden: still the group card radius
    expect(style.borderBottomRightRadius).toBe('8px');
  });

  it('triggerAction still works in the sidebar layout', async () => {
    const el = await createCrudSingle({ layout: 'sidebar' });
    const spy = vi.spyOn(el.singleActionsElement, 'triggerAction');
    el.triggerAction('CardAction', { a: 1 });
    expect(spy).toHaveBeenCalledWith('CardAction', { a: 1 });
    spy.mockRestore();
  });
});

describe('DileCrudSingle action groups', () => {
  afterEach(() => {
    document.body.innerHTML = '';
    delete window.axiosInstance;
  });

  const actions = [
    { name: 'SendEmail', label: 'Send by email', icon: 'lucide.mail' },
    { name: 'DownloadPdf', label: 'Download PDF', icon: 'lucide.download', variant: 'outline' },
    { name: 'Cancel', label: 'Cancel invoice', destructive: true },
    { name: 'Hidden', label: 'Hidden action', shouldAppear: () => false },
    { name: 'Weird', label: 'Weird variant', variant: 'unknown' },
    { name: 'Loose', label: 'Not grouped' },
  ];

  function createConfig({ singleGroups, directSingleActions = [] } = {}) {
    return {
      endpoint: 'https://example.test/api/items',
      actions: {
        single: actions,
        directSingleActions,
        singleGroups,
        list: [],
      },
      customization: {
        disableEdit: true,
        disableListActionsOnSingleComponent: true,
      },
      labels: {},
      templates: {
        detail: (item) => html`<div class="item-detail">${item?.name || ''}</div>`,
        formSingleActions: () => html``,
        relations: () => html``,
        updateForm: () => html``,
      },
      formIds: { updateForm: 'update-form' },
      translations: { element_actions: 'Actions' },
      responseAdapter: {
        setResponse: () => {},
        getData: () => ({ id: 1, name: 'Test Item' }),
      },
      destructiveActionNames: [],
    };
  }

  const groups = [
    { title: 'Quick actions', actions: ['SendEmail', 'DownloadPdf', 'Missing'] },
    { actions: ['Cancel', 'Weird'] },
    { title: 'Only hidden', actions: ['Hidden'] },
  ];

  async function createCrudSingle({ layout, ...configOptions } = {}) {
    window.axiosInstance = {
      get: vi.fn(() => Promise.resolve({ status: 200, data: { data: { id: 1, name: 'Test Item' } } })),
    };
    const el = document.createElement('dile-crud-single');
    el.relatedId = '1';
    el.config = createConfig(configOptions);
    el.element = { id: 1, name: 'Test Item' };
    if (layout) el.layout = layout;
    document.body.appendChild(el);
    await el.updateComplete;
    await el.singleActionsElement.updateComplete;
    return el;
  }

  function boxSelectorNames(el) {
    return [...el.singleActionsElement.shadowRoot.querySelectorAll('dile-box-selector-item')]
      .map(item => item.getAttribute('name'));
  }

  it('renders nothing new without singleGroups', async () => {
    const el = await createCrudSingle();
    expect(el.shadowRoot.querySelector('.action-groups')).toBeNull();
    expect(boxSelectorNames(el)).toEqual(['SendEmail', 'DownloadPdf', 'Cancel', 'Weird', 'Loose']);
  });

  it('renders one section per visible group with titles and ordered buttons', async () => {
    const el = await createCrudSingle({ singleGroups: groups });
    const sections = el.shadowRoot.querySelectorAll('.action-groups section.action-group');
    // The group with only hidden actions is not rendered
    expect(sections.length).toBe(2);
    expect(sections[0].querySelector('.action-group-title').textContent).toBe('Quick actions');
    expect(sections[1].querySelector('.action-group-title')).toBeNull();
    const names = [...sections[0].querySelectorAll('dile-button')].map(b => b.getAttribute('name'));
    // Unknown action names are ignored
    expect(names).toEqual(['SendEmail', 'DownloadPdf']);
    expect(sections[0].querySelector('dile-button').textContent.trim()).toBe('Send by email');
  });

  it('removes grouped actions from the direct actions bar and the box selector', async () => {
    const el = await createCrudSingle({
      singleGroups: groups,
      directSingleActions: ['SendEmail', 'Loose'],
    });
    const directButtons = [...el.shadowRoot.querySelectorAll('.actions dile-button.action-controller')];
    expect(directButtons.map(b => b.textContent.trim())).toEqual(['Not grouped']);
    expect(boxSelectorNames(el)).toEqual([]);
  });

  it('keeps non grouped actions in the box selector', async () => {
    const el = await createCrudSingle({ singleGroups: [{ actions: ['SendEmail'] }] });
    expect(boxSelectorNames(el)).toEqual(['DownloadPdf', 'Cancel', 'Weird', 'Loose']);
  });

  it('hides the actions bar when all direct actions are grouped', async () => {
    const el = await createCrudSingle({
      singleGroups: [{ actions: ['SendEmail'] }],
      directSingleActions: ['SendEmail'],
    });
    expect(el.shadowRoot.querySelector('.actions')).toBeNull();
  });

  it('clicking a grouped button triggers the action', async () => {
    const el = await createCrudSingle({ singleGroups: groups });
    const spy = vi.spyOn(el.singleActionsElement, 'triggerAction').mockImplementation(() => {});
    el.shadowRoot.querySelector('dile-button[name="DownloadPdf"]').click();
    expect(spy).toHaveBeenCalledWith('DownloadPdf', undefined);
    spy.mockRestore();
  });

  it('applies variants and icons', async () => {
    const el = await createCrudSingle({ singleGroups: groups });
    const button = (name) => el.shadowRoot.querySelector(`dile-button[name="${name}"]`);
    expect(button('SendEmail').classList.contains('variant-primary')).toBe(true);
    expect(button('DownloadPdf').classList.contains('variant-outline')).toBe(true);
    expect(button('Cancel').classList.contains('variant-danger')).toBe(true);
    expect(button('Weird').classList.contains('variant-primary')).toBe(true);
    expect(button('SendEmail').icon).toBe('lucide.mail');
    expect(button('Cancel').icon).toBe('');
  });

  it('centers the grouped buttons by default', async () => {
    const el = await createCrudSingle({ layout: 'sidebar', singleGroups: groups });
    const button = el.shadowRoot.querySelector('dile-button[name="SendEmail"]');
    await button.updateComplete;
    const inner = button.shadowRoot.querySelector('button');
    expect(getComputedStyle(inner).justifyContent).toBe('center');
    expect(getComputedStyle(inner).textAlign).toBe('center');
  });

  it('aligns grouped and direct buttons with --dile-crud-single-group-action-justify-content', async () => {
    const el = await createCrudSingle({
      layout: 'sidebar',
      singleGroups: groups,
      directSingleActions: ['Loose'],
    });
    el.style.setProperty('--dile-crud-single-group-action-justify-content', 'flex-start');
    el.style.setProperty('--dile-crud-single-group-action-text-align', 'start');
    const grouped = el.shadowRoot.querySelector('dile-button[name="SendEmail"]');
    const direct = el.shadowRoot.querySelector('aside.sidebar .actions dile-button.action-controller');
    await grouped.updateComplete;
    await direct.updateComplete;
    for (const button of [grouped, direct]) {
      const inner = button.shadowRoot.querySelector('button');
      expect(getComputedStyle(inner).justifyContent).toBe('flex-start');
      expect(getComputedStyle(inner).textAlign).toBe('start');
    }
  });

  it('places the groups inside the aside in the sidebar layout', async () => {
    const el = await createCrudSingle({ layout: 'sidebar', singleGroups: groups });
    expect(el.shadowRoot.querySelector('aside.sidebar .action-groups')).not.toBeNull();
  });

  it('places the groups outside main in the stacked layout', async () => {
    const el = await createCrudSingle({ singleGroups: groups });
    const container = el.shadowRoot.querySelector('.action-groups');
    expect(container.closest('main')).toBeNull();
    expect(container.closest('aside')).toBeNull();
  });
});

describe('DileCrudSingle full width list actions', () => {
  afterEach(() => {
    document.body.innerHTML = '';
    delete window.axiosInstance;
  });

  async function createCrudSingle(layout) {
    window.axiosInstance = {
      get: vi.fn(() => Promise.resolve({ status: 200, data: { data: { id: 1, name: 'Test Item' } } })),
    };
    const el = document.createElement('dile-crud-single');
    el.relatedId = '1';
    el.config = {
      endpoint: 'https://example.test/api/items',
      actions: {
        single: [],
        directSingleActions: [],
        list: [{ name: 'DeleteAction', label: 'Delete', destructive: true }],
      },
      customization: { disableEdit: true, disableListActionsOnSingleComponent: false },
      labels: {},
      templates: {
        detail: () => html``,
        formActions: () => html``,
        formSingleActions: () => html``,
        relations: () => html``,
        updateForm: () => html``,
      },
      formIds: { updateForm: 'update-form' },
      responseAdapter: { setResponse: () => {}, getData: () => ({ id: 1 }) },
      destructiveActionNames: [],
    };
    el.element = { id: 1 };
    if (layout) el.layout = layout;
    document.body.appendChild(el);
    await el.updateComplete;
    const actions = el.shadowRoot.querySelector('dile-crud-actions');
    await actions.updateComplete;
    return { el, actions, listOptions: actions.shadowRoot.querySelector('dile-crud-list-options') };
  }

  it('stretches the list actions menu in the sidebar layout', async () => {
    const { actions, listOptions } = await createCrudSingle('sidebar');
    expect(actions.hasAttribute('full-width')).toBe(true);
    await listOptions.updateComplete;
    expect(listOptions.hasAttribute('full-width')).toBe(true);
    const button = listOptions.shadowRoot.querySelector('dile-button-icon');
    const trigger = listOptions.shadowRoot.querySelector('div[slot="trigger"]');
    expect(getComputedStyle(button).display).toBe('block');
    expect(Math.round(trigger.getBoundingClientRect().width)).toBe(Math.round(listOptions.getBoundingClientRect().width));
  });

  it('keeps the list actions button centered by default', async () => {
    const { listOptions } = await createCrudSingle('sidebar');
    await listOptions.updateComplete;
    const inner = listOptions.shadowRoot.querySelector('dile-button-icon').shadowRoot.querySelector('button');
    expect(getComputedStyle(inner).justifyContent).toBe('center');
  });

  it('aligns the list actions button with --dile-crud-single-group-action-justify-content in the sidebar layout', async () => {
    const { el, listOptions } = await createCrudSingle('sidebar');
    el.style.setProperty('--dile-crud-single-group-action-justify-content', 'flex-start');
    el.style.setProperty('--dile-crud-single-group-action-text-align', 'start');
    await listOptions.updateComplete;
    const inner = listOptions.shadowRoot.querySelector('dile-button-icon').shadowRoot.querySelector('button');
    expect(getComputedStyle(inner).justifyContent).toBe('flex-start');
    expect(getComputedStyle(inner).textAlign).toBe('start');
  });

  it('keeps the list actions menu compact in the stacked layout', async () => {
    const { actions, listOptions } = await createCrudSingle();
    expect(actions.hasAttribute('full-width')).toBe(false);
    await listOptions.updateComplete;
    expect(listOptions.hasAttribute('full-width')).toBe(false);
  });
});
