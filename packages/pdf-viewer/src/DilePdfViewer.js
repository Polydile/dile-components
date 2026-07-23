import { LitElement, html, css } from 'lit';
import * as pdfjsLib from 'pdfjs-dist';
import '@dile/iconlib/lucide-icons/chevron-left.js';
import '@dile/iconlib/lucide-icons/chevron-right.js';
import '@dile/iconlib/lucide-icons/zoom-in.js';
import '@dile/iconlib/lucide-icons/zoom-out.js';
import '@dile/iconlib/lucide-icons/download.js';
import { DileI18nMixin } from './DileI18nMixin.js';

pdfjsLib.GlobalWorkerOptions.workerSrc = new URL('pdfjs-dist/build/pdf.worker.min.mjs', import.meta.url).href;

const MIN_SCALE = 0.5;
const MAX_SCALE = 3;
const SCALE_STEP = 0.2;

export class DilePdfViewer extends DileI18nMixin(LitElement) {

  static get styles() {
    return css`
      :host {
        display: block;
      }
      .Toolbar {
        display: flex;
        align-items: center;
        gap: 0.25rem;
        padding: var(--dile-pdf-viewer-toolbar-padding, 0);
        background: var(--dile-pdf-viewer-toolbar-background, var(--dile-gray-very-light-color, #f4f4f4));
        border: 1px solid var(--dile-pdf-viewer-border-color, #ddd);
        border-bottom: none;
        border-radius: var(--dile-pdf-viewer-toolbar-border-radius, 0) var(--dile-pdf-viewer-toolbar-border-radius, 0) 0 0;
      }
      .Toolbar-pageInfo {
        margin: 0 0.5rem;
        white-space: nowrap;
        color: var(--dile-pdf-viewer-color, var(--dile-on-gray-very-light-color, #303030));
      }
      .Toolbar-spacer {
        flex: 1;
      }
      button {
        display: flex;
        align-items: center;
        justify-content: center;
        background: none;
        border: none;
        cursor: pointer;
        --dile-icon-color: var(--dile-pdf-viewer-icon-color, var(--dile-on-gray-very-light-color, #303030));
        padding: 0.75rem;
        min-width: 44px;
        min-height: 44px;
      }
      button:disabled {
        opacity: 0.4;
        cursor: default;
      }
      .Canvas-wrapper {
        overflow: auto;
        border: 1px solid var(--dile-pdf-viewer-border-color, #ddd);
        text-align: center;
        background: var(--dile-pdf-viewer-canvas-background, #525659);
        min-height: 200px;
        border-radius: 0 0 var(--dile-pdf-viewer-toolbar-border-radius, 0) var(--dile-pdf-viewer-toolbar-border-radius, 0);
      }
      canvas {
        margin: 1rem auto;
        box-shadow: 0 0 8px rgba(0, 0, 0, 0.3);
      }
      canvas[hidden] {
        display: none;
      }
      .Notice {
        padding: 2rem;
        text-align: center;
        color: #fff;
      }
    `;
  }

  static get properties() {
    return {
      src: { type: String },
      filename: { type: String },
      page: { type: Number },
      numPages: { type: Number },
      scale: { type: Number },
      loading: { type: Boolean },
      errorMessage: { type: String },
      language: { type: String },
    };
  }

  constructor() {
    super();
    this.src = '';
    this.filename = 'document.pdf';
    this.page = 1;
    this.numPages = 0;
    this.scale = 1.2;
    this.loading = true;
    this.errorMessage = '';
    this.pdfDocument = null;
    this.scrollHandler = null;
    this.keyHandler = null;
    this.isComponentFocused = false;
    this.announcer = null;
  }

  firstUpdated() {
    this.loadDocument();

    // Create announcer element for document load notifications
    this.announcer = document.createElement('div');
    this.announcer.setAttribute('role', 'status');
    this.announcer.setAttribute('aria-live', 'polite');
    this.announcer.setAttribute('aria-atomic', 'true');
    this.announcer.style.position = 'absolute';
    this.announcer.style.left = '-9999px';
    this.announcer.style.width = '1px';
    this.announcer.style.height = '1px';
    this.announcer.style.overflow = 'hidden';
    document.body.appendChild(this.announcer);

    this.scrollHandler = () => {
      this.dispatchEvent(new CustomEvent('dile-pdf-viewer-scrolled', {
        bubbles: true,
        composed: true,
      }));
    };

    this.keyHandler = (e) => this.handleKeyPress(e);

    const canvasWrapper = this.shadowRoot.querySelector('.Canvas-wrapper');
    canvasWrapper.addEventListener('scroll', this.scrollHandler, { passive: true });

    // Contextual keyboard listeners: only active when component has focus or mouse is over it
    this.addEventListener('mouseenter', () => { this.isComponentFocused = true; });
    this.addEventListener('mouseleave', () => { this.isComponentFocused = false; });
    this.addEventListener('focusin', () => { this.isComponentFocused = true; });
    this.addEventListener('focusout', () => { this.isComponentFocused = false; });

    document.addEventListener('keydown', this.keyHandler);
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    const canvasWrapper = this.shadowRoot?.querySelector('.Canvas-wrapper');
    if (canvasWrapper && this.scrollHandler) {
      canvasWrapper.removeEventListener('scroll', this.scrollHandler);
    }

    if (this.keyHandler) {
      document.removeEventListener('keydown', this.keyHandler);
    }

    // Remove focus/blur listeners
    this.removeEventListener('mouseenter', () => { this.isComponentFocused = true; });
    this.removeEventListener('mouseleave', () => { this.isComponentFocused = false; });
    this.removeEventListener('focusin', () => { this.isComponentFocused = true; });
    this.removeEventListener('focusout', () => { this.isComponentFocused = false; });

    // Remove announcer element
    if (this.announcer && this.announcer.parentNode) {
      this.announcer.parentNode.removeChild(this.announcer);
    }
  }

  handleKeyPress(e) {
    // Only handle keys if component has focus
    if (!this.isComponentFocused) {
      return;
    }

    // Left Arrow, Page Up -> Previous page
    if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
      this.previousPage();
    }
    // Right Arrow, Page Down -> Next page
    if (e.key === 'ArrowRight' || e.key === 'PageDown') {
      this.nextPage();
    }
  }

  updated(changedProperties) {
    if ((changedProperties.has('page') || changedProperties.has('scale')) && this.pdfDocument) {
      this.renderPage();
    }
  }

  async loadDocument() {
    if (! this.src) {
      return;
    }
    this.loading = true;
    this.errorMessage = '';
    try {
      this.pdfDocument = await pdfjsLib.getDocument({ url: this.src }).promise;
      this.numPages = this.pdfDocument.numPages;
      this.loading = false;
      await this.renderPage();

      // Announce successful load
      if (this.announcer) {
        this.announcer.textContent = `PDF loaded. Document has ${this.numPages} pages.`;
      }

      this.dispatchEvent(new CustomEvent('dile-pdf-viewer-opened', {
        bubbles: true,
        composed: true,
        detail: { numPages: this.numPages },
      }));
    } catch (error) {
      console.error('dile-pdf-viewer: fallo al cargar', this.src, error);
      this.loading = false;
      this.errorMessage = this.translations.error_loading;

      // Announce error
      if (this.announcer) {
        this.announcer.textContent = `Error loading PDF: ${this.errorMessage}`;
      }

      this.dispatchEvent(new CustomEvent('dile-pdf-viewer-error', {
        bubbles: true,
        composed: true,
        detail: { error },
      }));
    }
  }

  async renderPage() {
    const canvas = this.shadowRoot.getElementById('canvas');
    if (! canvas) {
      return;
    }
    const pdfPage = await this.pdfDocument.getPage(this.page);
    const viewport = pdfPage.getViewport({ scale: this.scale });
    canvas.width = viewport.width;
    canvas.height = viewport.height;
    await pdfPage.render({ canvasContext: canvas.getContext('2d'), viewport }).promise;
  }

  getPageInfoText() {
    return (this.translations.page_info || '')
      .replace('{page}', this.page)
      .replace('{total}', this.numPages);
  }

  render() {
    const keyboardShortcuts = `Keyboard shortcuts: Arrow Left or Page Up for previous page, Arrow Right or Page Down for next page`;
    return html`
      <div role="region" aria-label="PDF Viewer" aria-description="${keyboardShortcuts}" class="Toolbar">
        <button @click="${this.previousPage}" ?disabled=${this.page <= 1} aria-label="${this.translations.previous_page}">
          <dile-lucide-icon-chevron-left></dile-lucide-icon-chevron-left>
        </button>
        <span class="Toolbar-pageInfo" role="status" aria-live="polite">${this.numPages ? this.getPageInfoText() : ''}</span>
        <button @click="${this.nextPage}" ?disabled=${this.page >= this.numPages} aria-label="${this.translations.next_page}">
          <dile-lucide-icon-chevron-right></dile-lucide-icon-chevron-right>
        </button>
        <div class="Toolbar-spacer"></div>
        <button @click="${this.zoomOut}" ?disabled=${this.scale <= MIN_SCALE} aria-label="${this.translations.zoom_out}">
          <dile-lucide-icon-zoom-out></dile-lucide-icon-zoom-out>
        </button>
        <button @click="${this.zoomIn}" ?disabled=${this.scale >= MAX_SCALE} aria-label="${this.translations.zoom_in}">
          <dile-lucide-icon-zoom-in></dile-lucide-icon-zoom-in>
        </button>
        <button @click="${this.download}" aria-label="${this.translations.download}">
          <dile-lucide-icon-download></dile-lucide-icon-download>
        </button>
      </div>
      <div class="Canvas-wrapper">
        ${this.loading ? html`<p class="Notice" role="status" aria-live="polite" aria-atomic="true">${this.translations.loading}</p>` : ''}
        ${this.errorMessage ? html`<p class="Notice" role="status" aria-live="polite" aria-atomic="true">${this.errorMessage}</p>` : ''}
        <canvas id="canvas" role="img" aria-label="${this.getPageInfoText()}" ?hidden=${this.loading || !!this.errorMessage}></canvas>
      </div>
    `;
  }

  previousPage() {
    if (this.page > 1) {
      this.page -= 1;
      this.dispatchPageChanged();
    }
  }

  nextPage() {
    if (this.page < this.numPages) {
      this.page += 1;
      this.dispatchPageChanged();
    }
  }

  dispatchPageChanged() {
    this.dispatchEvent(new CustomEvent('dile-pdf-viewer-page-changed', {
      bubbles: true,
      composed: true,
      detail: { page: this.page, numPages: this.numPages },
    }));
  }

  zoomIn() {
    this.scale = Math.min(MAX_SCALE, +(this.scale + SCALE_STEP).toFixed(2));
    if (this.announcer) {
      this.announcer.textContent = `Zoom level: ${Math.round(this.scale * 100)}%`;
    }
  }

  zoomOut() {
    this.scale = Math.max(MIN_SCALE, +(this.scale - SCALE_STEP).toFixed(2));
    if (this.announcer) {
      this.announcer.textContent = `Zoom level: ${Math.round(this.scale * 100)}%`;
    }
  }

  async download() {
    this.dispatchEvent(new CustomEvent('dile-pdf-viewer-download-requested', {
      bubbles: true,
      composed: true,
    }));

    const bytes = await this.pdfDocument.getData();
    const blob = new Blob([bytes], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = this.filename;
    link.click();
    URL.revokeObjectURL(url);

    this.dispatchEvent(new CustomEvent('dile-pdf-viewer-downloaded', {
      bubbles: true,
      composed: true,
    }));
  }
}
