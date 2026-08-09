import { describe, it, expect, afterEach, vi } from 'vitest';
import './ajax-select-crud-overlay.js';

describe('dile-ajax-select-crud-overlay', () => {
  afterEach(() => {
    document.body.innerHTML = '';
    delete window.axiosInstance;
  });

  function wait(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  function mockAxios(responseData) {
    const get = vi.fn(() => Promise.resolve({ status: 200, data: responseData }));
    window.axiosInstance = { get };
    return get;
  }

  async function renderCrudSelect(html) {
    document.body.innerHTML = html;
    const el = document.body.querySelector('dile-ajax-select-crud-overlay');
    await el.updateComplete;
    return el;
  }

  async function typeKeyword(el, keyword) {
    const input = el.shadowRoot.getElementById('search');
    input.value = keyword;
    input.dispatchEvent(new Event('input', { bubbles: true }));
    await wait(el.delay + 50);
    await el.updateComplete;
  }

  describe('Rendering', () => {
    it('renders the search input, same as dile-select-ajax-overlay', async () => {
      mockAxios([]);
      const el = await renderCrudSelect(`
        <dile-ajax-select-crud-overlay endpoint="/api/countries" idProperty="id" displayProperty="name"></dile-ajax-select-crud-overlay>
      `);

      const input = el.shadowRoot.getElementById('search');
      expect(input).toBeTruthy();
      expect(input.getAttribute('role')).toBe('combobox');
    });
  });

  describe('Uses axios instead of fetch', () => {
    it('requests through window.axiosInstance.get, not the native fetch API', async () => {
      const get = mockAxios([{ id: 1, name: 'Spain' }]);
      const fetchSpy = vi.spyOn(window, 'fetch');

      const el = await renderCrudSelect(`
        <dile-ajax-select-crud-overlay endpoint="/api/countries" idProperty="id" displayProperty="name" queryStringVariable="keyword" delay="10"></dile-ajax-select-crud-overlay>
      `);

      await typeKeyword(el, 'sp');

      expect(get).toHaveBeenCalledWith('/api/countries', { params: { keyword: 'sp' } });
      expect(fetchSpy).not.toHaveBeenCalled();
      expect(el.data.length).toBe(1);
      expect(el.select.opened).toBe(true);

      fetchSpy.mockRestore();
    });

    it('fetches the initial value display text through axios', async () => {
      // searchValueInitial() passes response.data (i.e. the "data" envelope, not the raw
      // response) down to registerText(), matching dile-ajax-select-crud's own convention.
      const get = vi.fn(() => Promise.resolve({ status: 200, data: { data: { name: 'Spain' } } }));
      window.axiosInstance = { get };

      const el = await renderCrudSelect(`
        <dile-ajax-select-crud-overlay endpoint="/api/countries" idProperty="id" displayProperty="name" value="22"></dile-ajax-select-crud-overlay>
      `);
      await wait(50);
      await el.updateComplete;

      expect(get).toHaveBeenCalledWith('/api/countries/22');
      expect(el.selectedText).toBe('Spain');
      expect(el.isSelected).toBe(true);
    });
  });

  describe('Selecting a result (no extra click required)', () => {
    it('opens the popup as soon as results load and lets the user pick without a second click', async () => {
      mockAxios([{ id: 1, name: 'Spain' }, { id: 2, name: 'France' }]);
      const el = await renderCrudSelect(`
        <dile-ajax-select-crud-overlay endpoint="/api/countries" idProperty="id" displayProperty="name" delay="10"></dile-ajax-select-crud-overlay>
      `);

      await typeKeyword(el, 'sp');
      expect(el.select.opened).toBe(true);

      const options = el.select.shadowRoot.querySelectorAll('[role="option"]');
      options[0].click();
      await el.select.updateComplete;
      await el.updateComplete;

      expect(el.value).toBe('1');
      expect(el.selectedText).toBe('Spain');
      expect(el.isSelected).toBe(true);
    });
  });

  describe('maxResults / pageParamName', () => {
    it('adds the page-size param to the request when both are set', async () => {
      const get = mockAxios([]);
      const el = await renderCrudSelect(`
        <dile-ajax-select-crud-overlay endpoint="/api/countries" idProperty="id" displayProperty="name" queryStringVariable="keyword" maxResults="5" pageParamName="limit" delay="10"></dile-ajax-select-crud-overlay>
      `);

      await typeKeyword(el, 'sp');

      expect(get).toHaveBeenCalledWith('/api/countries', { params: { keyword: 'sp', limit: 5 } });
    });

    it('omits the page-size param when pageParamName is not set', async () => {
      const get = mockAxios([]);
      const el = await renderCrudSelect(`
        <dile-ajax-select-crud-overlay endpoint="/api/countries" idProperty="id" displayProperty="name" queryStringVariable="keyword" maxResults="5" delay="10"></dile-ajax-select-crud-overlay>
      `);

      await typeKeyword(el, 'sp');

      expect(get).toHaveBeenCalledWith('/api/countries', { params: { keyword: 'sp' } });
    });
  });

  describe('getSelectResultList', () => {
    it('uses getSelectResultList to extract the list when the response shape needs adapting', async () => {
      mockAxios({ data: { result: { data: [{ id: 1, name: 'Spain' }] } } });
      const el = await renderCrudSelect(`
        <dile-ajax-select-crud-overlay endpoint="/api/countries" idProperty="id" displayProperty="name" delay="10"></dile-ajax-select-crud-overlay>
      `);
      el.getSelectResultList = (response) => response.data.result.data;

      await typeKeyword(el, 'sp');

      expect(el.data).toEqual([{ id: 1, name: 'Spain' }]);
    });

    it('takes priority over resultDataProperty when both are set', async () => {
      mockAxios({ items: [{ id: 1, name: 'Spain' }], data: [] });
      const el = await renderCrudSelect(`
        <dile-ajax-select-crud-overlay endpoint="/api/countries" idProperty="id" displayProperty="name" resultDataProperty="data" delay="10"></dile-ajax-select-crud-overlay>
      `);
      el.getSelectResultList = (response) => response.items;

      await typeKeyword(el, 'sp');

      expect(el.data).toEqual([{ id: 1, name: 'Spain' }]);
    });
  });

  describe('Icons (inherited from dile-select-ajax-overlay)', () => {
    it('propagates iconProperty and icon to data-icon on the generated options/select', async () => {
      mockAxios([
        { id: 1, name: 'Spain' },
        { id: 2, name: 'France', iconName: 'material.star' },
      ]);
      const el = await renderCrudSelect(`
        <dile-ajax-select-crud-overlay endpoint="/api/countries" idProperty="id" displayProperty="name" iconProperty="iconName" icon="lucide.globe" delay="10"></dile-ajax-select-crud-overlay>
      `);

      await typeKeyword(el, 'sp');

      const options = el.select.options;
      // Spain has no iconName of its own, so it falls back to the select-level default.
      expect(options[0].icon).toBe('lucide.globe');
      // France declares its own icon via iconProperty, which takes precedence.
      expect(options[1].icon).toBe('material.star');
    });
  });

  describe('Form Association', () => {
    it('is form-associated, same as dile-select-ajax-overlay', async () => {
      mockAxios([]);
      const el = await renderCrudSelect(`
        <dile-ajax-select-crud-overlay endpoint="/api/countries" idProperty="id" displayProperty="name"></dile-ajax-select-crud-overlay>
      `);

      expect(el.internals).toBeTruthy();
    });
  });
});
