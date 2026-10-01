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

  it('renders a native link when the tab has an href', async () => {
    const el = await renderTabs(`
      <dile-tabs>
        <dile-tab href="/one">One</dile-tab>
        <dile-tab href="https://example.com" target="_blank">Two</dile-tab>
        <dile-tab>Three</dile-tab>
      </dile-tabs>
    `);

    const tabs = el.querySelectorAll('dile-tab');
    await Promise.all([...tabs].map((tab) => tab.updateComplete));

    const link1 = tabs[0].shadowRoot.querySelector('a');
    expect(link1.getAttribute('href')).toBe('/one');
    expect(link1.hasAttribute('target')).toBe(false);
    expect(link1.querySelector('article')).not.toBeNull();

    const link2 = tabs[1].shadowRoot.querySelector('a');
    expect(link2.getAttribute('target')).toBe('_blank');

    expect(tabs[2].shadowRoot.querySelector('a')).toBeNull();
  });

  it('keeps selection working for tabs with href', async () => {
    const el = await renderTabs(`
      <dile-tabs attrForSelected="name" selected="two">
        <dile-tab name="one" href="#one">One</dile-tab>
        <dile-tab name="two" href="#two">Two</dile-tab>
      </dile-tabs>
    `);

    const tabs = el.querySelectorAll('dile-tab');
    await tabs[1].updateComplete;
    expect(tabs[1].selected).toBe(true);

    tabs[0].shadowRoot.querySelector('article').click();
    await el.updateComplete;
    expect(el.selected).toBe('one');
  });
});
