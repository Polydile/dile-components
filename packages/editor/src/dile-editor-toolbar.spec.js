import { describe, it, expect, afterEach } from 'vitest';
import './dile-editor-toolbar.js';
import { defaultToolbarConfig } from './defaultToolbarConfig.js';

describe('dile-editor-toolbar', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  function fakeEditorView() {
    return {
      state: {},
      dispatch: () => {},
      focus: () => {},
    };
  }

  async function renderToolbar() {
    document.body.innerHTML = '<dile-editor-toolbar></dile-editor-toolbar>';
    const el = document.body.querySelector('dile-editor-toolbar');
    el.menuConfig = { ...defaultToolbarConfig };
    el.editorView = fakeEditorView();
    await el.updateComplete;
    return el;
  }

  it('renders a toolbar item for each enabled mark command', async () => {
    const el = await renderToolbar();
    expect(el.shadowRoot.querySelectorAll('dile-editor-toolbar-item').length).toBeGreaterThan(0);
  });

  it('renders the block type select', async () => {
    const el = await renderToolbar();
    expect(el.shadowRoot.getElementById('blockselect')).toBeTruthy();
  });

  it('does not render an item for a command disabled in menuConfig', async () => {
    document.body.innerHTML = '<dile-editor-toolbar></dile-editor-toolbar>';
    const el = document.body.querySelector('dile-editor-toolbar');
    el.menuConfig = { ...defaultToolbarConfig, bold: false };
    el.editorView = fakeEditorView();
    await el.updateComplete;

    const items = [...el.shadowRoot.querySelectorAll('dile-editor-toolbar-item')];
    expect(items.some(item => item.item.commandName === 'bold')).toBe(false);
  });
});
