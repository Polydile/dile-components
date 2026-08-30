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
