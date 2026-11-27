import { describe, it, expect, afterEach, vi } from 'vitest';
import './select-ajax.js';

describe('dile-select-ajax', () => {
  afterEach(() => {
    document.body.innerHTML = '';
    vi.unstubAllGlobals();
  });

  function wait(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async function renderSelectAjax(html) {
    document.body.innerHTML = html;
    const el = document.body.querySelector('dile-select-ajax');
    await el.updateComplete;
    return el;
  }

  it('marks the search input as invalid and describes it with the message', async () => {
    const el = await renderSelectAjax('<dile-select-ajax endpoint="/api/countries" errored message="Choose a country"></dile-select-ajax>');
    const search = el.shadowRoot.getElementById('search');
    await search.updateComplete;
    const input = search.shadowRoot.querySelector('input');

    expect(el.shadowRoot.querySelector('.message').id).toBeTruthy();
    expect(input.getAttribute('aria-invalid')).toBe('true');
    expect(input.getAttribute('aria-description')).toBe('Choose a country');

    el.clearError();
    await el.updateComplete;
    await search.updateComplete;
    expect(input.hasAttribute('aria-invalid')).toBe(false);
    expect(input.hasAttribute('aria-description')).toBe(false);
  });

  it('describes the generated select with the message in static mode', async () => {
    vi.stubGlobal('fetch', vi.fn(() => Promise.resolve({
      json: () => Promise.resolve([{ id: 1, name: 'Spain' }]),
    })));
    const el = await renderSelectAjax('<dile-select-ajax static endpoint="/api/countries" displayProperty="name"></dile-select-ajax>');
    await wait(20);
    await el.updateComplete;
    const select = el.shadowRoot.querySelector('select');
    expect(select).toBeTruthy();

    el.errored = true;
    el.message = 'Choose a country';
    await el.updateComplete;
    await el.select.updateComplete;
    expect(select.getAttribute('aria-invalid')).toBe('true');
    expect(select.getAttribute('aria-description')).toBe('Choose a country');

    el.clearError();
    await el.updateComplete;
    await el.select.updateComplete;
    expect(select.getAttribute('aria-invalid')).toBe('false');
    expect(select.getAttribute('aria-description')).toBe('');
  });
});
