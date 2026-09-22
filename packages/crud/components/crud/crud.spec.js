import { describe, it, expect, afterEach } from 'vitest';
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
