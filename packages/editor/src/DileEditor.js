import { LitElement, html, css } from 'lit';
import { DileEmmitChange } from '@dile/ui/mixins/form/index.js'; 
import './dile-editor-markdown.js';
import '@dile/ui/components/pages/pages.js';
import '@dile/ui/components/tabs/tabs.js';
import { messageStyles } from '@dile/ui/components/input/index.js';
import { defaultToolbarConfig } from './defaultToolbarConfig.js';
import { DileI18nMixin } from './DileI18nMixin.js';

export class DileEditor extends DileI18nMixin(DileEmmitChange(LitElement)) {
  static styles = [
    messageStyles,
    css`
     * {
      box-sizing: border-box;
     }
    :host {
        display: block;
        margin-bottom: 10px;
        font-family: arial;
              
        --dile-tab-text-color: var(--dile-editor-views-nav-color, #106eda);
        --dile-tab-background-color: transparent;
        --dile-tab-selected-text-color: var(--dile-editor-views-nav-selected-color, #0f4e96);
        --dile-tab-selected-background-color: transparent;
        --dile-tab-selected-line-color: var(--dile-editor-views-nav-selected-line-color, #0f4e96);
        --dile-tab-font-size: 0.8em;
        --dile-tab-padding: 8px 8px 2px 6px;
        --dile-tab-selected-line-height: 2px;
        
    }
    
    main {
      width: var(--dile-input-section-width, 100%);
    }

    section.for-input {
      border: var(--dile-editor-border, 2px solid #ddd);
      border-radius: 0.5rem;
      font-size: 0.9rem;
      background-color: var(--dile-editor-background-color, #fff);
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
        background-color: var(--dile-editor-views-nav-background-color, #f5f5f5);
        padding-right: 0.6rem;
        border-bottom: var(--dile-editor-border, 2px solid #ddd);
        border-top-right-radius: 0.4rem;
        border-top-left-radius: 0.4rem;
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

      .ProseMirror img {
        max-width: 100%;
      }

      .ProseMirror pre {
        background-color: #eee;
        padding: 0.4rem;
      }

      .ProseMirror p code {
        background-color: #eee;
        padding: 1px;
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
      
      section.errored {
        border-color: var(--dile-input-error-border-color, #c00);
      }

      .column-reverse {
         display: flex; 
         flex-direction: column-reverse;
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

      /** Has error on this input field */
      errored: { type: Boolean },

      /** Message Displayed */
      message: { type: String },

      /** Hide errors on input */
      hideErrorOnInput: { type: Boolean },

      /** Disable toolbar items, string with items separated by tubes like "italic|h4" */
      disableToolbarItems: { type: String },
    
      addicionalCommands: { type: Object },

      /** Menu config */
      _menuConfig: { type: Object },

    };
  }

  static get formAssociated() {
    return true;
  }

  constructor() {
    super();
    this.initialized = false;
    this.value = this.innerHTML;
    this.label = '';
    this.viewSelected = 'design';
    this.message = '';
    this.disableToolbarItems = '';
    this._menuConfig = {...defaultToolbarConfig};
    this.addicionalCommands = {};
    this.internals = this.attachInternals();
  }

  updated(changedProperties) {
    if(changedProperties.has('value') && this.isValueExternalyUpdated) {
      this.updateEditorContent(this.value);
    }
    if(changedProperties.has('value')) {
      this.emmitChange();
      this.internals.setFormValue(this.value);
    }
  }

  firstUpdated() {
    this.setupMenuConfig();
    this.editor = this.shadowRoot.getElementById('editor');
    this.textarea = this.shadowRoot.getElementById('eltextarea');
  }

  setupMenuConfig() {
    const disabledItems = this.disableToolbarItems.split('|');
    disabledItems.forEach(item => {
      if (this._menuConfig.hasOwnProperty(item)) {
        this._menuConfig[item] = false;
      }
    });
  }

  render() {
    return html`
    <div class="column-reverse">
      ${this.message
        ? html`<div class="message ${this.errored ? 'errored-msg' : ''}"><span>${this.message}</span></div>`
        : ''
      }
      <main>
        ${this.label
          ? html`<label for="textField" @click=${this.focus}>${this.label}</label>`
          : ""
        }
        <section class="for-input ${this.errored ? 'errored' : ''}">
          <nav>
            <dile-tabs
              selected="design"
              attrForSelected="name"
              @dile-selected-changed=${this.tabSelectedChange}
            >
              <dile-tab name="design">${this.translations.design_view}</dile-tab>
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
                ._menuConfig=${this._menuConfig}
                @dile-editor-markdown-initialized=${this.setInitialized}
                .addicionalCommands=${this.addicionalCommands}
                language="${this.language}"
              ></dile-editor-markdown>
            </section>
          </dile-pages>
        </section>
      </main>
    </div>
    `;
  }

  updateValue(e) {
    this.value = e.detail.content;
    this.textarea.value = e.detail.content;
    this.clearError();
  }

  get editorMarkdown() {
    return this.editor.editorMarkdown;
  }

  updateEditorContent(value) {
    if(this.initialized) {
      this.editor.updateEditorContent(value);
      this.textarea.value = value;
    } else {
      setTimeout(() => this.updateEditorContent(value), 100);
    }
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
    this.clearError();
  }

  clearError() {
    if (this.hideErrorOnInput && this.errored) {
      this.errored = false;
      this.message = '';
    }
  }

  setInitialized() {
    this.initialized = true;
  }

  focus() {
    if(this.viewSelected == 'design') {
      console.log(this.editor);
      this.editor.focus();
    }
    this.textarea.focus();
  }
}
