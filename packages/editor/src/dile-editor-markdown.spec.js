import { describe, it, expect, afterEach } from 'vitest';
import { userEvent } from 'vitest/browser';
import { TextSelection, NodeSelection } from 'prosemirror-state';
import { schema } from 'prosemirror-markdown';
import './dile-editor-markdown.js';
import { defaultToolbarConfig } from './defaultToolbarConfig.js';

const isMac = /Mac|iP(hone|[oa]d)/.test(navigator.platform);
const mod = isMac ? 'Meta' : 'Control';

describe('dile-editor-markdown', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  function waitForEvent(el, eventName) {
    return new Promise((resolve) => {
      el.addEventListener(eventName, (e) => resolve(e), { once: true });
    });
  }

  async function renderMarkdownEditor(menuConfig = {}) {
    document.body.innerHTML = '<dile-editor-markdown></dile-editor-markdown>';
    const el = document.body.querySelector('dile-editor-markdown');
    el._menuConfig = { ...defaultToolbarConfig, ...menuConfig };
    el.additionalCommands = {};
    await waitForEvent(el, 'dile-editor-markdown-initialized');
    await el.updateComplete;
    await toolbarOf(el).updateComplete;
    return el;
  }

  function toolbarOf(el) {
    return el.querySelector('dile-editor-toolbar');
  }

  function findTextPos(view, text) {
    let from = null;
    view.state.doc.descendants((node, pos) => {
      if (from === null && node.isText && node.text.includes(text)) {
        from = pos + node.text.indexOf(text);
      }
    });
    if (from === null) throw new Error(`"${text}" not found`);
    return from;
  }

  function selectText(view, text) {
    const from = findTextPos(view, text);
    view.dispatch(view.state.tr.setSelection(TextSelection.create(view.state.doc, from, from + text.length)));
  }

  function placeCursor(view, text, offset = 0) {
    const pos = findTextPos(view, text) + offset;
    view.dispatch(view.state.tr.setSelection(TextSelection.create(view.state.doc, pos)));
  }

  function toolbarItem(el, commandName) {
    return [...toolbarOf(el).shadowRoot.querySelectorAll('dile-editor-toolbar-item')]
      .find(item => item.item.commandName === commandName);
  }

  async function clickToolbarItem(el, commandName) {
    const item = toolbarItem(el, commandName);
    item.shadowRoot.querySelector('dile-icon').click();
    await toolbarOf(el).updateComplete;
  }

  async function settle(el) {
    const toolbar = toolbarOf(el);
    await toolbar.updateComplete;
    await Promise.all([...toolbar.shadowRoot.querySelectorAll('dile-editor-toolbar-item')].map(i => i.updateComplete));
  }

  describe('rendering and content', () => {
    it('renders a contenteditable ProseMirror surface and a toolbar', async () => {
      const el = await renderMarkdownEditor();
      const content = el.querySelector('.ProseMirror');
      expect(content).toBeTruthy();
      expect(content.getAttribute('contenteditable')).toBe('true');
      expect(el.querySelector('dile-editor-toolbar')).toBeTruthy();
    });

    it('places the toolbar right before the ProseMirror surface', async () => {
      const el = await renderMarkdownEditor();
      expect(toolbarOf(el).nextElementSibling).toBe(el.view.dom);
    });

    it('serializes empty content as an empty string', async () => {
      const el = await renderMarkdownEditor();
      expect(el.editorMarkdown).toBe('');
    });

    it('updates the ProseMirror document when content is set', async () => {
      const el = await renderMarkdownEditor();
      el.updateEditorContent('Hello world');
      expect(el.editorMarkdown).toBe('Hello world');
      expect(el.markdownCode).toBe('Hello world');
    });

    it('renders markdown as the expected DOM', async () => {
      const el = await renderMarkdownEditor();
      el.updateEditorContent('## Title\n\nSome **bold** and *em* [link](https://example.com)\n\n* item\n\n```js\ncode\n```\n\n![alt](https://example.com/a.png)');
      const dom = el.view.dom;

      expect(dom.querySelector('h2').textContent).toBe('Title');
      expect(dom.querySelector('strong').textContent).toBe('bold');
      expect(dom.querySelector('em').textContent).toBe('em');
      expect(dom.querySelector('a').getAttribute('href')).toBe('https://example.com');
      expect(dom.querySelector('ul > li').textContent).toBe('item');
      expect(dom.querySelector('pre code').textContent).toBe('code');
      // ProseMirror may add an <img class="ProseMirror-separator"> hack node, so look for the src.
      expect(dom.querySelector('img[src]').getAttribute('src')).toBe('https://example.com/a.png');
    });

    it('keeps a single toolbar when content is replaced several times', async () => {
      const el = await renderMarkdownEditor();
      el.updateEditorContent('one');
      el.updateEditorContent('two');
      expect(el.querySelectorAll('dile-editor-toolbar').length).toBe(1);
    });
  });

  describe('change events', () => {
    it('dispatches dile-editor-change with the serialized markdown on every transaction', async () => {
      const el = await renderMarkdownEditor();
      const changed = waitForEvent(el, 'dile-editor-change');

      el.view.dispatch(el.view.state.tr.insertText('Hello'));

      const e = await changed;
      expect(e.detail.content).toBe('Hello');
    });

    it('does not dispatch dile-editor-change when content is set programmatically', async () => {
      const el = await renderMarkdownEditor();
      let fired = false;
      el.addEventListener('dile-editor-change', () => { fired = true; });

      el.updateEditorContent('external');

      expect(fired).toBe(false);
    });
  });

  describe('user input', () => {
    it('reflects text typed by the user', async () => {
      const el = await renderMarkdownEditor();
      let lastContent;
      el.addEventListener('dile-editor-change', (e) => { lastContent = e.detail.content; });

      el.focus();
      await userEvent.keyboard('Hello world');

      expect(el.editorMarkdown).toBe('Hello world');
      expect(lastContent).toBe('Hello world');
    });

    it('creates a new paragraph with Enter', async () => {
      const el = await renderMarkdownEditor();
      el.focus();
      await userEvent.keyboard('one{Enter}two');
      expect(el.editorMarkdown).toBe('one\n\ntwo');
    });

    it('toggles bold with Mod-b', async () => {
      const el = await renderMarkdownEditor();
      el.updateEditorContent('hello world');
      el.focus();
      selectText(el.view, 'world');

      await userEvent.keyboard(`{${mod}>}b{/${mod}}`);

      expect(el.editorMarkdown).toBe('hello **world**');
    });

    it('toggles italic with Mod-i', async () => {
      const el = await renderMarkdownEditor();
      el.updateEditorContent('hello world');
      el.focus();
      selectText(el.view, 'hello');

      await userEvent.keyboard(`{${mod}>}i{/${mod}}`);

      expect(el.editorMarkdown).toBe('*hello* world');
    });

    it('undoes and redoes typing with Mod-z / Shift-Mod-z', async () => {
      const el = await renderMarkdownEditor();
      el.focus();
      await userEvent.keyboard('typed');
      expect(el.editorMarkdown).toBe('typed');

      await userEvent.keyboard(`{${mod}>}z{/${mod}}`);
      expect(el.editorMarkdown).toBe('');

      await userEvent.keyboard(`{${mod}>}{Shift>}z{/Shift}{/${mod}}`);
      expect(el.editorMarkdown).toBe('typed');
    });

    it('splits a list item with Enter', async () => {
      const el = await renderMarkdownEditor();
      el.updateEditorContent('* one');
      el.focus();
      placeCursor(el.view, 'one', 3);

      await userEvent.keyboard('{Enter}two');

      expect(el.editorMarkdown).toBe('* one\n* two');
    });
  });

  describe('toolbar commands', () => {
    it('applies bold, italic and inline code from the toolbar', async () => {
      const el = await renderMarkdownEditor();
      el.updateEditorContent('one two three');

      selectText(el.view, 'one');
      await clickToolbarItem(el, 'bold');
      selectText(el.view, 'two');
      await clickToolbarItem(el, 'italic');
      selectText(el.view, 'three');
      await clickToolbarItem(el, 'code_mark');

      expect(el.editorMarkdown).toBe('**one** *two* `three`');
    });

    it('wraps in lists and lifts from the toolbar', async () => {
      const el = await renderMarkdownEditor();
      el.updateEditorContent('item');
      placeCursor(el.view, 'item');

      await clickToolbarItem(el, 'unordered_list');
      expect(el.editorMarkdown).toBe('* item');

      await clickToolbarItem(el, 'lift');
      expect(el.editorMarkdown).toBe('item');

      await clickToolbarItem(el, 'ordered_list');
      expect(el.editorMarkdown).toBe('1. item');
    });

    it('undoes and redoes from the toolbar', async () => {
      const el = await renderMarkdownEditor();
      el.updateEditorContent('hello');
      selectText(el.view, 'hello');
      await clickToolbarItem(el, 'bold');
      await settle(el);
      expect(el.editorMarkdown).toBe('**hello**');

      await clickToolbarItem(el, 'undo');
      await settle(el);
      expect(el.editorMarkdown).toBe('hello');

      await clickToolbarItem(el, 'redo');
      expect(el.editorMarkdown).toBe('**hello**');
    });

    it('changes the block type through the block select', async () => {
      const el = await renderMarkdownEditor();
      el.updateEditorContent('Title');
      placeCursor(el.view, 'Title');
      const select = toolbarOf(el).blockselect;

      for (const [value, expected] of [['h1', '# Title'], ['h3', '### Title'], ['code', '```\nTitle\n```'], ['paragraph', 'Title']]) {
        select.dispatchEvent(new CustomEvent('element-changed', { detail: { value } }));
        expect(el.editorMarkdown).toBe(expected);
      }
    });

    it('syncs the block select with the block at the cursor', async () => {
      const el = await renderMarkdownEditor();
      el.updateEditorContent('## Heading\n\nParagraph');
      const select = toolbarOf(el).blockselect;

      placeCursor(el.view, 'Heading');
      await select.updateComplete;
      expect(select.value).toBe('h2');

      placeCursor(el.view, 'Paragraph');
      await select.updateComplete;
      expect(select.value).toBe('paragraph');
    });

    it('adds a link when the link dialog is accepted', async () => {
      const el = await renderMarkdownEditor();
      el.updateEditorContent('go here');
      selectText(el.view, 'here');
      await settle(el);

      const linkItem = toolbarItem(el, 'link');
      linkItem.shadowRoot.getElementById('linkDialog').dispatchEvent(new CustomEvent('accept-link-dialog', {
        bubbles: true,
        composed: true,
        detail: { url: 'https://example.com', title: 'Example' },
      }));

      expect(el.editorMarkdown).toBe('go [here](https://example.com "Example")');
    });

    it('inserts an image when the image dialog is accepted', async () => {
      const el = await renderMarkdownEditor();
      el.updateEditorContent('pic here');
      placeCursor(el.view, 'pic here', 4);
      await settle(el);

      const imageItem = toolbarItem(el, 'image');
      imageItem.shadowRoot.getElementById('imageDialog').dispatchEvent(new CustomEvent('accept-image-dialog', {
        bubbles: true,
        composed: true,
        detail: { src: 'https://example.com/a.png', alt: 'An image' },
      }));

      expect(el.editorMarkdown).toBe('pic ![An image](https://example.com/a.png)here');
    });

    it('prefills the image dialog when an image node is selected', async () => {
      const el = await renderMarkdownEditor();
      el.updateEditorContent('![alt text](https://example.com/a.png)');
      let imagePos;
      el.view.state.doc.descendants((node, pos) => {
        if (node.type === schema.nodes.image) imagePos = pos;
      });
      el.view.dispatch(el.view.state.tr.setSelection(NodeSelection.create(el.view.state.doc, imagePos)));
      await settle(el);

      const dialog = toolbarItem(el, 'image').shadowRoot.getElementById('imageDialog');
      dialog.open(el.view);

      expect(dialog.srcInput.value).toBe('https://example.com/a.png');
      expect(dialog.altInput.value).toBe('alt text');
      dialog.close();
    });

    it('removes a link with the remove link item', async () => {
      const el = await renderMarkdownEditor();
      el.updateEditorContent('go [here](https://example.com)');
      placeCursor(el.view, 'here', 2);
      selectText(el.view, 'here');
      await settle(el);

      await clickToolbarItem(el, 'removeLink');

      expect(el.editorMarkdown).toBe('go here');
    });
  });

  describe('toolbar state', () => {
    it('enables undo only after a change', async () => {
      const el = await renderMarkdownEditor();
      el.view.dispatch(el.view.state.tr.setSelection(TextSelection.atStart(el.view.state.doc)));
      await settle(el);
      expect(toolbarItem(el, 'undo').active).toBe(false);

      el.view.dispatch(el.view.state.tr.insertText('x'));
      await settle(el);
      expect(toolbarItem(el, 'undo').active).toBe(true);
    });

    it('enables the link item only with a non empty selection', async () => {
      const el = await renderMarkdownEditor();
      el.updateEditorContent('some text');

      placeCursor(el.view, 'text');
      await settle(el);
      expect(toolbarItem(el, 'link').active).toBe(false);

      selectText(el.view, 'text');
      await settle(el);
      expect(toolbarItem(el, 'link').active).toBe(true);
    });

    it('swaps the link item for the remove link item inside a link', async () => {
      const el = await renderMarkdownEditor();
      el.updateEditorContent('plain [linked](https://example.com)');

      placeCursor(el.view, 'plain', 2);
      await settle(el);
      expect(toolbarItem(el, 'link')).toBeTruthy();
      expect(toolbarItem(el, 'removeLink')).toBeFalsy();

      placeCursor(el.view, 'linked', 2);
      await settle(el);
      expect(toolbarItem(el, 'link')).toBeFalsy();
      expect(toolbarItem(el, 'removeLink')).toBeTruthy();
    });

    it('marks block-type-only commands as inactive inside a code block', async () => {
      const el = await renderMarkdownEditor();
      el.updateEditorContent('```\ncode\n```');
      placeCursor(el.view, 'code', 1);
      await settle(el);

      expect(toolbarItem(el, 'bold').active).toBe(false);
      expect(toolbarItem(el, 'code_mark').active).toBe(false);
    });
  });
});
