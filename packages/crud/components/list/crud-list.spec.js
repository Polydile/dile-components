import { describe, it, expect, afterEach } from 'vitest';
import { html } from 'lit';
import { CrudConfigBuilder } from '../../lib/CrudConfigBuilder.js';
import './crud-list.js';
import './crud-data-grid.js';
import '@dile/ui/components/data-grid/data-grid.js';

describe('dile-crud-list grid template integration', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  const sampleElements = [
    { id: 1, name: 'Customer A', email: 'a@example.com' },
    { id: 2, name: 'Customer B', email: 'b@example.com' },
  ];

  it('renders default dile-crud-list-item when templates.grid is not provided', async () => {
    const config = new CrudConfigBuilder('https://example.test/api/customers', {
      templates: {
        item: (item) => html`<span class="item-name">${item.name}</span>`,
      },
    }).getConfig();

    const el = document.createElement('dile-crud-list');
    el.disableLoadOnStart = true;
    el.config = config;
    el.elements = sampleElements;
    el.loading = false;
    document.body.appendChild(el);
    await el.updateComplete;

    const listItems = el.shadowRoot.querySelectorAll('dile-crud-list-item');
    expect(listItems.length).toBe(2);

    const gridContainer = el.shadowRoot.querySelector('.grid-container');
    expect(gridContainer).toBeNull();
  });

  it('renders generic dile-crud-data-grid when config.grid.columns is defined', async () => {
    const config = new CrudConfigBuilder('https://example.test/api/customers', {
      grid: {
        columns: [
          { field: 'id', header: 'ID' },
          { field: 'name', header: 'Customer Name' },
        ],
        striped: true,
      },
    }).getConfig();

    const el = document.createElement('dile-crud-list');
    el.disableLoadOnStart = true;
    el.config = config;
    el.elements = sampleElements;
    el.sort = { sortField: 'name', sortDirection: 'desc' };
    el.loading = false;
    document.body.appendChild(el);
    await el.updateComplete;

    const listItems = el.shadowRoot.querySelectorAll('dile-crud-list-item');
    expect(listItems.length).toBe(0);

    const crudDataGrid = el.shadowRoot.querySelector('dile-crud-data-grid');
    expect(crudDataGrid).toBeTruthy();
    expect(crudDataGrid.items).toEqual(sampleElements);
    expect(crudDataGrid.columns.length).toBe(3); // id, name + automatically injected Actions
    expect(crudDataGrid.columns[2].header).toBe('Actions');
    expect(crudDataGrid.sort).toEqual({ sortField: 'name', sortDirection: 'desc' });
  });

  it('hides actions in traditional list items when disableListActions is true', async () => {
    const config = new CrudConfigBuilder('https://example.test/api/customers', {
      customization: {
        disableListActions: true,
      },
      templates: {
        item: (item) => html`<span class="item-name">${item.name}</span>`,
      },
    }).getConfig();

    const el = document.createElement('dile-crud-list');
    el.disableLoadOnStart = true;
    el.config = config;
    el.elements = sampleElements;
    el.loading = false;
    document.body.appendChild(el);
    await el.updateComplete;

    const listItems = el.shadowRoot.querySelectorAll('dile-crud-list-item');
    expect(listItems.length).toBe(2);

    for (const item of listItems) {
      const actionsDiv = item.shadowRoot.querySelector('.actions');
      expect(actionsDiv).toBeNull();
    }
  });

  it('renders custom grid template when templates.grid is configured', async () => {
    let receivedElements = null;
    let receivedActionIds = null;
    let receivedSort = null;

    const config = new CrudConfigBuilder('https://example.test/api/customers', {
      templates: {
        grid: (elements, actionIds, config, sort) => {
          receivedElements = elements;
          receivedActionIds = actionIds;
          receivedSort = sort;
          return html`
            <dile-data-grid
              .items="${elements}"
              .selectedIds="${actionIds}"
              selectable
              .columns="${[
                { field: 'id', header: 'ID' },
                { field: 'name', header: 'Name' },
              ]}"
            ></dile-data-grid>
          `;
        },
      },
    }).getConfig();

    const el = document.createElement('dile-crud-list');
    el.disableLoadOnStart = true;
    el.config = config;
    el.elements = sampleElements;
    el.actionIds = [2];
    el.sort = { sortField: 'name', sortDirection: 'asc' };
    el.loading = false;
    document.body.appendChild(el);
    await el.updateComplete;

    const listItems = el.shadowRoot.querySelectorAll('dile-crud-list-item');
    expect(listItems.length).toBe(0);

    const gridContainer = el.shadowRoot.querySelector('.grid-container');
    expect(gridContainer).toBeTruthy();

    const dataGrid = el.shadowRoot.querySelector('dile-data-grid');
    expect(dataGrid).toBeTruthy();
    expect(receivedElements).toEqual(sampleElements);
    expect(receivedActionIds).toEqual([2]);
    expect(receivedSort).toEqual({ sortField: 'name', sortDirection: 'asc' });
  });

  it('updates sort when dile-data-grid-sort is dispatched', async () => {
    const config = new CrudConfigBuilder('https://example.test/api/customers', {
      templates: {
        grid: (elements, actionIds) => html`
          <dile-data-grid
            .items="${elements}"
            sort-mode="external"
            .columns="${[
              { field: 'name', header: 'Name', sortable: true },
            ]}"
          ></dile-data-grid>
        `,
      },
    }).getConfig();

    const el = document.createElement('dile-crud-list');
    el.disableLoadOnStart = true;
    el.config = config;
    el.elements = sampleElements;
    el.loading = false;
    document.body.appendChild(el);
    await el.updateComplete;

    let sortApplied = null;
    el.setSort = (sortObj) => {
      sortApplied = sortObj;
    };

    const gridContainer = el.shadowRoot.querySelector('.grid-container');
    gridContainer.dispatchEvent(
      new CustomEvent('dile-data-grid-sort', {
        bubbles: true,
        composed: true,
        detail: {
          field: 'name',
          direction: 'asc',
        },
      })
    );

    expect(sortApplied).toEqual({
      sortField: 'name',
      sortDirection: 'asc',
    });
  });

  it('updates sort when dile-data-grid-sort is dispatched from the config.grid.columns branch', async () => {
    const config = new CrudConfigBuilder('https://example.test/api/customers', {
      grid: {
        columns: [
          { field: 'name', header: 'Name', sortable: true },
        ],
      },
    }).getConfig();

    const el = document.createElement('dile-crud-list');
    el.disableLoadOnStart = true;
    el.config = config;
    el.elements = sampleElements;
    el.loading = false;
    document.body.appendChild(el);
    await el.updateComplete;

    let sortApplied = null;
    el.setSort = (sortObj) => {
      sortApplied = sortObj;
    };

    const gridContainer = el.shadowRoot.querySelector('.grid-container');
    gridContainer.dispatchEvent(
      new CustomEvent('dile-data-grid-sort', {
        bubbles: true,
        composed: true,
        detail: {
          field: 'name',
          direction: 'desc',
        },
      })
    );

    expect(sortApplied).toEqual({
      sortField: 'name',
      sortDirection: 'desc',
    });
  });

  it('prefers templates.grid over config.grid.columns when both are configured', async () => {
    const config = new CrudConfigBuilder('https://example.test/api/customers', {
      grid: {
        columns: [
          { field: 'id', header: 'ID' },
        ],
      },
      templates: {
        grid: (elements, actionIds) => html`
          <dile-data-grid
            .items="${elements}"
            .columns="${[{ field: 'name', header: 'Name' }]}"
          ></dile-data-grid>
        `,
      },
    }).getConfig();

    const el = document.createElement('dile-crud-list');
    el.disableLoadOnStart = true;
    el.config = config;
    el.elements = sampleElements;
    el.loading = false;
    document.body.appendChild(el);
    await el.updateComplete;

    expect(el.shadowRoot.querySelector('dile-crud-data-grid')).toBeNull();
    expect(el.shadowRoot.querySelector('dile-data-grid')).toBeTruthy();
  });

  it('dispatches crud-list-sort-changed with the new sort whenever setSort is called', async () => {
    const config = new CrudConfigBuilder('https://example.test/api/customers', {
      grid: { columns: [{ field: 'name', header: 'Name', sortable: true }] },
    }).getConfig();

    const el = document.createElement('dile-crud-list');
    el.disableLoadOnStart = true;
    el.config = config;
    el.elements = sampleElements;
    el.loading = false;
    document.body.appendChild(el);
    await el.updateComplete;

    let receivedDetail = null;
    el.addEventListener('crud-list-sort-changed', (e) => {
      receivedDetail = e.detail;
    });

    el.setSort({ sortField: 'name', sortDirection: 'desc' });

    expect(receivedDetail).toEqual({ sortField: 'name', sortDirection: 'desc' });
  });

  it('keeps reporting the correct sort state to a freshly remounted grid after a loading round-trip', async () => {
    // Reproduces the real scenario: setSort() sets loading=true, which unmounts
    // elementsTemplate (and therefore <dile-crud-data-grid>/<dile-data-grid>) while
    // the request is in flight, then getSuccess() remounts it from scratch.
    const config = new CrudConfigBuilder('https://example.test/api/customers', {
      grid: { columns: [{ field: 'name', header: 'Name', sortable: true }] },
    }).getConfig();

    const el = document.createElement('dile-crud-list');
    el.disableLoadOnStart = true;
    el.config = config;
    el.elements = sampleElements;
    el.loading = false;
    document.body.appendChild(el);
    await el.updateComplete;

    el.elservice.setSort = () => {}; // avoid a real network round-trip
    el.setSort({ sortField: 'name', sortDirection: 'asc' });
    await el.updateComplete;

    expect(el.shadowRoot.querySelector('.grid-container')).toBeNull(); // unmounted while loading

    el.getSuccess({ detail: { elements: sampleElements, numItems: 2, paginationData: {} } });
    await el.updateComplete;

    const freshDataGrid = el.shadowRoot.querySelector('dile-crud-data-grid');
    expect(freshDataGrid).toBeTruthy();
    expect(freshDataGrid.sort).toEqual({ sortField: 'name', sortDirection: 'asc' });

    const innerGrid = freshDataGrid.shadowRoot.querySelector('dile-data-grid');
    await innerGrid.updateComplete;
    expect(innerGrid.sortField).toBe('name');
    expect(innerGrid.sortDirection).toBe('asc');
  });

  it('shows the item template by default when both templates.item and grid.columns are configured', async () => {
    const config = new CrudConfigBuilder('https://example.test/api/customers', {
      grid: { columns: [{ field: 'name', header: 'Name' }] },
      templates: { item: (item) => html`<span class="item-name">${item.name}</span>` },
    }).getConfig();

    const el = document.createElement('dile-crud-list');
    el.disableLoadOnStart = true;
    el.config = config;
    el.elements = sampleElements;
    el.loading = false;
    document.body.appendChild(el);
    await el.updateComplete;

    expect(el.shadowRoot.querySelectorAll('dile-crud-list-item').length).toBe(2);
    expect(el.shadowRoot.querySelector('.grid-container')).toBeNull();
  });

  it('shows the grid when viewMode is "grid" and both templates.item and grid.columns are configured', async () => {
    const config = new CrudConfigBuilder('https://example.test/api/customers', {
      grid: { columns: [{ field: 'name', header: 'Name' }] },
      templates: { item: (item) => html`<span class="item-name">${item.name}</span>` },
    }).getConfig();

    const el = document.createElement('dile-crud-list');
    el.disableLoadOnStart = true;
    el.config = config;
    el.elements = sampleElements;
    el.loading = false;
    el.viewMode = 'grid';
    document.body.appendChild(el);
    await el.updateComplete;

    expect(el.shadowRoot.querySelectorAll('dile-crud-list-item').length).toBe(0);
    expect(el.shadowRoot.querySelector('.grid-container')).toBeTruthy();
    expect(el.shadowRoot.querySelector('dile-crud-data-grid')).toBeTruthy();
  });

  it('still shows the grid when only grid.columns is configured, regardless of viewMode', async () => {
    const config = new CrudConfigBuilder('https://example.test/api/customers', {
      grid: { columns: [{ field: 'name', header: 'Name' }] },
    }).getConfig();

    const el = document.createElement('dile-crud-list');
    el.disableLoadOnStart = true;
    el.config = config;
    el.elements = sampleElements;
    el.loading = false;
    document.body.appendChild(el);
    await el.updateComplete;

    expect(el.shadowRoot.querySelector('dile-crud-data-grid')).toBeTruthy();
  });
});

describe('dile-crud-list scope changes and page reset', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  async function createList({ belongsTo, relationId } = {}) {
    const config = new CrudConfigBuilder('https://example.test/api/invoices', {
      templates: { item: (item) => html`<span>${item.name}</span>` },
    }).getConfig();

    const el = document.createElement('dile-crud-list');
    el.disableLoadOnStart = true;
    el.config = config;
    if (belongsTo !== undefined) el.belongsTo = belongsTo;
    if (relationId !== undefined) el.relationId = relationId;
    document.body.appendChild(el);
    await el.updateComplete;
    await el.elservice.updateComplete;

    // Intercept the outgoing requests instead of hitting the network.
    const requests = [];
    const ajax = el.elservice.ajaxget;
    ajax.generateRequest = () => requests.push({ url: ajax.url, data: ajax.data });
    el.elservice.delayTime = 10;
    return { el, requests, ajax };
  }

  it('does not fire an extra request on the initial render when scope is set from the start', async () => {
    const { requests } = await createList({ belongsTo: 'customer', relationId: '10' });
    await wait(50);
    expect(requests).toHaveLength(0);
  });

  it('reloads from the first page with the new scope when belongsTo and relationId change', async () => {
    const { el, requests, ajax } = await createList({ belongsTo: 'customer', relationId: '10' });
    ajax.url = 'https://example.test/api/invoices?page=3';

    let refreshEvents = 0;
    el.addEventListener('crud-list-refresh', () => refreshEvents++);

    el.belongsTo = 'supplier';
    el.relationId = '20';
    await el.updateComplete;
    expect(el.loading).toBe(true);

    await wait(50);
    expect(refreshEvents).toBe(1);
    expect(requests).toHaveLength(1);
    expect(requests[0].url).toBe('https://example.test/api/invoices');
    expect(requests[0].data.belongsTo).toBe('supplier');
    expect(requests[0].data.relationId).toBe('20');
  });

  it('reloads when only relationId changes', async () => {
    const { el, requests } = await createList({ belongsTo: 'customer', relationId: '10' });

    el.relationId = '11';
    await el.updateComplete;
    await wait(50);

    expect(requests).toHaveLength(1);
    expect(requests[0].data.relationId).toBe('11');
  });

  it('keeps the current page on refresh() and goes back to page 1 on refresh({ resetPage: true })', async () => {
    const { el, requests, ajax } = await createList();
    const pagedUrl = 'https://example.test/api/invoices?page=3';

    ajax.url = pagedUrl;
    el.refresh();
    await wait(50);
    expect(requests.at(-1).url).toBe(pagedUrl);

    el.refresh({ resetPage: true });
    await wait(50);
    expect(requests.at(-1).url).toBe('https://example.test/api/invoices');
    expect(requests).toHaveLength(2);
  });
});
