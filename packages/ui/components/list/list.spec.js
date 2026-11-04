import { describe, it, expect, afterEach } from 'vitest';
import './list.js';
import './list-item.js';

describe('dile-list', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  async function renderList(template, selector = 'dile-list') {
    document.body.innerHTML = template;
    const el = document.body.querySelector(selector);
    await el.updateComplete;
    const items = document.body.querySelectorAll('dile-list-item');
    for (const item of items) {
      await item.updateComplete;
    }
    return el;
  }

  async function settle(el) {
    await el.updateComplete;
    for (const item of el.querySelectorAll('dile-list-item')) {
      await item.updateComplete;
    }
  }

  function key(target, keyName, type = 'keydown') {
    const ev = new KeyboardEvent(type, { key: keyName, bubbles: true, composed: true, cancelable: true });
    target.dispatchEvent(ev);
    return ev;
  }

  const inner = (item) => item.shadowRoot.querySelector('.item');

  it('renders default slot content and defaults to role="list"', async () => {
    const el = await renderList(`
      <dile-list>
        <dile-list-item>Item 1</dile-list-item>
        <dile-list-item>Item 2</dile-list-item>
      </dile-list>
    `);

    expect(el.getAttribute('role')).toBe('list');
    const items = el.querySelectorAll('dile-list-item');
    expect(items.length).toBe(2);
    expect(items[0].getAttribute('role')).toBe('listitem');
  });

  it('propagates density, clickable, and divider properties to child items', async () => {
    const el = await renderList(`
      <dile-list density="compact" clickable divider="inset">
        <dile-list-item>Item A</dile-list-item>
        <dile-list-item>Item B</dile-list-item>
      </dile-list>
    `);

    const items = el.querySelectorAll('dile-list-item');
    for (const item of items) {
      expect(item.density).toBe('compact');
      expect(item.clickable).toBe(true);
      expect(item.divider).toBe('inset');
    }
  });

  it('propagates a boolean divider attribute as a full divider', async () => {
    const el = await renderList(`
      <dile-list divider>
        <dile-list-item>Item A</dile-list-item>
        <dile-list-item>Item B</dile-list-item>
      </dile-list>
    `);
    const items = el.querySelectorAll('dile-list-item');
    expect(getComputedStyle(items[0]).borderBottomWidth).toBe('1px');
    // The last item never shows its divider
    expect(getComputedStyle(items[1]).borderBottomWidth).toBe('0px');
  });

  it('does not add dividers when the list does not define them', async () => {
    const el = await renderList(`
      <dile-list>
        <dile-list-item>Item A</dile-list-item>
        <dile-list-item>Item B</dile-list-item>
      </dile-list>
    `);
    const items = el.querySelectorAll('dile-list-item');
    expect(getComputedStyle(items[0]).borderBottomWidth).toBe('0px');
  });

  it('keeps presentational values defined on the item itself', async () => {
    const el = await renderList(`
      <dile-list density="compact" divider="full">
        <dile-list-item density="spacious" divider="inset">Own values</dile-list-item>
        <dile-list-item>Inherited values</dile-list-item>
      </dile-list>
    `);
    const items = el.querySelectorAll('dile-list-item');
    expect(items[0].density).toBe('spacious');
    expect(items[0].divider).toBe('inset');
    expect(getComputedStyle(inner(items[0])).paddingTop).toBe('20px');
    expect(items[1].density).toBe('compact');
    expect(items[1].divider).toBe('full');
  });

  it('propagates and restores the disabled state of child items', async () => {
    const el = await renderList(`
      <dile-list disabled>
        <dile-list-item>Item 1</dile-list-item>
        <dile-list-item disabled>Item 2</dile-list-item>
      </dile-list>
    `);

    const items = el.querySelectorAll('dile-list-item');
    expect(items[0].disabled).toBe(true);
    expect(items[1].disabled).toBe(true);

    el.disabled = false;
    await settle(el);
    expect(items[0].disabled).toBe(false);
    // Item 2 was disabled on its own
    expect(items[1].disabled).toBe(true);
  });

  it('restores clickable and cascaded values when the list releases them', async () => {
    const el = await renderList(`
      <dile-list selection="single" density="compact">
        <dile-list-item value="a">A</dile-list-item>
      </dile-list>
    `);
    const item = el.querySelector('dile-list-item');
    expect(item.clickable).toBe(true);
    expect(item.getAttribute('role')).toBe('option');

    el.selection = 'none';
    el.density = undefined;
    await settle(el);
    expect(item.clickable).toBe(false);
    expect(item.density).toBe(undefined);
    expect(item.getAttribute('role')).toBe('listitem');
    expect(item.hasAttribute('aria-selected')).toBe(false);
  });

  it('applies cascaded properties to items added dynamically and updates the empty state', async () => {
    const el = await renderList(`
      <dile-list clickable density="compact" empty-text="Nothing here"></dile-list>
    `);
    const empty = el.shadowRoot.querySelector('.empty-container');
    expect(empty.hasAttribute('hidden')).toBe(false);

    const item = document.createElement('dile-list-item');
    item.textContent = 'New';
    el.appendChild(item);
    await new Promise((r) => setTimeout(r));
    await settle(el);

    expect(item.clickable).toBe(true);
    expect(item.density).toBe('compact');
    expect(empty.hasAttribute('hidden')).toBe(true);

    item.remove();
    await new Promise((r) => setTimeout(r));
    await el.updateComplete;
    expect(empty.hasAttribute('hidden')).toBe(false);
  });

  it('handles single selection mode with role="listbox" and role="option"', async () => {
    const el = await renderList(`
      <dile-list selection="single">
        <dile-list-item value="alpha">Alpha</dile-list-item>
        <dile-list-item value="beta">Beta</dile-list-item>
      </dile-list>
    `);

    expect(el.getAttribute('role')).toBe('listbox');
    const items = el.querySelectorAll('dile-list-item');
    expect(items[0].getAttribute('role')).toBe('option');
    expect(items[0].getAttribute('aria-selected')).toBe('false');

    let changeDetail = null;
    el.addEventListener('dile-list-change', (e) => {
      changeDetail = e.detail;
    });

    inner(items[0]).click();
    await settle(el);

    expect(el.value).toBe('alpha');
    expect(items[0].selected).toBe(true);
    expect(items[0].getAttribute('aria-selected')).toBe('true');
    expect(items[1].selected).toBe(false);
    expect(changeDetail.value).toBe('alpha');
    expect(changeDetail.selectedItem).toBe(items[0]);

    inner(items[1]).click();
    await settle(el);

    expect(el.value).toBe('beta');
    expect(items[0].selected).toBe(false);
    expect(items[1].selected).toBe(true);
    expect(changeDetail.value).toBe('beta');
  });

  it('does not dispatch dile-list-change when clicking the already selected item', async () => {
    const el = await renderList(`
      <dile-list selection="single" value="a">
        <dile-list-item value="a">A</dile-list-item>
        <dile-list-item value="b">B</dile-list-item>
      </dile-list>
    `);
    let count = 0;
    el.addEventListener('dile-list-change', () => count++);
    const items = el.querySelectorAll('dile-list-item');

    inner(items[0]).click();
    await settle(el);
    expect(count).toBe(0);

    inner(items[1]).click();
    await settle(el);
    inner(items[1]).click();
    await settle(el);
    expect(count).toBe(1);
  });

  it('selects with Enter and Space on the focused option', async () => {
    const el = await renderList(`
      <dile-list selection="single">
        <dile-list-item value="a">A</dile-list-item>
        <dile-list-item value="b">B</dile-list-item>
      </dile-list>
    `);
    const items = el.querySelectorAll('dile-list-item');

    key(items[1], 'Enter');
    await settle(el);
    expect(el.value).toBe('b');

    key(items[0], ' ');
    key(items[0], ' ', 'keyup');
    await settle(el);
    expect(el.value).toBe('a');
  });

  it('selects item when setting value programmatically in single selection', async () => {
    const el = await renderList(`
      <dile-list selection="single" value="two">
        <dile-list-item value="one">One</dile-list-item>
        <dile-list-item value="two">Two</dile-list-item>
      </dile-list>
    `);

    const items = el.querySelectorAll('dile-list-item');
    expect(items[0].selected).toBe(false);
    expect(items[1].selected).toBe(true);

    el.select('one');
    await el.updateComplete;
    expect(items[0].selected).toBe(true);
    expect(items[1].selected).toBe(false);

    el.clearSelection();
    await el.updateComplete;
    expect(items[0].selected).toBe(false);
    expect(items[1].selected).toBe(false);
  });

  it('handles multiple selection mode with aria-multiselectable', async () => {
    const el = await renderList(`
      <dile-list selection="multiple">
        <dile-list-item value="opt1">Option 1</dile-list-item>
        <dile-list-item value="opt2">Option 2</dile-list-item>
        <dile-list-item value="opt3">Option 3</dile-list-item>
      </dile-list>
    `);

    expect(el.getAttribute('aria-multiselectable')).toBe('true');
    const items = el.querySelectorAll('dile-list-item');

    inner(items[0]).click();
    inner(items[2]).click();
    await settle(el);

    expect(items[0].selected).toBe(true);
    expect(items[1].selected).toBe(false);
    expect(items[2].selected).toBe(true);
    expect(el.value).toEqual(['opt1', 'opt3']);
  });

  it('accepts multiple values as a JSON array or a comma separated attribute', async () => {
    let el = await renderList(`
      <dile-list selection="multiple" value='["a", "c"]'>
        <dile-list-item value="a">A</dile-list-item>
        <dile-list-item value="b">B</dile-list-item>
        <dile-list-item value="c">C</dile-list-item>
      </dile-list>
    `);
    let items = el.querySelectorAll('dile-list-item');
    expect([...items].map((i) => i.selected)).toEqual([true, false, true]);

    el = await renderList(`
      <dile-list selection="multiple" value="a, b">
        <dile-list-item value="a">A</dile-list-item>
        <dile-list-item value="b">B</dile-list-item>
        <dile-list-item value="c">C</dile-list-item>
      </dile-list>
    `);
    items = el.querySelectorAll('dile-list-item');
    expect([...items].map((i) => i.selected)).toEqual([true, true, false]);
  });

  it('manages roving tabindex and real focus with arrow keys', async () => {
    const el = await renderList(`
      <dile-list clickable>
        <dile-list-item value="1">First</dile-list-item>
        <dile-list-item value="2">Second</dile-list-item>
        <dile-list-item value="3" disabled>Third (Disabled)</dile-list-item>
        <dile-list-item value="4">Fourth</dile-list-item>
      </dile-list>
    `);

    const items = el.querySelectorAll('dile-list-item');
    const tabindexes = () => [...items].map((i) => inner(i).getAttribute('tabindex'));
    expect(tabindexes()).toEqual(['0', '-1', '-1', '-1']);

    items[0].focus();
    key(inner(items[0]), 'ArrowDown');
    await settle(el);
    expect(tabindexes()).toEqual(['-1', '0', '-1', '-1']);
    expect(items[1].shadowRoot.activeElement).toBe(inner(items[1]));

    // Skips the disabled item
    key(inner(items[1]), 'ArrowDown');
    await settle(el);
    expect(tabindexes()).toEqual(['-1', '-1', '-1', '0']);
    expect(items[3].shadowRoot.activeElement).toBe(inner(items[3]));

    key(inner(items[3]), 'Home');
    await settle(el);
    expect(tabindexes()).toEqual(['0', '-1', '-1', '-1']);

    key(inner(items[0]), 'End');
    await settle(el);
    expect(tabindexes()).toEqual(['-1', '-1', '-1', '0']);
  });

  it('moves real focus between options in a listbox and supports select-on-focus', async () => {
    const el = await renderList(`
      <dile-list selection="single" select-on-focus>
        <dile-list-item value="a">A</dile-list-item>
        <dile-list-item value="b">B</dile-list-item>
      </dile-list>
    `);
    const items = el.querySelectorAll('dile-list-item');
    expect(items[0].getAttribute('tabindex')).toBe('0');
    expect(items[1].getAttribute('tabindex')).toBe('-1');

    items[0].focus();
    key(items[0], 'ArrowDown');
    await settle(el);
    expect(document.activeElement).toBe(items[1]);
    expect(el.value).toBe('b');
    expect(items[1].getAttribute('aria-selected')).toBe('true');
  });

  it('does not intercept arrow keys when items are not interactive', async () => {
    const el = await renderList(`
      <dile-list>
        <dile-list-item>A</dile-list-item>
        <dile-list-item>B</dile-list-item>
      </dile-list>
    `);
    const ev = key(inner(el.querySelector('dile-list-item')), 'ArrowDown');
    expect(ev.defaultPrevented).toBe(false);
  });

  it('does not intercept navigation keys pressed on controls inside items', async () => {
    const el = await renderList(`
      <dile-list selection="single">
        <dile-list-item value="a">A <input slot="suffix" id="field"></dile-list-item>
        <dile-list-item value="b">B</dile-list-item>
      </dile-list>
    `);
    const field = el.querySelector('#field');
    expect(key(field, 'Home').defaultPrevented).toBe(false);
    expect(key(field, 'ArrowDown').defaultPrevented).toBe(false);
  });

  it('allows disabling keyboard navigation with navigable="false"', async () => {
    const el = await renderList(`
      <dile-list clickable navigable="false">
        <dile-list-item>A</dile-list-item>
        <dile-list-item>B</dile-list-item>
      </dile-list>
    `);
    expect(el.navigable).toBe(false);
    const items = el.querySelectorAll('dile-list-item');
    expect(inner(items[0]).getAttribute('tabindex')).toBe('0');
    expect(inner(items[1]).getAttribute('tabindex')).toBe('0');
    expect(key(inner(items[0]), 'ArrowDown').defaultPrevented).toBe(false);

    el.navigable = true;
    await settle(el);
    expect(inner(items[1]).getAttribute('tabindex')).toBe('-1');
  });

  it('only manages its direct child items, ignoring nested lists', async () => {
    const el = await renderList(`
      <dile-list id="outer" selection="single">
        <dile-list-item value="a">
          A
          <dile-list id="inner" selection="single">
            <dile-list-item value="x">X</dile-list-item>
          </dile-list>
        </dile-list-item>
      </dile-list>
    `, '#outer');
    const innerList = el.querySelector('#inner');
    await innerList.updateComplete;
    const nestedItem = innerList.querySelector('dile-list-item');

    expect(el.getItems().length).toBe(1);

    inner(nestedItem).click();
    await settle(el);
    expect(innerList.value).toBe('x');
    expect(el.value).toBe(undefined);
  });

  it('shows empty state when list has no items', async () => {
    const el = await renderList(`
      <dile-list empty-text="No records found">
      </dile-list>
    `);

    const emptyContainer = el.shadowRoot.querySelector('.empty-container');
    expect(emptyContainer.hasAttribute('hidden')).toBe(false);
    expect(emptyContainer.textContent).toContain('No records found');
  });

  it('falls back to a default empty text', async () => {
    const el = await renderList('<dile-list></dile-list>');
    expect(el.shadowRoot.querySelector('.empty-container').textContent).toContain('No items available');
  });

  it('hides empty state when items are present', async () => {
    const el = await renderList(`
      <dile-list empty-text="No records found">
        <dile-list-item>Item</dile-list-item>
      </dile-list>
    `);

    const emptyContainer = el.shadowRoot.querySelector('.empty-container');
    expect(emptyContainer.hasAttribute('hidden')).toBe(true);
  });

  it('displays loading overlay and sets aria-busy when loading is true', async () => {
    const el = await renderList(`
      <dile-list loading>
        <dile-list-item>Item</dile-list-item>
      </dile-list>
    `);

    expect(el.getAttribute('aria-busy')).toBe('true');
    const loadingOverlay = el.shadowRoot.querySelector('.loading-overlay');
    expect(loadingOverlay.hasAttribute('hidden')).toBe(false);
    expect(loadingOverlay.querySelector('dile-spinner')).toBeTruthy();
  });

  it('shows the loading indicator when the list is empty', async () => {
    const el = await renderList('<dile-list loading></dile-list>');
    const loadingOverlay = el.shadowRoot.querySelector('.loading-overlay');
    expect(loadingOverlay.getBoundingClientRect().height).toBeGreaterThan(20);
    expect(el.getBoundingClientRect().height).toBeGreaterThan(20);
    expect(el.shadowRoot.querySelector('.empty-container').hasAttribute('hidden')).toBe(true);
  });
});
