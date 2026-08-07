import { describe, it, expect, afterEach } from 'vitest';
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
});
