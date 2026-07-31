import { describe, it, expect, afterEach } from 'vitest';
import './selector-overlay.js';
import './selector-item.js';

describe('dile-selector-overlay', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  async function renderSelectorOverlay(html) {
    document.body.innerHTML = html;
    const el = document.body.querySelector('dile-selector-overlay');
    await el.updateComplete;
    return el;
  }

  function wait(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  it('renders a bare rounded icon trigger with the default icon when label is empty', async () => {
    const el = await renderSelectorOverlay(`
      <dile-selector-overlay>
        <dile-selector-item>One</dile-selector-item>
        <dile-selector-item>Two</dile-selector-item>
      </dile-selector-overlay>
    `);

    const trigger = el.shadowRoot.getElementById('trigger');
    const icon = trigger.querySelector('dile-lucide-icon');
    expect(icon).toBeTruthy();
    expect(icon.getAttribute('icon')).toBe('ellipsis-vertical');
    expect(icon.hasAttribute('rounded')).toBe(true);
    // dile-lucide-icon forwards `rounded` to the inner icon it renders in its own shadow DOM
    expect(icon.shadowRoot.querySelector('[rounded]')).toBeTruthy();
    expect(trigger.querySelector('dile-lucide-badge')).toBeFalsy();
  });

  it('by default, label is shown as static text regardless of the selection', async () => {
    const el = await renderSelectorOverlay(`
      <dile-selector-overlay label="Menu" selected="0">
        <dile-selector-item>One</dile-selector-item>
        <dile-selector-item>Two</dile-selector-item>
      </dile-selector-overlay>
    `);

    const trigger = el.shadowRoot.getElementById('trigger');
    const badge = trigger.querySelector('dile-lucide-badge');
    expect(badge).toBeTruthy();
    expect(badge.textContent.trim()).toBe('Menu');
    expect(badge.getAttribute('icon')).toBe('ellipsis-vertical');
    expect(trigger.querySelector('dile-lucide-icon')).toBeFalsy();

    el.querySelectorAll('dile-selector-item')[1].shadowRoot.querySelector('article').click();
    await el.updateComplete;

    expect(trigger.querySelector('dile-lucide-badge').textContent.trim()).toBe('Menu');
  });

  it('with dynamicLabel, the trigger label follows the selected item text and updates when selection changes', async () => {
    const el = await renderSelectorOverlay(`
      <dile-selector-overlay dynamicLabel selected="1">
        <dile-selector-item>One</dile-selector-item>
        <dile-selector-item>Two</dile-selector-item>
      </dile-selector-overlay>
    `);

    const trigger = el.shadowRoot.getElementById('trigger');
    expect(trigger.querySelector('dile-lucide-badge').textContent.trim()).toBe('Two');

    el.querySelectorAll('dile-selector-item')[0].shadowRoot.querySelector('article').click();
    await el.updateComplete;

    expect(trigger.querySelector('dile-lucide-badge').textContent.trim()).toBe('One');
  });

  it('with dynamicLabel and nothing selected, label falls back to the label property', async () => {
    const el = await renderSelectorOverlay(`
      <dile-selector-overlay dynamicLabel label="Choose an option">
        <dile-selector-item>One</dile-selector-item>
        <dile-selector-item>Two</dile-selector-item>
      </dile-selector-overlay>
    `);

    const trigger = el.shadowRoot.getElementById('trigger');
    expect(trigger.querySelector('dile-lucide-badge').textContent.trim()).toBe('Choose an option');
  });

  it('uses a custom icon name when the icon property is set', async () => {
    const el = await renderSelectorOverlay(`
      <dile-selector-overlay icon="star" label="Two">
        <dile-selector-item>One</dile-selector-item>
        <dile-selector-item>Two</dile-selector-item>
      </dile-selector-overlay>
    `);

    const trigger = el.shadowRoot.getElementById('trigger');
    expect(trigger.querySelector('dile-lucide-badge').getAttribute('icon')).toBe('star');
  });

  it('opens the internal dile-menu-overlay when the trigger is clicked', async () => {
    const el = await renderSelectorOverlay(`
      <dile-selector-overlay>
        <dile-selector-item>One</dile-selector-item>
        <dile-selector-item>Two</dile-selector-item>
      </dile-selector-overlay>
    `);

    const menuOverlay = el.shadowRoot.querySelector('dile-menu-overlay');
    el.shadowRoot.getElementById('trigger').click();
    await wait(100);

    expect(menuOverlay.shadowRoot.getElementById('overlay').classList.contains('opened')).toBe(true);
  });

  it('selecting an item dispatches dile-selected-changed and closes the overlay', async () => {
    const el = await renderSelectorOverlay(`
      <dile-selector-overlay>
        <dile-selector-item>One</dile-selector-item>
        <dile-selector-item>Two</dile-selector-item>
      </dile-selector-overlay>
    `);

    const menuOverlay = el.shadowRoot.querySelector('dile-menu-overlay');
    el.shadowRoot.getElementById('trigger').click();
    await wait(100);

    let detail = null;
    el.addEventListener('dile-selected-changed', (e) => { detail = e.detail; });

    const items = el.querySelectorAll('dile-selector-item');
    items[1].shadowRoot.querySelector('article').click();
    await el.updateComplete;

    expect(detail.selected).toBe(1);
    expect(el.selected).toBe(1);
    expect(menuOverlay.shadowRoot.getElementById('overlay').classList.contains('opened')).toBe(false);
  });
});
