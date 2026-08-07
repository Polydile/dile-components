import { describe, it, expect, afterEach } from 'vitest';
import './box-selector-item.js';

describe('dile-box-selector-item', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  async function renderItem(html) {
    document.body.innerHTML = html;
    const el = document.body.querySelector('dile-box-selector-item');
    await el.updateComplete;
    return el;
  }

  it('renders the label property', async () => {
    const el = await renderItem('<dile-box-selector-item label="Option A"></dile-box-selector-item>');
    expect(el.shadowRoot.textContent.trim()).toBe('Option A');
  });

  it('reflects selected attribute when clicked', async () => {
    const el = await renderItem('<dile-box-selector-item label="Option A"></dile-box-selector-item>');
    el.select();
    await el.updateComplete;
    expect(el.selected).toBe(false);
  });
});
