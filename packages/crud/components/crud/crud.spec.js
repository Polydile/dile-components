import { describe, it, expect, afterEach, beforeEach, vi } from 'vitest';
import { html } from 'lit';
import { CrudConfigBuilder } from '../../lib/CrudConfigBuilder.js';
import './crud.js';

describe('dile-crud initial filters', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('syncs active filters from config into the list and form on first render', async () => {
    const config = new CrudConfigBuilder('https://example.test/api/countries', {
      customization: {
        disableInsert: true,
        disableHelp: true,
        disableKeywordSearch: true,
        disableSort: true,
        disableFilter: false,
        disablePagination: true,
        hideCheckboxSelection: true,
      },
      availableFilters: [
        {
          name: 'continent',
          label: 'Continent',
          active: true,
          value: 'Europe',
          type: 'select',
          options: [
            { value: 'Europe', label: 'Europe' },
            { value: 'Asia', label: 'Asia' },
          ],
        },
      ],
    }).getConfig();

    const el = document.createElement('dile-crud');
    el.config = config;
    document.body.appendChild(el);
    await el.updateComplete;
    await Promise.resolve();

    expect(el.config.availableFilters[0].active).toBe(true);
    expect(el.config.availableFilters[0].value).toBe('Europe');
    expect(el.listElement.filters).toHaveLength(1);
    expect(el.listElement.filters[0].name).toBe('continent');
    expect(el.listElement.filters[0].value).toBe('Europe');

    const form = el.shadowRoot.querySelector('dile-crud-filters');
    expect(form.filters[0].active).toBe(true);
    expect(form.filters[0].value).toBe('Europe');
  });

  it('removes an active initial filter when the chip close icon is clicked', async () => {
    const config = new CrudConfigBuilder('https://example.test/api/countries', {
      customization: {
        disableInsert: true,
        disableHelp: true,
        disableKeywordSearch: true,
        disableSort: true,
        disableFilter: false,
        disablePagination: true,
        hideCheckboxSelection: true,
      },
      availableFilters: [
        {
          name: 'continent',
          label: 'Continent',
          active: true,
          value: 'Europe',
          type: 'select',
          options: [
            { value: 'Europe', label: 'Europe' },
            { value: 'Asia', label: 'Asia' },
          ],
        },
      ],
    }).getConfig();

    const el = document.createElement('dile-crud');
    el.config = config;
    document.body.appendChild(el);
    await el.updateComplete;
    await Promise.resolve();

    const filterEl = el.shadowRoot.querySelector('dile-crud-filters');
    filterEl.removeFilter('continent');

    expect(filterEl.filters[0].active).toBe(false);
    expect(filterEl.filters[0].value).toBe('');
    expect(el.listElement.filters[0].active).toBe(false);
    expect(el.listElement.filters[0].value).toBe('');
  });

  it('keeps an inactive select filter inactive when config uses the false sentinel', async () => {
    const config = new CrudConfigBuilder('https://example.test/api/countries', {
      customization: {
        disableInsert: true,
        disableHelp: true,
        disableKeywordSearch: true,
        disableSort: true,
        disableFilter: false,
        disablePagination: true,
        hideCheckboxSelection: true,
      },
      availableFilters: [
        {
          name: 'continent',
          label: 'Continent',
          active: false,
          value: false,
          type: 'select',
          options: [
            { value: 'Europe', label: 'Europe' },
            { value: 'Asia', label: 'Asia' },
          ],
        },
      ],
    }).getConfig();

    const el = document.createElement('dile-crud');
    el.config = config;
    document.body.appendChild(el);
    await el.updateComplete;
    await Promise.resolve();

    expect(el.listElement.filters).toHaveLength(0);

    const filtersForm = el.shadowRoot
      .querySelector('dile-crud-filters')
      .shadowRoot.querySelector('dile-crud-filters-form');
    const select = filtersForm.shadowRoot.querySelector('dile-select');
    expect(select.value).toBe('');
  });
});

describe('dile-crud sort synchronization', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('syncs dile-crud-sort-form when the list sort changes (e.g. from a DataGrid column header)', async () => {
    const config = new CrudConfigBuilder('https://example.test/api/customers', {
      customization: {
        disableInsert: true,
        disableHelp: true,
        disableKeywordSearch: true,
        disableSort: false,
        disableFilter: true,
        disablePagination: true,
        hideCheckboxSelection: true,
      },
      sort: {
        options: [
          { name: 'name', label: 'Name', direction: 'asc' },
        ],
        initialSortField: null,
      },
    }).getConfig();

    const el = document.createElement('dile-crud');
    el.config = config;
    document.body.appendChild(el);
    await el.updateComplete;
    await Promise.resolve();

    expect(el.sortFormElement).toBeTruthy();

    el.listElement.setSort({ sortField: 'name', sortDirection: 'desc' });
    await el.updateComplete;

    expect(el.sortFormElement.sortField).toBe('name');
    expect(el.sortFormElement.sortDirection).toBe('desc');
  });

  it('ignores a grid sort field that is not listed in config.sort.options instead of crashing the sort-form', async () => {
    // Reproduces a DataGrid column marked `sortable: true` for a field (e.g. "continent")
    // that has no corresponding entry in config.sort.options.
    const config = new CrudConfigBuilder('https://example.test/api/countries', {
      customization: {
        disableInsert: true,
        disableHelp: true,
        disableKeywordSearch: true,
        disableSort: false,
        disableFilter: true,
        disablePagination: true,
        hideCheckboxSelection: true,
      },
      grid: {
        columns: [
          { field: 'name', header: 'Name', sortable: true },
          { field: 'continent', header: 'Continent', sortable: true },
        ],
      },
      sort: {
        options: [
          { name: 'name', label: 'Name', direction: 'asc' },
        ],
        initialSortField: 'name',
      },
    }).getConfig();

    const el = document.createElement('dile-crud');
    el.config = config;
    document.body.appendChild(el);
    await el.updateComplete;
    await Promise.resolve();

    const initialSortField = el.sortFormElement.sortField;

    expect(() => {
      el.listElement.dispatchEvent(new CustomEvent('crud-list-sort-changed', {
        bubbles: true,
        composed: true,
        detail: { sortField: 'continent', sortDirection: 'asc' },
      }));
    }).not.toThrow();
    await el.updateComplete;

    // The sort-form's selection is left untouched rather than pointed at an unknown option.
    expect(el.sortFormElement.sortField).toBe(initialSortField);
  });

  it('does not let the sort-form echo override a grid-driven sort with the field static configured default direction', async () => {
    // "year" is configured with a static default direction of "desc". A DataGrid column
    // header click always starts at "asc" on first click — reproduces the exact scenario
    // where the sort silently snapped back to "desc" and repeated clicks appeared to
    // "lose" the requested order.
    const config = new CrudConfigBuilder('https://example.test/api/board-games', {
      customization: {
        disableInsert: true,
        disableHelp: true,
        disableKeywordSearch: true,
        disableSort: false,
        disableFilter: true,
        disablePagination: true,
        hideCheckboxSelection: true,
      },
      grid: {
        columns: [
          { field: 'year', header: 'Year', sortable: true },
        ],
      },
      sort: {
        options: [
          { name: 'year', label: 'Year', direction: 'desc' },
        ],
        initialSortField: 'year',
      },
    }).getConfig();

    const el = document.createElement('dile-crud');
    el.config = config;
    document.body.appendChild(el);
    await el.updateComplete;
    await Promise.resolve();

    let lastSetSort = null;
    el.listElement.setSort = (sortObj) => {
      lastSetSort = sortObj;
    };

    // Simulate what DileCrudList.setSort() dispatches after a grid header click requesting "asc".
    el.listElement.dispatchEvent(new CustomEvent('crud-list-sort-changed', {
      bubbles: true,
      composed: true,
      detail: { sortField: 'year', sortDirection: 'asc' },
    }));
    await el.updateComplete;
    await new Promise((resolve) => setTimeout(resolve, 0)); // flush any echo microtasks

    expect(el.sortFormElement.sortField).toBe('year');
    expect(el.sortFormElement.sortDirection).toBe('asc');
    // The echo must not have triggered a second, corrupting setSort() call.
    expect(lastSetSort).toBeNull();
  });
});

describe('dile-crud initial sort', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  async function mountCrud(sort) {
    const config = new CrudConfigBuilder('https://example.test/api/countries', {
      customization: {
        disableInsert: true,
        disableHelp: true,
        disableKeywordSearch: true,
        disableSort: false,
        disableFilter: true,
        disablePagination: true,
        hideCheckboxSelection: true,
      },
      sort,
    }).getConfig();

    const el = document.createElement('dile-crud');
    el.config = config;
    document.body.appendChild(el);
    await el.updateComplete;
    const list = el.listElement;
    await list.updateComplete;
    await list.elservice.updateComplete;
    const requests = [];
    const ajax = list.elservice.ajaxget;
    ajax.generateRequest = () => requests.push({ url: ajax.url, data: ajax.data });
    return { el, requests };
  }

  const options = [
    { name: 'name', label: 'Name', direction: 'asc' },
    { name: 'population', label: 'Population', direction: 'desc' },
  ];

  it('sends the configured initial sort in the first (and only) request, matching the sort-form', async () => {
    const { el, requests } = await mountCrud({ options, initialSortField: 'population', initialSortDirection: 'asc' });
    await wait(300);

    expect(requests).toHaveLength(1);
    expect(requests[0].data.sortField).toBe('population');
    expect(requests[0].data.sortDirection).toBe('asc');
    expect(el.sortFormElement.sortField).toBe('population');
    expect(el.sortFormElement.sortDirection).toBe('asc');
  });

  it('uses "desc" for both the request and the sort-form when initialSortDirection is not set', async () => {
    const { el, requests } = await mountCrud({ options, initialSortField: 'name' });
    await wait(300);

    expect(requests).toHaveLength(1);
    expect(requests[0].data.sortField).toBe('name');
    expect(requests[0].data.sortDirection).toBe('desc');
    expect(el.sortFormElement.sortDirection).toBe('desc');
  });

  it('still applies a sort chosen from the sort-form', async () => {
    const { el, requests } = await mountCrud({ options, initialSortField: 'name' });
    await wait(300);

    el.sortFormElement.dispatchEvent(new CustomEvent('sort-changed', {
      detail: { sortField: 'population', sortDirection: 'desc' },
    }));
    await wait(300);

    expect(requests).toHaveLength(2);
    expect(requests[1].data.sortField).toBe('population');
    expect(requests[1].data.sortDirection).toBe('desc');
  });
});

describe('dile-crud list/grid view switch', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  const baseCustomization = {
    disableInsert: true,
    disableHelp: true,
    disableKeywordSearch: true,
    disableSort: true,
    disableFilter: true,
    disablePagination: true,
    hideCheckboxSelection: true,
  };

  function buildConfig(overrides = {}) {
    return new CrudConfigBuilder('https://example.test/api/countries', {
      customization: { ...baseCustomization, ...(overrides.customization || {}) },
      grid: { columns: [{ field: 'name', header: 'Name' }] },
      templates: { item: (item) => html`<span>${item.name}</span>` },
      ...overrides,
    }).getConfig();
  }

  it('shows the item template by default and renders no switch button when only one view is configured', async () => {
    const config = new CrudConfigBuilder('https://example.test/api/countries', {
      customization: baseCustomization,
      templates: { item: (item) => html`<span>${item.name}</span>` },
    }).getConfig();

    const el = document.createElement('dile-crud');
    el.config = config;
    document.body.appendChild(el);
    await el.updateComplete;

    const switchButtons = [...el.shadowRoot.querySelectorAll('dile-button-icon')]
      .filter((btn) => /view/i.test(btn.textContent));
    expect(switchButtons.length).toBe(0);
  });

  it('defaults to the item view and toggles to the grid on click when both views are configured', async () => {
    // Rendering per view mode (item vs. grid DOM) is covered in crud-list.spec.js;
    // here we only verify dile-crud's own state, wiring and button behavior, since
    // driving dile-crud-list's real data load would race its own network refresh.
    const config = buildConfig();

    const el = document.createElement('dile-crud');
    el.config = config;
    document.body.appendChild(el);
    await el.updateComplete;

    expect(el._viewMode).toBe('item');
    expect(el.listElement.viewMode).toBe('item');

    const switchButton = [...el.shadowRoot.querySelectorAll('dile-button-icon')]
      .find((btn) => /view/i.test(btn.textContent));
    expect(switchButton).toBeTruthy();
    expect(switchButton.textContent.trim()).toBe('Grid view');

    switchButton.click();
    await el.updateComplete;

    expect(el._viewMode).toBe('grid');
    expect(el.listElement.viewMode).toBe('grid');

    const switchButtonAfter = [...el.shadowRoot.querySelectorAll('dile-button-icon')]
      .find((btn) => /view/i.test(btn.textContent));
    expect(switchButtonAfter.textContent.trim()).toBe('List view');
  });

  it('does not render the switch button when customization.disableListWiewSwitch is true', async () => {
    const config = buildConfig({ customization: { disableListWiewSwitch: true } });

    const el = document.createElement('dile-crud');
    el.config = config;
    document.body.appendChild(el);
    await el.updateComplete;

    const switchButtons = [...el.shadowRoot.querySelectorAll('dile-button-icon')]
      .filter((btn) => /view/i.test(btn.textContent));
    expect(switchButtons.length).toBe(0);
    expect(el.listElement.viewMode).toBe('item');
  });
});

describe('dile-crud scope and refresh', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  async function createCrud() {
    const config = new CrudConfigBuilder('https://example.test/api/invoices', {
      customization: {
        disableInsert: true,
        disableHelp: true,
        disableKeywordSearch: true,
        disableSort: true,
        disableFilter: true,
        disablePagination: true,
        hideCheckboxSelection: true,
      },
      templates: { item: (item) => html`<span>${item.name}</span>` },
    }).getConfig();

    const el = document.createElement('dile-crud');
    el.config = config;
    el.belongsTo = 'customer';
    el.relationId = '10';
    document.body.appendChild(el);
    await el.updateComplete;
    const list = el.listElement;
    await list.updateComplete;
    await list.elservice.updateComplete;

    // Intercept the outgoing requests instead of hitting the network,
    // and let the initial load (fired on start) settle first.
    const requests = [];
    const ajax = list.elservice.ajaxget;
    ajax.generateRequest = () => requests.push({ url: ajax.url, data: ajax.data });
    list.elservice.delayTime = 10;
    await wait(250);
    requests.length = 0;
    return { el, list, requests, ajax };
  }

  it('setScope() updates belongsTo and relationId and reloads the list once from page 1', async () => {
    const { el, list, requests, ajax } = await createCrud();
    ajax.url = 'https://example.test/api/invoices?page=2';

    el.setScope('supplier', '20');
    expect(el.belongsTo).toBe('supplier');
    expect(el.relationId).toBe('20');
    await el.updateComplete;
    await list.updateComplete;
    await wait(50);

    expect(list.belongsTo).toBe('supplier');
    expect(list.relationId).toBe('20');
    expect(requests).toHaveLength(1);
    expect(requests[0].url).toBe('https://example.test/api/invoices');
    expect(requests[0].data.belongsTo).toBe('supplier');
    expect(requests[0].data.relationId).toBe('20');
  });

  it('setScope() without arguments clears the scope', async () => {
    const { el, list, requests } = await createCrud();

    el.setScope();
    await el.updateComplete;
    await list.updateComplete;
    await wait(50);

    expect(el.belongsTo).toBe('');
    expect(el.relationId).toBe('');
    expect(requests).toHaveLength(1);
    expect(requests[0].data.belongsTo).toBeUndefined();
    expect(requests[0].data.relationId).toBeUndefined();
  });

  it('refresh() keeps the current page and refresh({ resetPage: true }) goes back to page 1', async () => {
    const { el, requests, ajax } = await createCrud();
    const pagedUrl = 'https://example.test/api/invoices?page=2';

    ajax.url = pagedUrl;
    el.refresh();
    await wait(50);
    expect(requests.at(-1).url).toBe(pagedUrl);

    el.refresh({ resetPage: true });
    await wait(50);
    expect(requests.at(-1).url).toBe('https://example.test/api/invoices');
  });
});

describe('dile-crud keyword', () => {
  const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  afterEach(() => {
    document.body.innerHTML = '';
  });

  // Mounts a dile-crud on a fake endpoint: list requests are intercepted at the
  // service's dile-ajax, so nothing reaches the network.
  async function mountCrud({ keyword, disableKeywordSearch = false } = {}) {
    const config = new CrudConfigBuilder('https://example.test/api/products', {
      customization: {
        disableInsert: true,
        disableHelp: true,
        disableKeywordSearch,
        disableSort: true,
        disableFilter: true,
        disablePagination: true,
        hideCheckboxSelection: true,
      },
    }).getConfig();

    const el = document.createElement('dile-crud');
    el.config = config;
    if (keyword !== undefined) {
      el.setAttribute('keyword', keyword);
    }
    document.body.appendChild(el);
    await el.updateComplete;
    const list = el.listElement;
    await list.updateComplete;
    await list.elservice.updateComplete;
    const requests = [];
    const ajax = list.elservice.ajaxget;
    ajax.generateRequest = () => requests.push({ url: ajax.url, data: { ...ajax.data } });
    return { el, list, requests };
  }

  function searchInput(el) {
    return el.searchInputElement.shadowRoot.querySelector('input');
  }

  function keywordChip(list) {
    return list.shadowRoot
      .querySelector('dile-crud-filters-list')
      .shadowRoot.querySelector('dile-crud-filters-list-item[name="keyword"]');
  }

  it('makes a single, already filtered first request and shows the keyword in the search box', async () => {
    const { el, requests } = await mountCrud({ keyword: 'abc' });
    await wait(300);

    expect(requests).toHaveLength(1);
    expect(requests[0].data.keyword).toBe('abc');
    expect(el.searchInputElement.value).toBe('abc');
    expect(searchInput(el).value).toBe('abc');
  });

  it('setKeyword() filters the list and updates the search box, with one request', async () => {
    const { el, list, requests } = await mountCrud();
    await wait(300);
    requests.length = 0;

    el.setKeyword('x');
    expect(el.keyword).toBe('x');
    await el.updateComplete;
    await el.searchInputElement.updateComplete;
    await wait(300);

    expect(list.keyword).toBe('x');
    expect(requests).toHaveLength(1);
    expect(requests[0].data.keyword).toBe('x');
    expect(searchInput(el).value).toBe('x');
  });

  it('changing the keyword property after mount behaves like setKeyword()', async () => {
    const { el, list, requests } = await mountCrud();
    await wait(300);
    requests.length = 0;

    el.keyword = 'dom';
    await el.updateComplete;
    await el.searchInputElement.updateComplete;
    await wait(300);

    expect(list.keyword).toBe('dom');
    expect(requests).toHaveLength(1);
    expect(requests[0].data.keyword).toBe('dom');
    expect(searchInput(el).value).toBe('dom');
  });

  it('removing the keyword chip clears the keyword and the search box', async () => {
    const { el, list, requests } = await mountCrud({ keyword: 'abc' });
    await wait(300);
    requests.length = 0;
    await list.updateComplete;

    const chip = keywordChip(list);
    expect(chip).toBeTruthy();
    chip.shadowRoot.querySelector('dile-chip').shadowRoot.querySelector('dile-icon').click();
    await el.updateComplete;
    await el.searchInputElement.updateComplete;
    await wait(300);

    expect(el.keyword).toBe('');
    expect(list.keyword).toBe('');
    expect(el.searchInputElement.value).toBe('');
    expect(searchInput(el).value).toBe('');
    expect(requests).toHaveLength(1);
    expect(requests[0].data.keyword).toBe('');
  });

  it('with disableKeywordSearch, keyword still filters without a search box', async () => {
    const { el, list, requests } = await mountCrud({ keyword: 'abc', disableKeywordSearch: true });
    await wait(300);

    expect(el.searchInputElement).toBeNull();
    expect(requests).toHaveLength(1);
    expect(requests[0].data.keyword).toBe('abc');

    requests.length = 0;
    await list.updateComplete;
    keywordChip(list).shadowRoot.querySelector('dile-chip').shadowRoot.querySelector('dile-icon').click();
    await el.updateComplete;
    await wait(300);

    expect(el.keyword).toBe('');
    expect(requests).toHaveLength(1);
    expect(requests[0].data.keyword).toBe('');
  });
});

describe('dile-crud select_ajax filter chips', () => {
  const TAGS = [
    { id: 1, name: 'Fantasy' },
    { id: 2, name: 'Strategy' },
  ];
  const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  let resolveTags;
  let listRequests;

  beforeEach(() => {
    listRequests = 0;
    const tagsRequest = new Promise((resolve) => { resolveTags = resolve; });
    window.axiosInstance = {
      get: vi.fn((url) => {
        if (url.includes('/api/tags')) {
          return tagsRequest;
        }
        listRequests++;
        // The list request never resolves: these tests only care about chips
        return new Promise(() => {});
      }),
    };
  });

  afterEach(() => {
    document.body.innerHTML = '';
    delete window.axiosInstance;
  });

  async function mountCrud({ filter = {}, filtersAlwaysVisible = false } = {}) {
    const config = new CrudConfigBuilder('https://example.test/api/board-games', {
      customization: {
        disableInsert: true,
        disableHelp: true,
        disableKeywordSearch: true,
        disableSort: true,
        disableFilter: false,
        disablePagination: true,
        hideCheckboxSelection: true,
      },
      availableFilters: [
        {
          name: 'tag',
          label: 'Tag',
          active: false,
          value: '',
          type: 'select_ajax',
          endpoint: 'https://example.test/api/tags',
          optionLabelField: 'name',
          optionValueField: 'id',
          ...filter,
        },
      ],
    }).getConfig();

    const el = document.createElement('dile-crud');
    el.config = config;
    if (filtersAlwaysVisible) {
      el.filtersAlwaysVisible = true;
    }
    document.body.appendChild(el);
    await el.updateComplete;
    await wait(0);
    return el;
  }

  async function loadTags() {
    resolveTags({ status: 200, data: { data: TAGS } });
    await wait(20);
  }

  function filtersElement(el) {
    return el.shadowRoot.querySelector('dile-crud-filters, dile-crud-filters-inline');
  }

  function selectAjax(el) {
    return filtersElement(el)
      .shadowRoot.querySelector('dile-crud-filters-form')
      .shadowRoot.querySelector('dile-select-ajax-simple');
  }

  async function chipLabels(el) {
    const list = el.listElement;
    await list.updateComplete;
    const filtersList = list.shadowRoot.querySelector('dile-crud-filters-list');
    await filtersList.updateComplete;
    const items = Array.from(filtersList.shadowRoot.querySelectorAll('dile-crud-filters-list-item'));
    await Promise.all(items.map(item => item.updateComplete));
    return items
      .filter(item => item.active)
      .map(item => item.shadowRoot.querySelector('dile-chip').textContent.trim());
  }

  for (const filtersAlwaysVisible of [false, true]) {
    const variant = filtersAlwaysVisible ? 'inline filters' : 'dropdown filters';

    it(`shows the selected option label in the chip (${variant})`, async () => {
      const el = await mountCrud({ filtersAlwaysVisible });
      await loadTags();

      const field = selectAjax(el);
      field.value = '2';
      await field.updateComplete;
      await wait(0);

      const filter = el.config.availableFilters[0];
      expect(filter.active).toBe(true);
      expect(filter.valueLabel).toBe('Strategy');
      expect(await chipLabels(el)).toEqual(['Strategy']);
    });

    it(`clears the stored label when the filter is removed (${variant})`, async () => {
      const el = await mountCrud({ filtersAlwaysVisible });
      await loadTags();

      const field = selectAjax(el);
      field.value = '1';
      await field.updateComplete;
      await wait(0);
      expect(await chipLabels(el)).toEqual(['Fantasy']);

      filtersElement(el).removeFilter('tag');
      await wait(0);

      const filter = el.config.availableFilters[0];
      expect(filter.active).toBe(false);
      expect(filter.value).toBe('');
      expect(filter.valueLabel).toBe('');
      expect(await chipLabels(el)).toEqual([]);
    });

    it(`shows the filter label for an initial value and switches to the option label once options load (${variant})`, async () => {
      const el = await mountCrud({ filter: { active: true, value: '2' }, filtersAlwaysVisible });

      expect(await chipLabels(el)).toEqual(['Tag']);
      const requestsBeforeLoad = listRequests;

      await loadTags();

      expect(el.config.availableFilters[0].valueLabel).toBe('Strategy');
      expect(await chipLabels(el)).toEqual(['Strategy']);
      // Resolving the label must not reload the list
      expect(listRequests).toBe(requestsBeforeLoad);
    });
  }

  it('keeps the filter label when the initial value is not among the loaded options', async () => {
    const el = await mountCrud({ filter: { active: true, value: '99' } });
    await loadTags();

    expect(el.config.availableFilters[0].valueLabel || '').toBe('');
    expect(await chipLabels(el)).toEqual(['Tag']);
  });

  it('renders "label: value" when showLabelInChip is enabled', async () => {
    const el = await mountCrud({ filter: { active: true, value: '2', showLabelInChip: true } });
    await loadTags();

    expect(await chipLabels(el)).toEqual(['Tag: Strategy']);
  });
});

describe('dile-crud delete confirm message template', () => {
  const ITEMS = [
    { id: 1, name: 'VIP', usage_count: 12 },
    { id: 2, name: 'Newsletter', usage_count: 0 },
  ];
  const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  beforeEach(() => {
    window.axiosInstance = {
      // The list request never resolves: elements are injected by the test
      get: vi.fn(() => new Promise(() => {})),
      delete: vi.fn(() => Promise.resolve({ status: 200, data: { message: 'Deleted' } })),
    };
  });

  afterEach(() => {
    document.body.innerHTML = '';
    delete window.axiosInstance;
  });

  async function mountCrud(templates = {}) {
    const config = new CrudConfigBuilder('https://example.test/api/tags', {
      customization: {
        disableInsert: true,
        disableHelp: true,
        disableKeywordSearch: true,
        disableSort: true,
        disableFilter: true,
        disablePagination: true,
        hideCheckboxSelection: true,
      },
      templates: {
        item: (item) => html`<span class="item-name">${item.name}</span>`,
        ...templates,
      },
    }).getConfig();

    const el = document.createElement('dile-crud');
    el.config = config;
    document.body.appendChild(el);
    await el.updateComplete;
    // Let the initial (pending) list request start before injecting the elements
    await wait(300);
    const list = el.listElement;
    list.elements = ITEMS;
    list.loading = false;
    await list.updateComplete;
    return el;
  }

  async function clickDelete(el, index) {
    const listItem = el.listElement.shadowRoot.querySelectorAll('dile-crud-list-item')[index];
    await listItem.updateComplete;
    const actions = listItem.shadowRoot.querySelector('dile-crud-item-actions');
    await actions.updateComplete;
    actions.shadowRoot.querySelector('dile-button.delete').click();
    await el.deleteElement.updateComplete;
  }

  function message(el) {
    return el.deleteElement.shadowRoot.querySelector('dile-confirm .message');
  }

  const deleteConfirmMessage = (item) => item.usage_count > 0
    ? html`The tag <strong>${item.name}</strong> will be removed from ${item.usage_count} items.`
    : html`The tag <strong>${item.name}</strong> is not used anywhere.`;

  it('keeps null as default and preserves the other templates when defined', () => {
    const defaults = new CrudConfigBuilder('https://example.test/api/tags', {}).getConfig();
    expect(defaults.templates.deleteConfirmMessage).toBeNull();

    const custom = new CrudConfigBuilder('https://example.test/api/tags', {
      templates: { deleteConfirmMessage },
    }).getConfig();
    expect(custom.templates.deleteConfirmMessage).toBe(deleteConfirmMessage);
    expect(typeof custom.templates.formActions).toBe('function');
    expect(typeof custom.templates.item).toBe('function');
  });

  it('shows the message computed for the clicked item, and changes with another item', async () => {
    const el = await mountCrud({ deleteConfirmMessage });

    await clickDelete(el, 0);
    expect(message(el).querySelector('strong').textContent).toBe('VIP');
    expect(message(el).textContent.replace(/\s+/g, ' ').trim())
      .toBe('The tag VIP will be removed from 12 items.');

    el.deleteElement.shadowRoot.querySelector('dile-confirm').cancel();
    await el.deleteElement.updateComplete;

    await clickDelete(el, 1);
    expect(message(el).querySelector('strong').textContent).toBe('Newsletter');
    expect(message(el).textContent.replace(/\s+/g, ' ').trim())
      .toBe('The tag Newsletter is not used anywhere.');
  });

  it('uses the default message when no template is configured', async () => {
    const el = await mountCrud();
    el.deleteElement.translations = { delete_confirm_message: 'Translated message' };
    await clickDelete(el, 0);
    expect(message(el).querySelector('strong')).toBeNull();
    expect(message(el).textContent.trim()).toBe('Translated message');
  });

  it('accepting the confirm sends the DELETE request to endpoint/itemId', async () => {
    const el = await mountCrud({ deleteConfirmMessage });
    await clickDelete(el, 0);
    el.deleteElement.shadowRoot.querySelector('dile-confirm').accept();
    await wait(0);

    expect(window.axiosInstance.delete).toHaveBeenCalledTimes(1);
    expect(window.axiosInstance.delete.mock.calls[0][0]).toBe('https://example.test/api/tags/1');
  });
});
