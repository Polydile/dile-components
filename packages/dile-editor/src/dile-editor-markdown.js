import { LitElement, html, css } from 'lit';
import {
  schema,
  defaultMarkdownParser,
  defaultMarkdownSerializer,
} from "prosemirror-markdown";
import { EditorState, Plugin } from "prosemirror-state";
import { EditorView } from "prosemirror-view";
import { keymap } from "prosemirror-keymap";
import { baseKeymap } from "prosemirror-commands";
import { history } from "prosemirror-history";
import { buildKeymap } from "prosemirror-example-setup";
import './dile-editor-toolbar.js';
import { menuPlugin } from './prosemirror/menu-plugin.js';

export class DileEditorMarkdown extends LitElement {
  
  static styles = [
    css`
      :host {
        display: block;
      }
    `
  ];

  constructor() {
    super();
    const editorElement = this;
    const dispatchChange = this.dispatchChange.bind(this);

    const state = this.createState('');
    const view = new EditorView(editorElement, {
      state,
      dispatchTransaction(transaction) {
        let newState = view.state.apply(transaction)
        view.updateState(newState);
        dispatchChange(newState);
      }
    })
    this.view = view;
  }

  render() {
    return html`
      <slot></slot>
    `;
  }

  get editorMarkdown() {
    return defaultMarkdownSerializer.serialize(this.view.state.doc);
  }

  createState(content) {
    return EditorState.create({
      doc: defaultMarkdownParser.parse(content),
      plugins: [
        history(),
        keymap(buildKeymap(schema)),
        keymap(baseKeymap),
        menuPlugin,
      ]
    })
  }

  updateEditorContent(content) {
    this.view.updateState(this.createState(content));
  }

  dispatchChange(newState) {
    this.dispatchEvent(new CustomEvent('dile-editor-change', {
      detail: {
        content: defaultMarkdownSerializer.serialize(newState.doc)
      }
    }));
  }

  get markdownCode() {
    return defaultMarkdownSerializer.serialize(this.view.state.doc);
  }
}
customElements.define('dile-editor-markdown', DileEditorMarkdown);
