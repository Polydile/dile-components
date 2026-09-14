import { describe, it, expect, afterEach } from 'vitest';
import './radio-group-dialog.js';

describe('dile-radio-group-dialog', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  async function renderRadioGroupDialog(attrs = '', dialogItems = []) {
    document.body.innerHTML = `<dile-radio-group-dialog ${attrs}></dile-radio-group-dialog>`;
    const el = document.body.querySelector('dile-radio-group-dialog');
    el.dialogItems = dialogItems;
    await el.updateComplete;
    return el;
  }

  it('renders the title and description', async () => {
    const el = await renderRadioGroupDialog('title="Select Option" description="Choose one option below"');

    expect(el.shadowRoot.querySelector('.dialog-title').textContent).toBe('Select Option');
    expect(el.shadowRoot.querySelector('.dialog-description').textContent).toBe('Choose one option below');
  });

  it('renders dialog items with labels and values', async () => {
    const dialogItems = [
      { value: 'a', label: 'Option A', description: 'First option' },
      { value: 'b', label: 'Option B', description: 'Second option' },
    ];

    const el = await renderRadioGroupDialog('title="Select Option"', dialogItems);

    const items = el.shadowRoot.querySelectorAll('.radio-item-wrapper');
    expect(items.length).toBe(2);
  });

  it('updates value when an option is clicked', async () => {
    const dialogItems = [
      { value: 'a', label: 'Option A' },
      { value: 'b', label: 'Option B' },
    ];

    const el = await renderRadioGroupDialog('', dialogItems);

    const wrappers = el.shadowRoot.querySelectorAll('.radio-item-wrapper');
    wrappers[1].click();
    await el.updateComplete;

    expect(el.value).toBe('b');
  });

  it('renders items with optional description', async () => {
    const dialogItems = [
      { value: 'a', label: 'Option A', description: 'Description for A' },
      { value: 'b', label: 'Option B' },
    ];

    const el = await renderRadioGroupDialog('', dialogItems);

    const descriptions = el.shadowRoot.querySelectorAll('.item-description');
    expect(descriptions.length).toBe(1);
    expect(descriptions[0].textContent).toBe('Description for A');
  });

  it('exposes radiogroup and radio roles with the accessible name wired up', async () => {
    const el = await renderRadioGroupDialog('title="Select Option"', [
      { value: 'a', label: 'Option A' },
      { value: 'b', label: 'Option B' },
    ]);

    const group = el.shadowRoot.querySelector('.radio-items');
    expect(group.getAttribute('role')).toBe('radiogroup');
    expect(group.getAttribute('aria-labelledby')).toBe(el.shadowRoot.querySelector('.dialog-title').id);

    const wrappers = el.shadowRoot.querySelectorAll('.radio-item-wrapper');
    wrappers.forEach(wrapper => {
      expect(wrapper.getAttribute('role')).toBe('radio');
      const labelId = wrapper.getAttribute('aria-labelledby');
      expect(el.shadowRoot.getElementById(labelId).textContent.trim()).not.toBe('');
    });
  });

  it('reflects the selected item via aria-checked and keeps a single tab stop', async () => {
    const el = await renderRadioGroupDialog('', [
      { value: 'a', label: 'Option A' },
      { value: 'b', label: 'Option B' },
    ]);
    el.value = 'b';
    await el.updateComplete;

    const wrappers = el.shadowRoot.querySelectorAll('.radio-item-wrapper');
    expect(wrappers[0].getAttribute('aria-checked')).toBe('false');
    expect(wrappers[1].getAttribute('aria-checked')).toBe('true');
    expect(wrappers[0].getAttribute('tabindex')).toBe('-1');
    expect(wrappers[1].getAttribute('tabindex')).toBe('0');
  });

  it('selects an option on Space/Enter and moves selection with arrow keys', async () => {
    const el = await renderRadioGroupDialog('', [
      { value: 'a', label: 'Option A' },
      { value: 'b', label: 'Option B' },
      { value: 'c', label: 'Option C' },
    ]);

    const wrappers = el.shadowRoot.querySelectorAll('.radio-item-wrapper');
    wrappers[0].dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true, composed: true }));
    await el.updateComplete;
    expect(el.value).toBe('a');

    el.shadowRoot.querySelector('.radio-item-wrapper[aria-checked="true"]')
      .dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true, composed: true }));
    await el.updateComplete;
    expect(el.value).toBe('b');
  });

  it('marks the group and items as disabled', async () => {
    const el = await renderRadioGroupDialog('disabled', [
      { value: 'a', label: 'Option A' },
    ]);

    const group = el.shadowRoot.querySelector('.radio-items');
    expect(group.getAttribute('aria-disabled')).toBe('true');
    const wrapper = el.shadowRoot.querySelector('.radio-item-wrapper');
    expect(wrapper.getAttribute('aria-disabled')).toBe('true');
    expect(wrapper.getAttribute('tabindex')).toBe('-1');
  });
});
