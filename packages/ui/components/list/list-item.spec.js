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

  function key(target, type, key) {
    const ev = new KeyboardEvent(type, { key, bubbles: true, composed: true, cancelable: true });
    target.dispatchEvent(ev);
    return ev;
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

  it('does not render a divider nor noise attributes by default', async () => {
    const el = await renderListItem('<dile-list-item>Plain</dile-list-item>');
    expect(el.hasAttribute('divider')).toBe(false);
    expect(el.hasAttribute('href')).toBe(false);
    expect(el.hasAttribute('value')).toBe(false);
    expect(getComputedStyle(el).borderBottomWidth).toBe('0px');
  });

  it('renders a full divider with the boolean divider attribute and with divider="full"', async () => {
    const el = await renderListItem('<dile-list-item divider>Item</dile-list-item>');
    expect(getComputedStyle(el).borderBottomWidth).toBe('1px');

    el.divider = 'none';
    await el.updateComplete;
    expect(getComputedStyle(el).borderBottomWidth).toBe('0px');

    el.divider = 'full';
    await el.updateComplete;
    expect(getComputedStyle(el).borderBottomWidth).toBe('1px');
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

  it('clamps the body to a numeric lines value', async () => {
    const el = await renderListItem('<dile-list-item lines="3">Content</dile-list-item>');
    expect(el.style.getPropertyValue('--_lines')).toBe('3');
    expect(getComputedStyle(el.shadowRoot.querySelector('.body')).webkitLineClamp).toBe('3');

    el.lines = 'auto';
    await el.updateComplete;
    expect(el.style.getPropertyValue('--_lines')).toBe('');
  });

  it('supports body-align attribute and aligns body to left by default', async () => {
    const el = await renderListItem('<dile-list-item>Left Body</dile-list-item>');
    const bodyEl = el.shadowRoot.querySelector('.body');
    expect(window.getComputedStyle(bodyEl).textAlign).toBe('left');

    el.bodyAlign = 'center';
    await el.updateComplete;
    expect(window.getComputedStyle(bodyEl).textAlign).toBe('center');

    el.bodyAlign = 'right';
    await el.updateComplete;
    expect(window.getComputedStyle(bodyEl).textAlign).toBe('right');
  });

  it('uses --dile-list-item-text-align when body-align is not set', async () => {
    const el = await renderListItem('<dile-list-item style="--dile-list-item-text-align: right">Body</dile-list-item>');
    expect(window.getComputedStyle(el.shadowRoot.querySelector('.body')).textAlign).toBe('right');
  });

  it('renders an accessible interactive element when clickable is true', async () => {
    const el = await renderListItem('<dile-list-item clickable>Clickable Item</dile-list-item>');
    const item = el.shadowRoot.querySelector('.item');

    expect(item.getAttribute('role')).toBe('button');
    expect(item.getAttribute('tabindex')).toBe('0');

    let detail = null;
    el.addEventListener('dile-list-item-click', (e) => {
      detail = e.detail;
    });

    item.click();
    expect(detail.item).toBe(el);
  });

  it('does not dispatch click events when it is not interactive', async () => {
    const el = await renderListItem('<dile-list-item>Static</dile-list-item>');
    let clicked = false;
    el.addEventListener('dile-list-item-click', () => { clicked = true; });
    el.shadowRoot.querySelector('.item').click();
    expect(clicked).toBe(false);
  });

  it('activates clickable item with Enter and Space keys', async () => {
    const el = await renderListItem('<dile-list-item clickable>Clickable Item</dile-list-item>');
    const item = el.shadowRoot.querySelector('.item');

    let count = 0;
    el.addEventListener('dile-list-item-click', () => { count++; });

    key(item, 'keydown', 'Enter');
    expect(count).toBe(1);

    key(item, 'keyup', ' ');
    expect(count).toBe(2);
  });

  it('prevents page scroll when Space is pressed on a clickable item', async () => {
    const el = await renderListItem('<dile-list-item clickable>Clickable Item</dile-list-item>');
    const ev = key(el.shadowRoot.querySelector('.item'), 'keydown', ' ');
    expect(ev.defaultPrevented).toBe(true);
  });

  it('ignores keys pressed on controls placed inside the item', async () => {
    const el = await renderListItem(`
      <dile-list-item clickable>
        <input id="field">
        <span slot="suffix">x</span>
      </dile-list-item>
    `);
    let count = 0;
    el.addEventListener('dile-list-item-click', () => { count++; });
    const input = el.querySelector('#field');

    const enter = key(input, 'keydown', 'Enter');
    const space = key(input, 'keydown', ' ');
    key(input, 'keyup', ' ');

    expect(count).toBe(0);
    expect(enter.defaultPrevented).toBe(false);
    expect(space.defaultPrevented).toBe(false);
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

  it('removes the href of the inner anchor when disabled', async () => {
    const el = await renderListItem('<dile-list-item href="/dashboard" disabled>Dashboard</dile-list-item>');
    const anchor = el.shadowRoot.querySelector('a.item');
    expect(anchor.hasAttribute('href')).toBe(false);
    expect(anchor.getAttribute('aria-disabled')).toBe('true');
    expect(anchor.getAttribute('tabindex')).toBe('-1');
  });

  it('respects disabled state by preventing interaction', async () => {
    const el = await renderListItem('<dile-list-item clickable disabled>Disabled Item</dile-list-item>');
    const item = el.shadowRoot.querySelector('.item');

    expect(item.getAttribute('aria-disabled')).toBe('true');
    expect(item.getAttribute('tabindex')).toBe('-1');
    expect(getComputedStyle(el).cursor).toBe('not-allowed');

    let clicked = false;
    el.addEventListener('dile-list-item-click', () => { clicked = true; });

    item.click();
    key(item, 'keydown', 'Enter');
    key(item, 'keyup', ' ');

    expect(clicked).toBe(false);
  });

  it('sets aria-current on the inner element when a standalone item is selected', async () => {
    const el = await renderListItem('<dile-list-item clickable selected>Selected Item</dile-list-item>');
    const item = el.shadowRoot.querySelector('.item');

    expect(item.getAttribute('aria-current')).toBe('true');
    expect(item.hasAttribute('aria-selected')).toBe(false);
  });

  it('acts as a focusable option on the host when role="option"', async () => {
    const el = await renderListItem('<dile-list-item role="option" clickable selected value="a">Option</dile-list-item>');
    const inner = el.shadowRoot.querySelector('.item');

    expect(el.getAttribute('aria-selected')).toBe('true');
    expect(el.getAttribute('tabindex')).toBe('0');
    expect(inner.hasAttribute('role')).toBe(false);
    expect(inner.hasAttribute('tabindex')).toBe(false);
    expect(inner.hasAttribute('aria-current')).toBe(false);

    el.selected = false;
    el.disabled = true;
    await el.updateComplete;
    expect(el.getAttribute('aria-selected')).toBe('false');
    expect(el.getAttribute('aria-disabled')).toBe('true');
    expect(el.getAttribute('tabindex')).toBe('-1');

    el.disabled = false;
    await el.updateComplete;
    el.focus();
    expect(document.activeElement).toBe(el);

    let count = 0;
    el.addEventListener('dile-list-item-click', () => { count++; });
    key(el, 'keydown', 'Enter');
    expect(count).toBe(1);
  });

  it('reacts when its role changes after the first render', async () => {
    const el = await renderListItem('<dile-list-item clickable>Item</dile-list-item>');
    el.setAttribute('role', 'option');
    await el.updateComplete;
    expect(el.shadowRoot.querySelector('.item').hasAttribute('role')).toBe(false);
    expect(el.getAttribute('tabindex')).toBe('0');

    el.setAttribute('role', 'listitem');
    await el.updateComplete;
    expect(el.shadowRoot.querySelector('.item').getAttribute('role')).toBe('button');
    expect(el.hasAttribute('tabindex')).toBe(false);
    expect(el.hasAttribute('aria-selected')).toBe(false);
  });

  it('supports value property and includes value in click event', async () => {
    const el = await renderListItem('<dile-list-item value="profile" href="/profile" clickable>Profile</dile-list-item>');
    expect(el.value).toBe('profile');

    let detail = null;
    el.addEventListener('dile-list-item-click', (e) => {
      detail = e.detail;
    });
    // Avoid navigating away from the test page
    el.shadowRoot.querySelector('.item').addEventListener('click', (e) => e.preventDefault());

    el.shadowRoot.querySelector('.item').click();
    expect(detail).toEqual({ item: el, value: 'profile', href: '/profile', selected: false });
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
    el.addEventListener('dile-list-item-click', () => { itemClicked = true; });

    const button = el.querySelector('#btn-action');
    button.addEventListener('click', () => { buttonClicked = true; });
    button.click();

    expect(buttonClicked).toBe(true);
    expect(itemClicked).toBe(false);
  });

  it('does not trigger list item click from interactive controls in the prefix or body', async () => {
    const el = await renderListItem(`
      <dile-list-item clickable>
        <input type="checkbox" slot="prefix" id="check">
        <span>Title <a href="#" id="link">link</a></span>
      </dile-list-item>
    `);

    let count = 0;
    el.addEventListener('dile-list-item-click', () => { count++; });

    el.querySelector('#check').click();
    const link = el.querySelector('#link');
    link.addEventListener('click', (e) => e.preventDefault());
    link.click();
    expect(count).toBe(0);

    el.querySelector('span:not([slot])').click();
    expect(count).toBe(1);
  });

  it('does not trigger the click of a parent item when a nested item is clicked', async () => {
    document.body.innerHTML = `
      <dile-list-item clickable id="parent">
        Parent
        <dile-list-item clickable id="child">Child</dile-list-item>
      </dile-list-item>
    `;
    const parent = document.getElementById('parent');
    const child = document.getElementById('child');
    await parent.updateComplete;
    await child.updateComplete;

    const received = [];
    parent.addEventListener('dile-list-item-click', (e) => received.push(e.detail.item.id));
    child.shadowRoot.querySelector('.item').click();
    expect(received).toEqual(['child']);
  });
});
