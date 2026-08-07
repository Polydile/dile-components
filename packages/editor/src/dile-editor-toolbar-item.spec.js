import { describe, it, expect, afterEach } from 'vitest';
import './dile-editor-toolbar-item.js';

describe('dile-editor-toolbar-item', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  async function renderItem(item, active = false) {
    document.body.innerHTML = '<dile-editor-toolbar-item></dile-editor-toolbar-item>';
    const el = document.body.querySelector('dile-editor-toolbar-item');
    el.item = item;
    el.active = active;
    await el.updateComplete;
    return el;
  }

  it('renders the icon for the given item', async () => {
    const el = await renderItem({ icon: '<svg></svg>', commandName: 'bold' });
    expect(el.shadowRoot.querySelector('dile-icon')).toBeTruthy();
  });

  it('applies the active class when active is true', async () => {
    const el = await renderItem({ icon: '<svg></svg>', commandName: 'bold' }, true);
    expect(el.shadowRoot.querySelector('dile-icon').classList.contains('active')).toBe(true);
  });

  it('dispatches dile-toolbar-command when active and clicked', async () => {
    const el = await renderItem({ icon: '<svg></svg>', commandName: 'bold' }, true);
    let detail = null;
    el.addEventListener('dile-toolbar-command', (e) => { detail = e.detail; });

    el.shadowRoot.querySelector('dile-icon').click();

    expect(detail.item.commandName).toBe('bold');
  });
});
