import { LitElement, html, css } from 'lit';
import { notesIcon } from '@dile/icons'
import './dile-editor-toolbar-item.js';
import '@dile/ui/components/select/select.js';
import { toolbarItems, undoItems, blockItems } from './prosemirror/menu-items.js';
import { linkCommand } from './prosemirror/markdown-commands.js';
import { schema } from "prosemirror-markdown";

export class DileEditorToolbar extends LitElement {
  static styles = [
    css`
      :host {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        border-bottom: 1px solid #ddd;
        padding: 4px;
        background-color: var(--dile-editor-toolbar-background-color, transparent);
      }
      dile-editor-toolbar-item {
        margin-right: 0.4rem;
      }
      dile-select {
        min-width: 100px;
        margin-bottom: 0;
        --dile-input-border-width: 0;
        --dile-input-padding: 3px;
      }
      .marks, .blocks {
        display: flex;
        align-items: center;
      }
      .blocks {
        --dile-icon-color: var(--dile-editor-toolbar-color, #303030);
        border-left: 2px solid #ccc;
        margin-left: 10px;
        padding-left: 10px;
      }
      .blocks dile-icon {
        margin-right: 5px;
      }
    `
  ];

  static get properties() {
    return {
      editorView: { type: Object },
      toolbarItems: { type: Array },
      blockItems: { type: Array },
      undoItems: { type: Array },
    };
  }

  constructor() {
    super();
    this.toolbarItems = toolbarItems;

    this.undoItems = undoItems

    this.blockItems = blockItems
  }

  firstUpdated() {
    
    this.blockselect = this.shadowRoot.getElementById('blockselect');
  }

  render() {
    return html`
      ${this.showItems(this.toolbarItems, 'marks')}
      ${this.paragraphTypes}
      ${this.showItems(this.undoItems, 'blocks')}
    `;
  }

  showItems(items, cssClass) {
    return html`
      <div class="${cssClass}">
        ${items.map(item => html`
          ${item.visible
            ? html`
              <dile-editor-toolbar-item 
                ?active=${item.active} 
                .item=${item}
                @dile-toolbar-command=${this.doCommand}
                @accept-link-dialog=${this.doLinkCommand}
                @accept-image-dialog=${this.doImageCommand}
                .editorView=${this.editorView}
              ></dile-editor-toolbar-item>
              `
            : ''
          }
        `)}
      </div>
    `;
  }

  get paragraphTypes() {
    return html`
      <div class="blocks">
        <dile-icon .icon=${notesIcon}></dile-icon>
        <dile-select 
          id="blockselect" 
          name="blockselect" 
          @element-changed=${this.blockElementChanged} 
          quietOnStart
        >
          <select slot="select">
            ${this.blockItems.map(item => html`
              <option value="${item.commandName}">${item.commandName}</option>
            `)}
          </select>
        </dile-select>
      </div>
    `
  }

  doCommand(e) {
    let toolbarElement = e.detail.item;
    toolbarElement.doCommand(this.editorView);
    this.editorView.focus();
  }

  doLinkCommand(e) {
    let attrs = { title: e.detail.title, href: e.detail.url }
    let currentLinkCommand = linkCommand(attrs);
    currentLinkCommand(this.editorView.state, this.editorView.dispatch);
    // let node = schema.text(attrs.title, [schema.marks.link.create(attrs)])
    // this.editorView.dispatch(this.editorView.state.tr.replaceSelectionWith(node, false))
  }

  doImageCommand(e) {
    let nodeType = schema.nodes.image
    this.editorView.dispatch(
      this.editorView.state.tr.replaceSelectionWith(nodeType.createAndFill(e.detail)))
    this.editorView.focus()
  }

  reviewActiveElements() {
    this.toolbarItems = this.computeActive(this.toolbarItems);
    this.undoItems = this.computeActive(this.undoItems);
    let currentBlock = this.blockItems.find(item => !item.command(this.editorView.state, null, this.editorView))
    this.blockselect?.quietChange(currentBlock.commandName);
  }

  computeActive(items) {
    return items.map(item => {
      item.checkActive(this.editorView);
      return item;
    });
  }

  blockElementChanged(e) {
    let commandName = e.detail.value;
    let commandElement = this.blockItems.find(item => item.commandName == commandName);
    commandElement.command(this.editorView.state, this.editorView.dispatch);
    this.editorView.focus();
  }
}
customElements.define('dile-editor-toolbar', DileEditorToolbar);
