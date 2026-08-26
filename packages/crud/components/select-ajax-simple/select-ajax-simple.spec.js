import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import './select-ajax-simple.js';

const MOCK_DATA = [
  { id: 1, name: 'Fantasy' },
  { id: 2, name: 'Strategy' },
];

function mockAxiosSuccess(data = MOCK_DATA) {
  window.axiosInstance = {
    get: vi.fn().mockResolvedValue({ status: 200, data: { data } }),
  };
}

function mockAxiosError() {
  window.axiosInstance = {
    get: vi.fn().mockRejectedValue(new Error('Network error')),
  };
}

async function renderEl(html) {
  document.body.innerHTML = html;
  const el = document.body.querySelector('dile-select-ajax-simple');
  await el.updateComplete;
  // Wait for async loadData to complete and re-render
  await new Promise(resolve => setTimeout(resolve, 10));
  await el.updateComplete;
  return el;
}

describe('dile-select-ajax-simple', () => {
  beforeEach(() => {
    mockAxiosSuccess();
  });

  afterEach(() => {
    document.body.innerHTML = '';
    delete window.axiosInstance;
    vi.restoreAllMocks();
  });

  it('shows a spinner while loading', async () => {
    document.body.innerHTML = '<dile-select-ajax-simple endpoint="/api/tags" name="tag"></dile-select-ajax-simple>';
    const el = document.body.querySelector('dile-select-ajax-simple');
    await el.updateComplete;

    expect(el.shadowRoot.querySelector('dile-spinner-horizontal')).toBeTruthy();
  });

  it('renders options after successful data load', async () => {
    const el = await renderEl('<dile-select-ajax-simple endpoint="/api/tags" name="tag"></dile-select-ajax-simple>');

    const options = el.shadowRoot.querySelectorAll('option');
    // placeholder + 2 data options
    expect(options.length).toBe(3);
    expect(options[1].textContent).toBe('Fantasy');
    expect(options[2].textContent).toBe('Strategy');
  });

  it('uses displayProperty and idProperty for option rendering', async () => {
    window.axiosInstance = {
      get: vi.fn().mockResolvedValue({
        status: 200,
        data: { data: [{ code: 'FR', title: 'France' }] }
      }),
    };
    const el = await renderEl(
      '<dile-select-ajax-simple endpoint="/api/countries" name="country" displayProperty="title" idProperty="code"></dile-select-ajax-simple>'
    );

    const options = el.shadowRoot.querySelectorAll('option');
    expect(options[1].value).toBe('FR');
    expect(options[1].textContent).toBe('France');
  });

  it('shows error message when request fails', async () => {
    mockAxiosError();
    const el = await renderEl('<dile-select-ajax-simple endpoint="/api/tags" name="tag"></dile-select-ajax-simple>');

    expect(el.shadowRoot.querySelector('p.error')).toBeTruthy();
    expect(el.shadowRoot.querySelector('dile-select')).toBeNull();
  });

  it('shows empty message when response has no items', async () => {
    window.axiosInstance = {
      get: vi.fn().mockResolvedValue({ status: 200, data: { data: [] } }),
    };
    const el = await renderEl('<dile-select-ajax-simple endpoint="/api/tags" name="tag"></dile-select-ajax-simple>');

    expect(el.shadowRoot.querySelector('p.empty')).toBeTruthy();
  });

  it('dispatches element-changed when an option is selected', async () => {
    const el = await renderEl('<dile-select-ajax-simple endpoint="/api/tags" name="tag"></dile-select-ajax-simple>');

    let detail = null;
    el.addEventListener('element-changed', (e) => { detail = e.detail; });

    el.value = '1';
    await el.updateComplete;

    expect(detail).not.toBeNull();
    expect(detail.name).toBe('tag');
    expect(detail.value).toBe('1');
  });

  it('supports getSelectResultList as custom extractor', async () => {
    window.axiosInstance = {
      get: vi.fn().mockResolvedValue({ status: 200, data: { result: { items: MOCK_DATA } } }),
    };
    // Set getSelectResultList before connectedCallback fires
    const el = document.createElement('dile-select-ajax-simple');
    el.getSelectResultList = (json) => json.result.items;
    el.endpoint = '/api/tags';
    el.name = 'tag';
    document.body.appendChild(el);
    await el.updateComplete;
    await new Promise(resolve => setTimeout(resolve, 10));
    await el.updateComplete;

    const options = el.shadowRoot.querySelectorAll('option');
    expect(options.length).toBe(3);
    expect(options[1].textContent).toBe('Fantasy');
  });

  it('renders label when provided', async () => {
    const el = await renderEl('<dile-select-ajax-simple endpoint="/api/tags" name="tag" label="Category"></dile-select-ajax-simple>');

    const label = el.shadowRoot.querySelector('label');
    expect(label).toBeTruthy();
    expect(label.textContent).toBe('Category');
  });
});
