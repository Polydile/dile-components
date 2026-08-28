import { LitElement, html, css } from 'lit';
import { unsafeSVG } from 'lit/directives/unsafe-svg.js';
import { ResponseApiAdapter } from '@dile/crud/lib/ResponseApiAdapter';
import { contentCopyIcon } from '@dile/icons';
import '@dile/ui/components/modal/modal.js';
import '@dile/ui/components/copy-text/copy-text.js';
import '@dile/ui/components/icon/icon.js';

const LIBRARY_DOCS_URL = {
  lucide: '/icons/lucide-icons/',
  material: '/icons/material-icons/',
  fontawesome: '/icons/fontawesome-icons/',
  phosphor: '/icons/phosphor-icons/',
  tabler: '/icons/tabler-icons/',
  remixicon: '/icons/remixicon-icons/',
};

class DemoIconCatalogItem extends LitElement {
  static styles = css`
    :host { 
      display: flex;
      flex-direction: column;
      flex: 1;      
      width: 100%;  
      justify-content: space-between;
    }
    .icon-catalog-item {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.5rem 0;
    }
    .icon-preview svg {
      width: 28px;
      height: 28px;
      color: var(--dile-on-background-color);
      display: block;
    }
    .meta {
      display: flex;
      flex-direction: column;
      gap: 0.15rem;
    }
    .name {
      font-weight: 600;
      color: var(--dile-link-color);
    }
    .badges {
      display: flex;
      gap: 0.15rem;
      font-size: 0.75rem;
      line-height: 0.75rem;
    }
    .badge {
      padding: 0.25rem 0.25rem;
      border-radius: 5px;
      background: #eee;
      color: #555;
    }
    .badge.brand {
      background: #ffe4b5;
      color: #7a4b00;
    }
    .icon-catalog-item {
      cursor: pointer;
    }
  `;

  static get properties() {
    return { icon: { type: Object } };
  }

  render() {
    if (!this.icon) return html``;
    return html`
      <div class="icon-catalog-item" @click="${this.selectIcon}">
        <span class="icon-preview">${unsafeSVG(this.icon.svg)}</span>
        <div class="meta">
          <span class="name">${this.icon.name}</span>
          <span class="badges">
            <span class="badge">${this.icon.library}</span>
            ${this.icon.is_brand ? html`<span class="badge brand">brand</span>` : ''}
          </span>
        </div>
      </div>
    `;
  }

  selectIcon() {
    this.dispatchEvent(new CustomEvent('icon-selected', {
      bubbles: true,
      composed: true,
      detail: { icon: this.icon },
    }));
  }
}
customElements.define('demo-icon-catalog-item', DemoIconCatalogItem);

// Listens for the "icon-selected" event dispatched (bubbles + composed, so it
// crosses every shadow boundary up to window) by demo-icon-catalog-item, and shows
// usage instructions for that icon in a dile-modal.
class DemoIconUsageModal extends LitElement {
  static styles = css`
    :host {
      display: block;
      --dile-modal-width: 90%;
      --dile-modal-max-width: 690px;
    }
    .header {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-bottom: 1rem;
    }
    .icon-preview svg {
      width: 44px;
      height: 44px;
      color: #444;
      display: block;
    }
    .header-info {
      display: flex;
      flex-direction: column;
      gap: 0.35rem;
    }
    .header-info h2 {
      font-size: 1.25rem;
      margin: 0;
    }
    .quick-copy {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 0.5rem;
    }
    .copy-chip {
      display: inline-flex;
      align-items: center;
      gap: 0.35rem;
      background: #f0f4f8;
      border: 1px solid #d0dbe5;
      padding: 0.2rem 0.5rem;
      border-radius: 6px;
      font-size: 0.8rem;
      color: #24292f;
      cursor: pointer;
      line-height: 1.2;
      transition: background 0.15s ease, border-color 0.15s ease;
    }
    .copy-chip code {
      font-family: monospace;
      font-size: 0.8rem;
    }
    .copy-chip:hover {
      background: #e1ebf5;
      border-color: #b0c4de;
    }
    .copy-chip .copy-icon {
      --dile-icon-size: 14px;
      --dile-icon-color: #555;
    }
    .copy-chip:hover .copy-icon {
      --dile-icon-color: #0066cc;
    }
    .usage-content {
      font-size: 0.85rem;
    }
    .usage-content h3 {
      font-size: 0.95rem;
      margin-bottom: 0.2rem;
    }
    .usage-content p {
      margin-top: 0.2rem;
    }
    dile-copy-text {
      display: block;
      --dile-copy-text-hover-color: inherit;
      --dile-copy-text-hover-text-decoration: none;
    }
    .quick-copy dile-copy-text {
      display: inline-block;
    }
    .code-block {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    pre {
      flex: 1;
      min-width: 0;
      background: #f5f5f5;
      padding: 0.6rem 0.8rem;
      border-radius: 6px;
      overflow-x: auto;
      margin: 0;
    }
    .copy-icon {
      flex-shrink: 0;
      --dile-icon-size: 16px;
      --dile-icon-color: #999;
      pointer-events: none;
    }
    dile-copy-text:hover .copy-icon {
      --dile-icon-color: #0066cc;
    }
  `;

  static get properties() {
    return { icon: { type: Object } };
  }

  connectedCallback() {
    super.connectedCallback();
    this.handleIconSelected = this.handleIconSelected.bind(this);
    window.addEventListener('icon-selected', this.handleIconSelected);
  }

  disconnectedCallback() {
    window.removeEventListener('icon-selected', this.handleIconSelected);
    super.disconnectedCallback();
  }

  handleIconSelected(e) {
    this.icon = e.detail.icon;
    this.shadowRoot.getElementById('modal').open();
  }

  render() {
    return html`
      <dile-modal id="modal" showCloseIcon>
        ${this.icon ? this.usageTemplate(this.icon) : ''}
      </dile-modal>
    `;
  }

  usageTemplate(icon) {
    const libraryDocsUrl = LIBRARY_DOCS_URL[icon.library];
    const fullName = `${icon.library}.${icon.name}`;
    const installCommand = 'npm install @dile/iconlib';
    const importStatement = `import '${icon.import}';`;
    const specificTag = `<${icon.tag}></${icon.tag}>`;
    const genericTag = `<dile-iconlib icon="${fullName}"></dile-iconlib>`;
    return html`
      <div class="usage-content">
        <div class="header">
          <span class="icon-preview">${unsafeSVG(icon.svg)}</span>
          <div class="header-info">
            <h2>${icon.name} icon</h2>
            <div class="quick-copy">
              <dile-copy-text content="${icon.name}" feedbackText="Copied icon name!">
                <span class="copy-chip" title="Copy icon name">
                  <dile-icon class="copy-icon" .icon="${contentCopyIcon}"></dile-icon>
                  <code>${icon.name}</code>
                </span>
              </dile-copy-text>
              <dile-copy-text content="${fullName}" feedbackText="Copied full icon identifier!">
                <span class="copy-chip" title="Copy full identifier (${icon.library}.${icon.name})">
                  <dile-icon class="copy-icon" .icon="${contentCopyIcon}"></dile-icon>
                  <code>${fullName}</code>
                </span>
              </dile-copy-text>
            </div>
          </div>
        </div>

        <h3>1. Install the package</h3>
        <dile-copy-text content="${installCommand}">
          <div class="code-block">
            <pre><code>${installCommand}</code></pre>
            <dile-icon class="copy-icon" .icon="${contentCopyIcon}"></dile-icon>
          </div>
        </dile-copy-text>

        <h3>2. Import the icon component</h3>
        <dile-copy-text content="${importStatement}">
          <div class="code-block">
            <pre><code>${importStatement}</code></pre>
            <dile-icon class="copy-icon" .icon="${contentCopyIcon}"></dile-icon>
          </div>
        </dile-copy-text>
        <h3>3. Use its specific tag</h3>
        <dile-copy-text content="${specificTag}">
          <div class="code-block">
            <pre><code>${specificTag}</code></pre>
            <dile-icon class="copy-icon" .icon="${contentCopyIcon}"></dile-icon>
          </div>
        </dile-copy-text>
        <p>More usage examples on the <a href="${libraryDocsUrl}">${icon.library} icons page</a>.</p>

        <h3>4. Or use the generic dile-iconlib tag</h3>
        <dile-copy-text content="${genericTag}">
          <div class="code-block">
            <pre><code>${genericTag}</code></pre>
            <dile-icon class="copy-icon" .icon="${contentCopyIcon}"></dile-icon>
          </div>
        </dile-copy-text>
        <p>See the <a href="/icons/dile-iconlib/">dile-iconlib documentation</a> for details on the generic component.</p>
      </div>
    `;
  }
}
customElements.define('demo-icon-usage-modal', DemoIconUsageModal);

// The API wraps the paginated result as { data: { countItems, result: { data: [...], current_page, next_page_url, prev_page_url } } }.
// That already matches ResponseApiAdapter's default getPaginationData() (response.data), so only
// getElementList() needs to be overridden to reach into result.data for the actual icon array.
class IconResponseApiAdapter extends ResponseApiAdapter {
  getElementList() {
    return this.response.data.result.data;
  }
}
