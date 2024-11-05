import { LitElement, html, css } from 'lit';
import '@dile/ui/components/icon/icon.js';
import './dile-editor-link-dialog.js';
import './dile-editor-image-dialog.js';

export class DileEditorToolbarItem extends LitElement {
  static styles = [
    css`
      :host {
        display: flex;
        align-items: center;
        --dile-icon-color: #aaa;
        cursor: pointer;
        --dile-menu-overlay-padding: 0.5rem;
        --dile-button-padding-y: 0.15rem;
        --dile-button-font-size: 0.8rem;
        --dile-button-border-width: 2px;
      }
      .active {
        --dile-icon-color: var(--dile-editor-toolbar-color, #303030);
      }
    `
  ];

  static get properties() {
    return {
      active: { type: Boolean },
      item: { type: Object },
      editorView: { type: Object },
    };
  }

  render() {
    return html`
      <dile-icon 
        class="${this.active ? 'active' : ''}" 
        .icon=${this.item.icon} 
        @click=${this.doCommand}
      ></dile-icon> 
      ${this.item.dialogTemplate ? this.item.dialogTemplate : ''}
    `;
  }

  doCommand() {
    if(this.active) {
      if(this.item.dialog) {
        this.shadowRoot.getElementById(this.item.dialog).open(this.editorView);
      } else {
        this.dispatchEvent(new CustomEvent('dile-toolbar-command', { 
          detail: {
            item: this.item
          }
        }));
      }
    }
  }
}
customElements.define('dile-editor-toolbar-item', DileEditorToolbarItem);
