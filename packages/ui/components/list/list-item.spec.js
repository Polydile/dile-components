import { describe, it, expect, afterEach } from 'vitest';
import './list-item.js';

describe('dile-list-item', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  async function renderListItem(template) {
    document.body.innerHTML = template;
    const el = document.body.querySelector('dile-list-item');
    await el.updateComplete;
    return el;
  }

  it('renders the default slot content', async () => {
    const el = await renderListItem('<dile-list-item>Main Content</dile-list-item>');
    const bodySlot = el.shadowRoot.querySelector('.body slot');

    expect(bodySlot).toBeTruthy();
    expect(el.textContent.trim()).toBe('Main Content');
  });

  it('defaults to role="listitem" on the host', async () => {
    const el = await renderListItem('<dile-list-item>Item</dile-list-item>');
    expect(el.getAttribute('role')).toBe('listitem');
  });

  it('preserves a custom role on the host if provided', async () => {
    const el = await renderListItem('<dile-list-item role="menuitem">Item</dile-list-item>');
    expect(el.getAttribute('role')).toBe('menuitem');
  });

  it('hides prefix and suffix containers when empty', async () => {
    const el = await renderListItem('<dile-list-item>Plain Item</dile-list-item>');
    const prefixEl = el.shadowRoot.querySelector('.prefix');
    const suffixEl = el.shadowRoot.querySelector('.suffix');

    expect(prefixEl.hasAttribute('hidden')).toBe(true);
    expect(suffixEl.hasAttribute('hidden')).toBe(true);
  });

  it('shows prefix when using slot="prefix" or slot="leading"', async () => {
    const elPrefix = await renderListItem('<dile-list-item><span slot="prefix">Icon</span>Text</dile-list-item>');
    expect(elPrefix.shadowRoot.querySelector('.prefix').hasAttribute('hidden')).toBe(false);

    const elLeading = await renderListItem('<dile-list-item><span slot="leading">Avatar</span>Text</dile-list-item>');
    expect(elLeading.shadowRoot.querySelector('.prefix').hasAttribute('hidden')).toBe(false);
  });

  it('shows suffix when using slot="suffix" or slot="trailing"', async () => {
    const elSuffix = await renderListItem('<dile-list-item>Text<span slot="suffix">End</span></dile-list-item>');
    expect(elSuffix.shadowRoot.querySelector('.suffix').hasAttribute('hidden')).toBe(false);

    const elTrailing = await renderListItem('<dile-list-item>Text<span slot="trailing">End</span></dile-list-item>');
    expect(elTrailing.shadowRoot.querySelector('.suffix').hasAttribute('hidden')).toBe(false);
  });

  it('renders icons via iconPrefix and iconSuffix using dile-iconlib', async () => {
    const el = await renderListItem('<dile-list-item icon-prefix="lucide.user" icon-suffix="lucide.chevron-right">Profile</dile-list-item>');
    const prefixIcon = el.shadowRoot.querySelector('.prefix dile-iconlib');
    const suffixIcon = el.shadowRoot.querySelector('.suffix dile-iconlib');

    expect(prefixIcon).toBeTruthy();
    expect(prefixIcon.getAttribute('icon')).toBe('lucide.user');
    expect(suffixIcon).toBeTruthy();
    expect(suffixIcon.getAttribute('icon')).toBe('lucide.chevron-right');
    expect(el.shadowRoot.querySelector('.prefix').hasAttribute('hidden')).toBe(false);
    expect(el.shadowRoot.querySelector('.suffix').hasAttribute('hidden')).toBe(false);
  });

  it('prioritizes slotted content over iconPrefix and iconSuffix', async () => {
    const el = await renderListItem(`
      <dile-list-item icon-prefix="lucide.user" icon-suffix="lucide.chevron-right">
        <span slot="prefix" id="custom-prefix">Custom Prefix</span>
        Title
        <span slot="suffix" id="custom-suffix">Custom Suffix</span>
      </dile-list-item>
    `);

    const prefixSlot = el.shadowRoot.querySelector('slot[name="prefix"]');
    const assignedPrefix = prefixSlot.assignedNodes({ flatten: true });
    expect(assignedPrefix.some(node => node.id === 'custom-prefix')).toBe(true);

    const suffixSlot = el.shadowRoot.querySelector('slot[name="suffix"]');
    const assignedSuffix = suffixSlot.assignedNodes({ flatten: true });
    expect(assignedSuffix.some(node => node.id === 'custom-suffix')).toBe(true);
  });

  it('supports density, align, lines, and divider attributes', async () => {
    const el = await renderListItem('<dile-list-item density="compact" align="start" lines="2" divider="inset">Content</dile-list-item>');

    expect(el.density).toBe('compact');
    expect(el.align).toBe('start');
    expect(el.lines).toBe('2');
    expect(el.divider).toBe('inset');

    // Inset divider must apply border to .content and NOT to :host
    const hostStyle = window.getComputedStyle(el);
    const contentEl = el.shadowRoot.querySelector('.content');
    const contentStyle = window.getComputedStyle(contentEl);
    expect(hostStyle.borderBottomWidth).toBe('0px');
    expect(contentStyle.borderBottomWidth).toBe('1px');

    el.align = 'end';
    await el.updateComplete;
    expect(el.align).toBe('end');
  });

  it('supports body-align attribute and aligns body to left by default', async () => {
    const el = await renderListItem('<dile-list-item>Left Body</dile-list-item>');
    const bodyEl = el.shadowRoot.querySelector('.body');
    const styleDefault = window.getComputedStyle(bodyEl);
    expect(styleDefault.textAlign).toBe('left');

    el.bodyAlign = 'center';
    await el.updateComplete;
    const styleCenter = window.getComputedStyle(bodyEl);
    expect(styleCenter.textAlign).toBe('center');

    el.bodyAlign = 'right';
    await el.updateComplete;
    const styleRight = window.getComputedStyle(bodyEl);
    expect(styleRight.textAlign).toBe('right');
  });

  it('renders an accessible interactive element when clickable is true', async () => {
    const el = await renderListItem('<dile-list-item clickable>Clickable Item</dile-list-item>');
    const item = el.shadowRoot.querySelector('.item');

    expect(item.getAttribute('role')).toBe('button');
    expect(item.getAttribute('tabindex')).toBe('0');

    let clicked = false;
    let detail = null;
    el.addEventListener('dile-list-item-click', (e) => {
      clicked = true;
      detail = e.detail;
    });

    item.click();
    expect(clicked).toBe(true);
    expect(detail.item).toBe(el);
  });

  it('activates clickable item with Enter and Space keys', async () => {
    const el = await renderListItem('<dile-list-item clickable>Clickable Item</dile-list-item>');
    const item = el.shadowRoot.querySelector('.item');

    let count = 0;
    el.addEventListener('dile-list-item-click', () => { count++; });

    item.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
    expect(count).toBe(1);

    item.dispatchEvent(new KeyboardEvent('keyup', { key: ' ', bubbles: true }));
    expect(count).toBe(2);
  });

  it('renders an anchor tag when href is set', async () => {
    const el = await renderListItem('<dile-list-item href="/dashboard" target="_blank">Dashboard</dile-list-item>');
    const anchor = el.shadowRoot.querySelector('a.item');

    expect(anchor).toBeTruthy();
    expect(anchor.getAttribute('href')).toBe('/dashboard');
    expect(anchor.getAttribute('target')).toBe('_blank');
    expect(anchor.getAttribute('rel')).toBe('noopener noreferrer');
    expect(anchor.getAttribute('tabindex')).toBe('0');
  });

  it('respects disabled state by preventing interaction', async () => {
    const el = await renderListItem('<dile-list-item clickable disabled>Disabled Item</dile-list-item>');
    const item = el.shadowRoot.querySelector('.item');

    expect(item.getAttribute('aria-disabled')).toBe('true');
    expect(item.getAttribute('tabindex')).toBe('-1');

    let clicked = false;
    el.addEventListener('dile-list-item-click', () => { clicked = true; });

    item.click();
    item.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
    item.dispatchEvent(new KeyboardEvent('keyup', { key: ' ', bubbles: true }));

    expect(clicked).toBe(false);
  });

  it('sets aria-selected when selected is true', async () => {
    const el = await renderListItem('<dile-list-item selected>Selected Item</dile-list-item>');
    const item = el.shadowRoot.querySelector('.item');

    expect(item.getAttribute('aria-selected')).toBe('true');
  });

  it('supports value property and includes value in click event', async () => {
    const el = await renderListItem('<dile-list-item value="profile" clickable>Profile</dile-list-item>');
    expect(el.value).toBe('profile');

    let detail = null;
    el.addEventListener('dile-list-item-click', (e) => {
      detail = e.detail;
    });

    const inner = el.shadowRoot.querySelector('.item');
    inner.click();
    expect(detail).toBeTruthy();
    expect(detail.value).toBe('profile');
  });

  it('supports itemTabindex and focus() method', async () => {
    const el = await renderListItem('<dile-list-item item-tabindex="-1" clickable>Focusable Item</dile-list-item>');
    const innerItem = el.shadowRoot.querySelector('.item');
    expect(innerItem.getAttribute('tabindex')).toBe('-1');

    el.itemTabindex = 0;
    await el.updateComplete;
    expect(innerItem.getAttribute('tabindex')).toBe('0');

    el.focus();
    expect(el.shadowRoot.activeElement).toBe(innerItem);
  });

  it('does not trigger list item click when an interactive element in slot="suffix" is clicked', async () => {
    const el = await renderListItem(`
      <dile-list-item clickable>
        Title
        <button slot="suffix" id="btn-action">Action</button>
      </dile-list-item>
    `);

    let itemClicked = false;
    let buttonClicked = false;

    el.addEventListener('dile-list-item-click', () => {
      itemClicked = true;
    });

    const button = el.querySelector('#btn-action');
    button.addEventListener('click', () => {
      buttonClicked = true;
    });

    button.click();

    expect(buttonClicked).toBe(true);
    expect(itemClicked).toBe(false);
  });
});
