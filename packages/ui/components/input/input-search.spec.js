import { describe, it, expect, afterEach } from 'vitest';
import './input-search.js';

describe('dile-input-search', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  async function renderInputSearch(html) {
    document.body.innerHTML = html;
    const el = document.body.querySelector('dile-input-search');
    await el.updateComplete;
    return el;
  }

  it('renders a native text input and a search icon', async () => {
    const el = await renderInputSearch('<dile-input-search placeholder="Search..."></dile-input-search>');
    const input = el.shadowRoot.querySelector('input');
    expect(input).toBeTruthy();
    expect(input.placeholder).toBe('Search...');
    expect(el.shadowRoot.querySelector('dile-icon')).toBeTruthy();
  });

  it('updates the value on input and dispatches dile-input-search after the delay', async () => {
    const el = await renderInputSearch('<dile-input-search delay="10"></dile-input-search>');
    const input = el.shadowRoot.querySelector('input');
    let detail = null;
    el.addEventListener('dile-input-search', (e) => { detail = e.detail; });

    input.value = 'lit';
    input.dispatchEvent(new Event('input', { bubbles: true }));
    await el.updateComplete;

    expect(el.value).toBe('lit');

    await new Promise((resolve) => setTimeout(resolve, 30));
    expect(detail).toEqual({ keyword: 'lit' });
  });
});
