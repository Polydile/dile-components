import { describe, it, expect, afterEach } from 'vitest';
import './radio-group-dialog.js';

describe('dile-radio-group-dialog', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  async function renderRadioGroupDialog(html) {
    document.body.innerHTML = html;
    const el = document.body.querySelector('dile-radio-group-dialog');
    await el.updateComplete;
    return el;
  }

  it('renders the title and description', async () => {
    const el = await renderRadioGroupDialog(`
      <dile-radio-group-dialog 
        title="Select Option"
        description="Choose one option below"
        .dialogItems=${[]}
      ></dile-radio-group-dialog>
    `);

    expect(el.shadowRoot.querySelector('.dialog-title').textContent).toBe('Select Option');
    expect(el.shadowRoot.querySelector('.dialog-description').textContent).toBe('Choose one option below');
  });

  it('renders dialog items with labels and values', async () => {
    const dialogItems = [
      { value: 'a', label: 'Option A', description: 'First option' },
      { value: 'b', label: 'Option B', description: 'Second option' },
    ];
    
    const el = await renderRadioGroupDialog(`
      <dile-radio-group-dialog 
        title="Select Option"
        .dialogItems=${dialogItems}
      ></dile-radio-group-dialog>
    `);

    const items = el.shadowRoot.querySelectorAll('.radio-item-wrapper');
    expect(items.length).toBe(2);
  });

  it('updates value when an option is selected', async () => {
    const dialogItems = [
      { value: 'a', label: 'Option A' },
      { value: 'b', label: 'Option B' },
    ];
    
    const el = await renderRadioGroupDialog(`
      <dile-radio-group-dialog 
        .dialogItems=${dialogItems}
      ></dile-radio-group-dialog>
    `);

    const radios = el.shadowRoot.querySelectorAll('dile-radio');
    radios[1].dispatchEvent(new CustomEvent('dile-radio-selected', {
      bubbles: true,
      composed: true,
      detail: { value: 'b', label: 'Option B' }
    }));
    await el.updateComplete;

    expect(el.value).toBe('b');
  });

  it('renders items with optional description', async () => {
    const dialogItems = [
      { value: 'a', label: 'Option A', description: 'Description for A' },
      { value: 'b', label: 'Option B' },
    ];
    
    const el = await renderRadioGroupDialog(`
      <dile-radio-group-dialog 
        .dialogItems=${dialogItems}
      ></dile-radio-group-dialog>
    `);

    const descriptions = el.shadowRoot.querySelectorAll('.item-description');
    expect(descriptions.length).toBe(1);
    expect(descriptions[0].textContent).toBe('Description for A');
  });
});
