import { describe, it, expect, afterEach } from 'vitest';
import { html } from 'lit';
import { CrudConfigBuilder } from '../../lib/CrudConfigBuilder.js';
import { DileCrudItemActions } from './src/DileCrudItemActions.js';
import './crud-item-actions.js';

describe('dile-crud-item-actions', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  const sampleItem = { id: 10, name: 'Sample Item', deleted_at: null };
  const deletedItem = { id: 20, name: 'Deleted Item', deleted_at: '2026-01-01' };

  it('renders edit and delete buttons by default', async () => {
    const el = document.createElement('dile-crud-item-actions');
    el.item = sampleItem;
    document.body.appendChild(el);
    await el.updateComplete;

    const editBtn = el.shadowRoot.querySelector('dile-button.edit');
    const deleteBtn = el.shadowRoot.querySelector('dile-button.delete');
    const restoreBtn = el.shadowRoot.querySelector('dile-button.restore');

    expect(editBtn).toBeTruthy();
    expect(deleteBtn).toBeTruthy();
    expect(restoreBtn).toBeNull();
  });

  it('renders restore button when item has deleted_at or isDeleted is true', async () => {
    const el = document.createElement('dile-crud-item-actions');
    el.item = deletedItem;
    document.body.appendChild(el);
    await el.updateComplete;

    const editBtn = el.shadowRoot.querySelector('dile-button.edit');
    const deleteBtn = el.shadowRoot.querySelector('dile-button.delete');
    const restoreBtn = el.shadowRoot.querySelector('dile-button.restore');

    expect(editBtn).toBeNull();
    expect(deleteBtn).toBeNull();
    expect(restoreBtn).toBeTruthy();
  });

  it('respects global customization and item-level callbacks from config', async () => {
    const config = new CrudConfigBuilder('https://example.test/api/items', {
      customization: {
        disableEdit: false,
        disableDelete: true,
      },
      isItemEditable: (item) => item.id !== 99,
      computeItemId: (item) => `custom-${item.id}`,
    }).getConfig();

    const el = document.createElement('dile-crud-item-actions');
    el.item = { id: 99, name: 'Not editable' };
    el.config = config;
    document.body.appendChild(el);
    await el.updateComplete;

    // Both edit (via isItemEditable returning false) and delete (via disableDelete: true) should be hidden
    expect(el.shadowRoot.querySelector('dile-button.edit')).toBeNull();
    expect(el.shadowRoot.querySelector('dile-button.delete')).toBeNull();
  });

  it('hides all actions when disableListActions is true in config', async () => {
    const config = new CrudConfigBuilder('https://example.test/api/items', {
      customization: {
        disableListActions: true,
      },
    }).getConfig();

    expect(DileCrudItemActions.hasActions(config)).toBe(false);

    const el = document.createElement('dile-crud-item-actions');
    el.item = sampleItem;
    el.config = config;
    document.body.appendChild(el);
    await el.updateComplete;

    expect(el.shadowRoot.querySelector('dile-button.edit')).toBeNull();
    expect(el.shadowRoot.querySelector('dile-button.delete')).toBeNull();
    expect(el.shadowRoot.querySelector('dile-button.restore')).toBeNull();
  });

  it('DileCrudItemActions.hasActions returns false if edit, delete and restore are all disabled', () => {
    const config = new CrudConfigBuilder('https://example.test/api/items', {
      customization: {
        disableEdit: true,
        disableDelete: true,
        disableRestore: true,
      },
    }).getConfig();

    expect(DileCrudItemActions.hasActions(config)).toBe(false);
  });

  it('dispatches crud-item-edit with computed itemId from config', async () => {
    const config = new CrudConfigBuilder('https://example.test/api/items', {
      computeItemId: (item) => `computed-${item.id}`,
    }).getConfig();

    const el = document.createElement('dile-crud-item-actions');
    el.item = sampleItem;
    el.config = config;
    document.body.appendChild(el);
    await el.updateComplete;

    let emittedDetail = null;
    el.addEventListener('crud-item-edit', (e) => {
      emittedDetail = e.detail;
    });

    const editBtn = el.shadowRoot.querySelector('dile-button.edit');
    editBtn.click();

    expect(emittedDetail).toEqual({
      item: sampleItem,
      itemId: 'computed-10',
    });
  });
});
