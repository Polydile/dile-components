import { LitElement, html, css } from 'lit';
import { DileEmmitChangeMixin } from '@dile/dile-form-mixin'; 
import './dile-editor-markdown.js';
import '@dile/dile-pages/dile-pages.js';
import '@dile/dile-tabs/dile-tabs.js';

export class DileEditor extends DileEmmitChangeMixin(LitElement) {
  static styles = [
    css`
     * {
      box-sizing: border-box;
     }
    :host {
        display: block;
        margin-bottom: 10px;
        font-family: arial;
              
        --dile-tab-text-color: #106eda;
        --dile-tab-background-color: transparent;
        --dile-tab-selected-text-color: #0f4e96;
        --dile-tab-selected-background-color: transparent;
        --dile-tab-selected-line-color: #0f4e96;
        --dile-tab-font-size: 0.8em;
        --dile-tab-padding: 8px 8px 2px 6px;
        --dile-tab-selected-line-height: 2px;
        
    }
    
    main {
      width: var(--dile-input-section-width, 100%);
    }

    section.for-input {
      border: 2px solid #ddd;
      border-radius: 0.5rem;
      font-size: 0.9rem;
    }
    section.for-input:focus-within {
      border: 2px solid var(--dile-editor-focus-color, #6af);
    }
    
    label {
        display: block;
        margin-bottom: var(--dile-input-label-margin-bottom, 4px);
        font-size: var(--dile-input-label-font-size, 1em);
        color: var(--dile-input-label-color, #59e);
        font-weight: var(--dile-input-label-font-weight, normal);
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

      .ProseMirror h1 {
        font-size: 1.5rem;
      }
      .ProseMirror h2 {
        font-size: 1.3rem;
      }
      .ProseMirror h3 {
        font-size: 1.1rem;
      }
      .ProseMirror h4 {
        font-size: 1rem;
        opacity: 0.7;
      }
      .ProseMirror h5 {
        font-size: 0.9rem;
        opacity: 0.6;
      }
      .ProseMirror h6 {
        font-size: 0.8rem;
        opacity: 0.5;
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
      /** Value of the editor as markown */
      value: { type: String },
      
      /** Name for this editor form field */
      name: { type: String },

      /** Label to the element */
      label: { type: String },

      viewSelected: { type: String },
    };
  }

  constructor() {
    super();
    this.value = this.innerHTML;
    this.label = '';
    this.viewSelected = 'design'
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
      <main>
        ${this.label
          ? html`<label for="textField">${this.label}</label>`
          : ""
        }
        <section class="for-input">
          <nav>
            <dile-tabs
              selected="design"
              attrForSelected="name"
              @dile-selected-changed=${this.tabSelectedChange}
            >
              <dile-tab name="design">Design view</dile-tab>
              <dile-tab name="markdown">Markdown</dile-tab>
            </dile-tabs>
          </nav>
          <dile-pages selected="${this.viewSelected}" attrForSelected="name">
            <section name="markdown">
              <textarea 
                id="eltextarea" 
                .value="${this.value}"
                @input=${this.doTextareaKeypress}
              ></textarea>
            </section>
            <section class="editor" name="design">
              <dile-editor-markdown
                id="editor"
                @dile-editor-change=${this.updateValue}
              ></dile-editor-markdown>
            </section>
          </dile-pages>
        </section>
      </main>
    `;
  }

  updateValue(e) {
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
    this.viewSelected = e.detail.selected;
    if (this.viewSelected == 'design') {
      this.editor.updateEditorContent(this.textarea.value)
    }
  }

  doTextareaKeypress(e) {
    this.value = e.target.value;
  }
}
