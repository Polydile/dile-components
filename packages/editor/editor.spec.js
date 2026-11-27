import { describe, it, expect, afterEach, vi } from 'vitest';
import { userEvent } from 'vitest/browser';
import './editor.js';

describe('dile-editor', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  function waitFor(fn, timeout = 5000) {
    return new Promise((resolve, reject) => {
      const start = Date.now();
      const check = () => {
        const result = fn();
        if (result) return resolve(result);
        if (Date.now() - start > timeout) return reject(new Error('waitFor timed out'));
        setTimeout(check, 20);
      };
      check();
    });
  }

  async function renderEditor(html = '<dile-editor></dile-editor>') {
    document.body.innerHTML = html;
    const el = document.body.querySelector('dile-editor');
    await el.updateComplete;
    await waitFor(() => el.shadowRoot.querySelector('dile-editor-markdown .ProseMirror'));
    return el;
  }

  it('renders the view tabs and the markdown editor with its toolbar', async () => {
    const el = await renderEditor();

    expect(el.shadowRoot.querySelector('dile-tabs')).toBeTruthy();
    expect(el.shadowRoot.querySelector('dile-pages')).toBeTruthy();

    const markdownEditor = el.shadowRoot.querySelector('dile-editor-markdown');
    expect(markdownEditor.querySelector('dile-editor-toolbar')).toBeTruthy();

    const content = markdownEditor.querySelector('.ProseMirror');
    expect(content.getAttribute('contenteditable')).toBe('true');
  });

  it('renders a label when the label property is set', async () => {
    const el = await renderEditor('<dile-editor label="My editor"></dile-editor>');
    expect(el.shadowRoot.querySelector('label').textContent).toBe('My editor');
  });

  it('reflects typed content back through the value property', async () => {
    const el = await renderEditor();

    el.updateValue({ detail: { content: 'Hello world' } });
    await el.updateComplete;

    expect(el.value).toBe('Hello world');
  });

  it('loads an external value into the ProseMirror document and the textarea', async () => {
    const el = await renderEditor();

    el.value = '## Title\n\n* item';
    await el.updateComplete;

    const markdownEditor = el.shadowRoot.querySelector('dile-editor-markdown');
    expect(markdownEditor.editorMarkdown).toBe('## Title\n\n* item');
    expect(markdownEditor.querySelector('.ProseMirror h2').textContent).toBe('Title');
    expect(el.shadowRoot.getElementById('eltextarea').value).toBe('## Title\n\n* item');
  });

  it('updates value, textarea and form value when the document changes', async () => {
    document.body.innerHTML = '<form><dile-editor name="body"></dile-editor></form>';
    const el = document.body.querySelector('dile-editor');
    await el.updateComplete;
    await waitFor(() => el.shadowRoot.querySelector('dile-editor-markdown .ProseMirror'));
    const view = el.shadowRoot.querySelector('dile-editor-markdown').view;

    view.dispatch(view.state.tr.insertText('Typed text'));
    await el.updateComplete;

    expect(el.value).toBe('Typed text');
    expect(el.shadowRoot.getElementById('eltextarea').value).toBe('Typed text');
    expect(new FormData(document.querySelector('form')).get('body')).toBe('Typed text');
  });

  it('parses the textarea markdown when switching back to the design view', async () => {
    const el = await renderEditor();
    const tabs = el.shadowRoot.querySelectorAll('dile-tab');
    const textarea = el.shadowRoot.getElementById('eltextarea');

    await userEvent.click(tabs[1]);
    await el.updateComplete;
    expect(el.viewSelected).toBe('markdown');

    textarea.value = '**from textarea**';
    textarea.dispatchEvent(new Event('input'));
    await el.updateComplete;

    await userEvent.click(tabs[0]);
    await el.updateComplete;

    const markdownEditor = el.shadowRoot.querySelector('dile-editor-markdown');
    expect(el.viewSelected).toBe('design');
    expect(markdownEditor.querySelector('.ProseMirror strong').textContent).toBe('from textarea');
    expect(el.value).toBe('**from textarea**');
  });

  it('hides toolbar items listed in disableToolbarItems', async () => {
    const el = await renderEditor('<dile-editor disableToolbarItems="bold|italic"></dile-editor>');
    const toolbar = el.shadowRoot.querySelector('dile-editor-toolbar');
    await toolbar.updateComplete;
    const names = [...toolbar.shadowRoot.querySelectorAll('dile-editor-toolbar-item')].map(i => i.item.commandName);

    expect(names).not.toContain('bold');
    expect(names).not.toContain('italic');
    expect(names).toContain('code_mark');
  });

  it('applies only the latest external value when initialization finishes', async () => {
    const el = await renderEditor();
    const calls = [];

    el.editor = { updateEditorContent: (value) => calls.push(value) };
    el.textarea = { value: '' };
    el.initialized = false;

    el.updateEditorContent('first draft');
    el.updateEditorContent('final draft');
    el.setInitialized();

    expect(calls).toEqual(['final draft']);
    expect(el.textarea.value).toBe('final draft');
  });
});
