import { LitElement, css } from 'lit';
import {
  schema,
  defaultMarkdownParser,
  defaultMarkdownSerializer,
} from "prosemirror-markdown";
import { EditorState } from "prosemirror-state";
import { EditorView } from "prosemirror-view";
import { keymap } from "prosemirror-keymap";
import { baseKeymap } from "prosemirror-commands";
import { history } from "prosemirror-history";
import { buildKeymap } from "prosemirror-example-setup";
import './dile-editor-toolbar.js';
import { menuPlugin } from './prosemirror/menu-plugin.js';
import { DileI18nMixin } from './DileI18nMixin.js';

export class DileEditorMarkdown extends DileI18nMixin(LitElement) {
  
  static styles = [
    css`
      * {
        box-sizing: border-box;
      }
      :host {
        display: block;
      }
    `
  ];

  static get properties() {
    return {
      _menuConfig: { type: Object },
      addicionalCommands: { type: Object },
    };
  }
  constructor() {
    super();
    this._menuConfig = {}
  }

  createRenderRoot() {
    return this;
  }

  firstUpdated() {
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
    this.dispatchEvent(new CustomEvent('dile-editor-markdown-initialized'));
  }

  get editorMarkdown() {
    if(this.view) {
      return defaultMarkdownSerializer.serialize(this.view.state.doc);
    }
  }

  createState(content) {
    return EditorState.create({
      doc: defaultMarkdownParser.parse(content),
      plugins: [
        history(),
        keymap(buildKeymap(schema)),
        keymap(baseKeymap),
        menuPlugin(this._menuConfig, this.addicionalCommands, this.language),
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
