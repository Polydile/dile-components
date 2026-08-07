import { describe, it, expect, afterEach } from 'vitest';
import './selector.js';
import './selector-item.js';

describe('dile-selector', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  async function renderSelector(html) {
    document.body.innerHTML = html;
    const el = document.body.querySelector('dile-selector');
    await el.updateComplete;
    return el;
  }

  it('renders a slot with the selector items', async () => {
    const el = await renderSelector(`
      <dile-selector>
        <dile-selector-item>One</dile-selector-item>
        <dile-selector-item>Two</dile-selector-item>
      </dile-selector>
    `);

    expect(el.shadowRoot.querySelector('slot')).toBeTruthy();
    expect(el.querySelectorAll('dile-selector-item').length).toBe(2);
  });

  it('selects an item by index when clicked, marking it selected', async () => {
    const el = await renderSelector(`
      <dile-selector>
        <dile-selector-item>One</dile-selector-item>
        <dile-selector-item>Two</dile-selector-item>
      </dile-selector>
    `);

    const items = el.querySelectorAll('dile-selector-item');
    items[1].shadowRoot.querySelector('article').click();
    await el.updateComplete;

    expect(el.selected).toBe(1);
    expect(items[1].selected).toBe(true);
    expect(items[0].selected).toBe(false);
  });
});
