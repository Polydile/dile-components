import { LitElement, html, css } from 'lit';
import './dile-editor-markdown.js';
import '@dile/dile-pages/dile-pages.js';
import '@dile/dile-tabs/dile-tabs.js';

export class DileEditor extends LitElement {
  static styles = [
    css`
     * {
      box-sizing: border-box;
     }
      :host {
        display: block;
        font-family: arial;
        border: 2px solid #ddd;
        border-radius: 0.5rem;
        
        --dile-tab-text-color: #106eda;
        --dile-tab-background-color: transparent;
        --dile-tab-selected-text-color: #0f4e96;
        --dile-tab-selected-background-color: transparent;
        --dile-tab-selected-line-color: #0f4e96;
        --dile-tab-font-size: 0.7em;
        --dile-tab-padding: 8px 8px 2px 6px;
        --dile-tab-selected-line-height: 2px;
        
      }
     :host(:focus-within) {
      border: 2px solid var(--dile-editor-focus-color, #6af);
     }
      
      nav {
        display: flex;
        justify-content: flex-end;
        background-color: #f5f5f5;
        padding-right: 0.6rem;
        border-bottom: 1px solid #ddd;
        border-top-right-radius: 0.5rem;
        border-top-left-radius: 0.5rem;

      }

      .ProseMirror {
        position: relative;
        word-wrap: break-word;
        white-space: pre-wrap;
        white-space: break-spaces;
        -webkit-font-variant-ligatures: none;
        font-variant-ligatures: none;
        font-feature-settings: "liga" 0; /* the above doesn't seem to work in Edge */
        outline: none;
        padding: 0 10px;

        max-width: 100%;
        overflow: auto;
      }

      .ProseMirror p:first-child,
      .ProseMirror h1:first-child,
      .ProseMirror h2:first-child,
      .ProseMirror h3:first-child,
      .ProseMirror h4:first-child,
      .ProseMirror h5:first-child,
      .ProseMirror h6:first-child {
        margin-top: 10px;
      }
      dile-tabs {
        margin-bottom: 0.3rem;
      }
  
      textarea {
        resize: none;
        width: 100%;
        min-height: 300px;
        border: none;
        outline: none;
        padding: 0.5rem;
      }
      
    `
  ];

  static get properties() {
    return {
      value: { type: String },
    };
  }

  constructor() {
    super();
    this.value = this.innerHTML;
    console.log('this.value', this.value);
  }

  updated(changedProperties) {
    if(changedProperties.has('value') && this.isValueExternalyUpdated) {
      this.updateEditorContent(this.value);
    }
  }

  firstUpdated() {
    this.editor = this.shadowRoot.getElementById('editor');
    this.textarea = this.shadowRoot.getElementById('eltextarea');
  }

  render() {
    return html`
       <nav>
        <dile-tabs
          selected="design"
          selectorId="selector"
          attrForSelected="name"
          @dile-selected-changed=${this.tabSelectedChange}
        >
          <dile-tab name="design">Design view</dile-tab>
          <dile-tab name="markdown">Markdown</dile-tab>
        </dile-tabs>
      </nav>
      <dile-pages selected="design" selectorId="selector" attrForSelected="name">
        <section class="editor" name="design">
          <dile-editor-markdown
            id="editor"
            @dile-editor-change=${this.updateValue}
          ></dile-editor-markdown>
        </section>
        <section name="markdown">
          <textarea id="eltextarea" .value="${this.value}"></textarea>
        </section>
      </dile-pages>
    `;
  }

  updateValue(e) {
    console.log('updatevalue');
    this.value = e.detail.content;
    this.textarea.value = e.detail.content;
  }

  get editorMarkdown() {
    return this.editor.editorMarkdown;
  }

  updateEditorContent(value) {
    this.editor.updateEditorContent(value);
    this.textarea.value = value;
  }

  get isValueExternalyUpdated() {
    return this.editorMarkdown != this.value
  }

  tabSelectedChange(e) {
    if(e.detail.selected == 'design') {
      this.editor.updateEditorContent(this.textarea.value)
    }
    console.log(e.detail);
  }
}
