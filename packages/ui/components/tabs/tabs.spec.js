import { describe, it, expect, afterEach } from 'vitest';
import './tabs.js';

describe('dile-tabs', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  async function renderTabs(html) {
    document.body.innerHTML = html;
    const el = document.body.querySelector('dile-tabs');
    await el.updateComplete;
    return el;
  }

  it('renders slotted dile-tab items', async () => {
    const el = await renderTabs(`
      <dile-tabs selected="0">
        <dile-tab>One</dile-tab>
        <dile-tab>Two</dile-tab>
      </dile-tabs>
    `);

    const tabs = el.querySelectorAll('dile-tab');
    expect(tabs.length).toBe(2);
    await tabs[0].updateComplete;
    expect(tabs[0].selected).toBe(true);
  });

  it('selects a tab when clicked', async () => {
    const el = await renderTabs(`
      <dile-tabs>
        <dile-tab>One</dile-tab>
        <dile-tab>Two</dile-tab>
      </dile-tabs>
    `);

    const tabs = el.querySelectorAll('dile-tab');
    await tabs[1].updateComplete;
    tabs[1].shadowRoot.querySelector('article').click();
    await el.updateComplete;

    expect(el.selected).toBe(1);
  });
});
