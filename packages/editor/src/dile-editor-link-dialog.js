import { LitElement, html, css } from 'lit';
import '@dile/ui/components/menu-overlay/menu-overlay.js';
import '@dile/ui/components/button/button.js';
import { DileI18nMixin } from './DileI18nMixin.js';

export class DileEditorLinkDialog extends DileI18nMixin(LitElement) {
  static styles = [
    css`
      :host {
        display: block;
        --dile-menu-overlay-padding: 0.5rem;
        --dile-button-padding-y: 0.15rem;
        --dile-button-font-size: 0.8rem;
        --dile-button-border-width: 2px;
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
        <span id="trigger" slot="trigger"></span>
        <div slot="content">
          <section class="grid">
            <div>URL:</div>
            <div><input type="text" id="url"></div>
            <div>${this.translations.title}:</div>
            <div><input type="text" id="title"></div>
          </section>
          <dile-button @click=${this.accept}>${this.translations.accept}</dile-button> <dile-button @click=${this.close}>${this.translations.cancel}</dile-button> 
        </div>
      </dile-menu-overlay>
    `;
  }

  get menu() {
    return this.shadowRoot.querySelector('dile-menu-overlay');
  }

  get urlInput() {
    return this.shadowRoot.getElementById('url');
  }

  get titleInput() {
    return this.shadowRoot.getElementById('title');
  }

  open() {
    this.menu.open();
  }
  close() {
    this.menu.close();
  }
  accept() {
    this.close();
    this.dispatchEvent(new CustomEvent('accept-link-dialog', {
      bubbles: true,
      composed: true,
      detail: {
        url: this.urlInput.value,
        title: this.titleInput.value,
      }
    }));
    this.urlInput.value = '';
    this.titleInput.value = '';
  }
}
customElements.define('dile-editor-link-dialog', DileEditorLinkDialog);
