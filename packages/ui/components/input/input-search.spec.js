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

  it('renders a native search input and a search icon', async () => {
    const el = await renderInputSearch('<dile-input-search placeholder="Search..."></dile-input-search>');
    const input = el.shadowRoot.querySelector('input');
    expect(input).toBeTruthy();
    expect(input.placeholder).toBe('Search...');
    expect(el.shadowRoot.querySelector('dile-icon')).toBeTruthy();
  });

  it('renders the input as a search field with browser and password manager autofill disabled', async () => {
    const el = await renderInputSearch('<dile-input-search></dile-input-search>');
    const input = el.shadowRoot.querySelector('input');
    expect(input.type).toBe('search');
    expect(input.getAttribute('autocomplete')).toBe('off');
    expect(input.hasAttribute('data-1p-ignore')).toBe(true);
    expect(input.getAttribute('data-lpignore')).toBe('true');
    expect(input.getAttribute('data-form-type')).toBe('other');
  });

  it('does not show an empty error box when errored without error slot content', async () => {
    const el = await renderInputSearch('<dile-input-search errored></dile-input-search>');

    const errorMessage = el.shadowRoot.getElementById('error-msg');
    expect(errorMessage.hidden).toBe(true);
    expect(errorMessage.getBoundingClientRect().height).toBe(0);
    // Only the search box itself gets the bordered box styles
    expect(getComputedStyle(errorMessage).borderTopStyle).toBe('none');
  });

  it('shows the error slot content when errored', async () => {
    const el = await renderInputSearch('<dile-input-search errored><span slot="error">Wrong search</span></dile-input-search>');
    await el.updateComplete;

    const errorMessage = el.shadowRoot.getElementById('error-msg');
    expect(errorMessage.hidden).toBe(false);
    expect(el.shadowRoot.querySelector('input').getAttribute('aria-describedby')).toBe('error-msg');
  });

  it('labels the button in English by default, with configurable texts', async () => {
    const el = await renderInputSearch('<dile-input-search></dile-input-search>');
    const button = el.shadowRoot.querySelector('button');
    expect(button.getAttribute('aria-label')).toBe('Search');
    expect(el.shadowRoot.querySelector('input').getAttribute('aria-label')).toBe('Search');

    el.value = 'lit';
    await el.updateComplete;
    expect(button.getAttribute('aria-label')).toBe('Clear search');

    el.clearButtonLabel = 'Limpiar búsqueda';
    await el.updateComplete;
    expect(button.getAttribute('aria-label')).toBe('Limpiar búsqueda');
  });

  it('uses accessibleLabel as aria-label, falling back to name', async () => {
    const named = await renderInputSearch('<dile-input-search name="Products"></dile-input-search>');
    expect(named.shadowRoot.querySelector('input').getAttribute('aria-label')).toBe('Products');

    const labelled = await renderInputSearch('<dile-input-search name="Products" accessibleLabel="Search products"></dile-input-search>');
    expect(labelled.shadowRoot.querySelector('input').getAttribute('aria-label')).toBe('Search products');
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
