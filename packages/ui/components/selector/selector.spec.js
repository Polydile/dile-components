import { describe, it, expect, afterEach } from 'vitest';
import { userEvent } from 'vitest/browser';
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
    items[1].shadowRoot.querySelector('button').click();
    await el.updateComplete;

    expect(el.selected).toBe(1);
    expect(items[1].selected).toBe(true);
    expect(items[0].selected).toBe(false);
  });

  it('selects the items with the keyboard, each one being a stop in the tab sequence', async () => {
    const el = await renderSelector(`
      <dile-selector attrForSelected="name">
        <dile-selector-item name="one">One</dile-selector-item>
        <dile-selector-item name="two">Two</dile-selector-item>
      </dile-selector>
    `);
    const items = el.querySelectorAll('dile-selector-item');

    await userEvent.keyboard('{Tab}');
    expect(document.activeElement).toBe(items[0]);
    await userEvent.keyboard('{Tab}');
    expect(document.activeElement).toBe(items[1]);
    await userEvent.keyboard('{Enter}');
    await el.updateComplete;

    expect(el.selected).toBe('two');
    expect(items[1].selected).toBe(true);
    expect(document.activeElement).toBe(items[1]);
  });

  it('selects a link item when it is activated with the keyboard', async () => {
    const el = await renderSelector(`
      <dile-selector>
        <dile-selector-item href="#selector-no-target-a">A</dile-selector-item>
        <dile-selector-item href="#selector-no-target-b">B</dile-selector-item>
      </dile-selector>
    `);
    const items = el.querySelectorAll('dile-selector-item');

    items[1].focus();
    await userEvent.keyboard('{Enter}');
    await el.updateComplete;

    expect(el.selected).toBe(1);
    expect(items[1].selected).toBe(true);
    expect(window.location.hash).toBe('#selector-no-target-b');
    window.location.hash = '';
  });
});
