import { describe, it, expect, afterEach, vi } from 'vitest';
import { html } from 'lit';
import './crud-detail.js';

describe('dile-crud-detail', () => {
  afterEach(() => {
    document.body.innerHTML = '';
    delete window.axiosInstance;
  });

  async function renderDetail(style = '') {
    window.axiosInstance = {
      get: vi.fn(() => Promise.resolve({ status: 200, data: { data: { id: 1, name: 'Test Item' } } })),
    };
    const el = document.createElement('dile-crud-detail');
    if (style) el.setAttribute('style', style);
    el.endpoint = 'https://example.test/api/items/1';
    el.itemDetailTemplate = (item) => html`<p class="name">${item?.name || ''}</p>`;
    el.responseAdapter = {
      setResponse: () => {},
      getData: () => ({ id: 1, name: 'Test Item' }),
    };
    document.body.appendChild(el);
    await vi.waitFor(() => {
      if (!el.shadowRoot.querySelector('.detail-data .name')) throw new Error('not loaded');
    });
    return el;
  }

  function dataStyle(el) {
    return getComputedStyle(el.shadowRoot.querySelector('.detail-data'));
  }

  it('renders the item with the detail template', async () => {
    const el = await renderDetail();
    expect(el.shadowRoot.querySelector('.detail-data .name').textContent).toBe('Test Item');
  });

  it('keeps the default look: no border, no shadow, rounded top only', async () => {
    const style = dataStyle(await renderDetail());
    expect(style.backgroundColor).toBe('rgb(245, 245, 245)');
    expect(style.borderTopStyle).toBe('none');
    expect(style.boxShadow).toBe('none');
    expect(style.borderTopLeftRadius).toBe('9.6px');
    expect(style.borderTopRightRadius).toBe('9.6px');
    expect(style.borderBottomLeftRadius).toBe('0px');
    expect(style.borderBottomRightRadius).toBe('0px');
  });

  it('accepts border, box shadow and bottom radius custom properties', async () => {
    const style = dataStyle(await renderDetail(`
      --dile-crud-detail-data-border: 2px solid rgb(255, 0, 0);
      --dile-crud-detail-data-box-shadow: rgb(0, 0, 0) 0px 2px 4px 0px;
      --dile-crud-detail-data-border-bottom-left-radius: 5px;
      --dile-crud-detail-data-border-bottom-right-radius: 6px;
    `));
    expect(style.borderTopWidth).toBe('2px');
    expect(style.borderTopStyle).toBe('solid');
    expect(style.borderTopColor).toBe('rgb(255, 0, 0)');
    expect(style.boxShadow).toBe('rgb(0, 0, 0) 0px 2px 4px 0px');
    expect(style.borderBottomLeftRadius).toBe('5px');
    expect(style.borderBottomRightRadius).toBe('6px');
  });
});
