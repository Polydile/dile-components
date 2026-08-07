import { describe, it, expect, afterEach } from 'vitest';
import './box-selector.js';
import './box-selector-item.js';

describe('dile-box-selector', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  async function renderSelector(html) {
    document.body.innerHTML = html;
    const el = document.body.querySelector('dile-box-selector');
    await el.updateComplete;
    return el;
  }

  it('renders the slotted items', async () => {
    const el = await renderSelector(`
      <dile-box-selector>
        <dile-box-selector-item label="One"></dile-box-selector-item>
        <dile-box-selector-item label="Two"></dile-box-selector-item>
      </dile-box-selector>
    `);
    expect(el.shadowRoot.querySelector('slot')).toBeTruthy();
    expect(el.querySelectorAll('dile-box-selector-item').length).toBe(2);
  });
});
