import { describe, it, expect, afterEach } from 'vitest';
import './selector-item.js';

describe('dile-selector-item', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  async function renderSelectorItem(html) {
    document.body.innerHTML = html;
    const el = document.body.querySelector('dile-selector-item');
    await el.updateComplete;
    return el;
  }

  it('renders the slotted content and starts unselected', async () => {
    const el = await renderSelectorItem('<dile-selector-item>Option A</dile-selector-item>');

    expect(el.selected).toBe(false);
    expect(el.textContent.trim()).toBe('Option A');
    expect(el.shadowRoot.querySelector('article')).toBeTruthy();
  });

  it('dispatches dile-item-selected with itself when clicked', async () => {
    const el = await renderSelectorItem('<dile-selector-item>Option A</dile-selector-item>');
    let detail = null;
    el.addEventListener('dile-item-selected', (e) => { detail = e.detail; });

    el.shadowRoot.querySelector('article').click();

    expect(detail).toBe(el);
  });

  it('wraps content in a link when href is set', async () => {
    const el = await renderSelectorItem('<dile-selector-item href="/foo">Go</dile-selector-item>');
    const link = el.shadowRoot.querySelector('a');
    expect(link).toBeTruthy();
    expect(link.getAttribute('href')).toBe('/foo');
  });
});
