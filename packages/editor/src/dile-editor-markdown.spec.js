import { describe, it, expect, afterEach } from 'vitest';
import './dile-editor-markdown.js';
import { defaultToolbarConfig } from './defaultToolbarConfig.js';

describe('dile-editor-markdown', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  function waitForEvent(el, eventName) {
    return new Promise((resolve) => {
      el.addEventListener(eventName, (e) => resolve(e), { once: true });
    });
  }

  async function renderMarkdownEditor() {
    document.body.innerHTML = '<dile-editor-markdown></dile-editor-markdown>';
    const el = document.body.querySelector('dile-editor-markdown');
    el._menuConfig = { ...defaultToolbarConfig };
    el.additionalCommands = {};
    await waitForEvent(el, 'dile-editor-markdown-initialized');
    await el.updateComplete;
    return el;
  }

  it('renders a contenteditable ProseMirror surface and a toolbar', async () => {
    const el = await renderMarkdownEditor();
    const content = el.querySelector('.ProseMirror');
    expect(content).toBeTruthy();
    expect(content.getAttribute('contenteditable')).toBe('true');
    expect(el.querySelector('dile-editor-toolbar')).toBeTruthy();
  });

  it('serializes empty content as an empty string', async () => {
    const el = await renderMarkdownEditor();
    expect(el.editorMarkdown).toBe('');
  });

  it('updates the ProseMirror document when content is set', async () => {
    const el = await renderMarkdownEditor();
    el.updateEditorContent('Hello world');
    expect(el.editorMarkdown).toBe('Hello world');
  });
});
