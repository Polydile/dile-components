import { describe, it, expect, afterEach } from 'vitest';
import './list.js';
import './list-item.js';

describe('dile-list', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  async function renderList(template) {
    document.body.innerHTML = template;
    const el = document.body.querySelector('dile-list');
    await el.updateComplete;
    const items = el.querySelectorAll('dile-list-item');
    for (const item of items) {
      await item.updateComplete;
    }
    return el;
  }

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
    expect(items[0].density).toBe('compact');
    expect(items[0].clickable).toBe(true);
    expect(items[0].divider).toBe('inset');
    expect(items[1].density).toBe('compact');
    expect(items[1].clickable).toBe(true);
    expect(items[1].divider).toBe('inset');
  });

  it('propagates disabled state to child items', async () => {
    const el = await renderList(`
      <dile-list disabled>
        <dile-list-item>Item 1</dile-list-item>
        <dile-list-item>Item 2</dile-list-item>
      </dile-list>
    `);

    const items = el.querySelectorAll('dile-list-item');
    expect(items[0].disabled).toBe(true);
    expect(items[1].disabled).toBe(true);
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
    expect(items[1].getAttribute('role')).toBe('option');

    let changeDetail = null;
    el.addEventListener('dile-list-change', (e) => {
      changeDetail = e.detail;
    });

    items[0].dispatchEvent(new CustomEvent('dile-list-item-click', { bubbles: true, composed: true, detail: { item: items[0], value: 'alpha' } }));
    await el.updateComplete;

    expect(el.value).toBe('alpha');
    expect(items[0].selected).toBe(true);
    expect(items[1].selected).toBe(false);
    expect(changeDetail.value).toBe('alpha');

    // Switch selection to beta
    items[1].dispatchEvent(new CustomEvent('dile-list-item-click', { bubbles: true, composed: true, detail: { item: items[1], value: 'beta' } }));
    await el.updateComplete;

    expect(el.value).toBe('beta');
    expect(items[0].selected).toBe(false);
    expect(items[1].selected).toBe(true);
    expect(changeDetail.value).toBe('beta');
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

    items[0].dispatchEvent(new CustomEvent('dile-list-item-click', { bubbles: true, composed: true, detail: { item: items[0], value: 'opt1' } }));
    items[2].dispatchEvent(new CustomEvent('dile-list-item-click', { bubbles: true, composed: true, detail: { item: items[2], value: 'opt3' } }));
    await el.updateComplete;

    expect(items[0].selected).toBe(true);
    expect(items[1].selected).toBe(false);
    expect(items[2].selected).toBe(true);
    expect(el.value).toEqual(['opt1', 'opt3']);
  });

  it('manages roving tabindex with arrow keys', async () => {
    const el = await renderList(`
      <dile-list>
        <dile-list-item value="1">First</dile-list-item>
        <dile-list-item value="2">Second</dile-list-item>
        <dile-list-item value="3" disabled>Third (Disabled)</dile-list-item>
        <dile-list-item value="4">Fourth</dile-list-item>
      </dile-list>
    `);

    const items = el.querySelectorAll('dile-list-item');
    expect(items[0].itemTabindex).toBe(0);
    expect(items[1].itemTabindex).toBe(-1);
    expect(items[2].itemTabindex).toBe(-1);
    expect(items[3].itemTabindex).toBe(-1);

    // Press ArrowDown -> moves to items[1]
    el.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
    await el.updateComplete;

    expect(items[0].itemTabindex).toBe(-1);
    expect(items[1].itemTabindex).toBe(0);

    // Press ArrowDown again -> skips disabled items[2], lands on items[3]
    el.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
    await el.updateComplete;

    expect(items[1].itemTabindex).toBe(-1);
    expect(items[3].itemTabindex).toBe(0);

    // Press Home -> lands back on items[0]
    el.dispatchEvent(new KeyboardEvent('keydown', { key: 'Home', bubbles: true }));
    await el.updateComplete;

    expect(items[0].itemTabindex).toBe(0);
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
});

