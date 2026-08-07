import { describe, it, expect, afterEach } from 'vitest';
import './country-select.js';

describe('dile-country-select', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  async function renderCountrySelect(html) {
    document.body.innerHTML = html;
    const el = document.body.querySelector('dile-country-select');
    await el.updateComplete;
    return el;
  }

  it('renders a dile-select with country options', async () => {
    const el = await renderCountrySelect('<dile-country-select name="country"></dile-country-select>');
    const select = el.shadowRoot.querySelector('dile-select');
    expect(select).toBeTruthy();
    expect(el.shadowRoot.querySelectorAll('option').length).toBeGreaterThan(1);
  });

  it('updates value and dispatches country-changed on selection change', async () => {
    const el = await renderCountrySelect('<dile-country-select name="country"></dile-country-select>');
    let detail = null;
    el.addEventListener('country-changed', (e) => { detail = e.detail; });

    el.shadowRoot.querySelector('dile-select').dispatchEvent(
      new CustomEvent('element-changed', { detail: { value: 'ES' } })
    );

    expect(el.value).toBe('ES');
    expect(detail).toEqual({ value: 'ES' });
  });
});
