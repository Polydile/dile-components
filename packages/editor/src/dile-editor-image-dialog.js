import { LitElement, html, css } from 'lit';
import { NodeSelection } from "prosemirror-state"
import { schema } from "prosemirror-markdown";
import '@dile/ui/components/menu-overlay/menu-overlay.js';
import '@dile/ui/components/button/button.js';

export class DileEditorImageDialog extends LitElement {
  static styles = [
    css`
      :host {
        display: block;
      }
      #trigger {
        display: none;
      }
      .grid {
        display: grid;
        grid-template-columns: auto 1fr;
        column-gap: 0.8rem;
        row-gap: 0.4rem;
        margin-bottom: 0.5rem;
      }
    `
  ];

  render() {
    return html`
      <dile-menu-overlay>
        <span id="trigger" slot="trigger">Click to open</span>
        <div slot="content">
          <section class="grid">
            <div>URL:</div>
            <div><input type="text" id="src"></div>
            <div>Alt:</div>
            <div><input type="text" id="alt"></div>
          </section>
          <dile-button @click=${this.accept}>Accept</dile-button> <dile-button @click=${this.close}>Cancel</dile-button> 
        </div>
      </dile-menu-overlay>
    `;
  }
  get menu() {
    return this.shadowRoot.querySelector('dile-menu-overlay');
  }
  get srcInput() {
    return this.shadowRoot.getElementById('src');
  }
  get altInput() {
    return this.shadowRoot.getElementById('alt')
  }
  open(view) {
    if (view.state.selection instanceof NodeSelection && view.state.selection.node.type == schema.nodes.image) {
      let attrs = view.state.selection.node.attrs
      this.srcInput.value = attrs.src;
      this.altInput.value = attrs.alt;
    }
    this.menu.open();
  }
  close() {
    this.menu.close();
  }
  accept() {
    this.close();
    this.dispatchEvent(new CustomEvent('accept-image-dialog', {
      bubbles: true,
      composed: true,
      detail: {
        src: this.srcInput.value,
        alt: this.altInput.value,
      }
    }));
    this.srcInput.value = '';
    this.altInput.value = '';
  }
}
customElements.define('dile-editor-image-dialog', DileEditorImageDialog);
