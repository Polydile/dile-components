import { LitElement, html } from 'lit';
import '../../copy-text/copy-text.js';

export class DileCopyMarkdownUrl extends LitElement {
  static get properties() {
    return {
      url: { type: String },
      copiedDuration: { type: Number },
      feedbackText: { type: String },
      hideIcon: { type: Boolean },
      loading: { type: Boolean, state: true },
      error: { type: String, state: true },
      content: { type: String, state: true }
    };
  }

  constructor() {
    super();
    this.url = '';
    this.copiedDuration = 1000;
    this.feedbackText = 'Copied!';
    this.hideIcon = false;
    this.loading = false;
    this.error = null;
    this.content = '';
  }

  render() {
    return html`
      <dile-copy-text
        id="copy-component"
        .content="${this.content}"
        .feedbackText="${this.feedbackText}"
        .copiedDuration="${this.copiedDuration}"
        ?hideIcon="${this.hideIcon}"
      >
        <slot></slot>
      </dile-copy-text>
    `;
  }

  connectedCallback() {
    super.connectedCallback();
    // Listen in capture phase to intercept click before dile-copy-text handles it
    this.addEventListener('click', (e) => this.handleClickCapture(e), true);
  }

  async handleClickCapture(e) {
    // If no content yet and URL is set, fetch before letting dile-copy-text handle the copy
    if (!this.content && this.url) {
      e.preventDefault();
      e.stopPropagation();
      
      await this.fetchContent();
      
      // Only trigger copy if fetch was successful
      if (this.content && !this.error) {
        const copyComponent = this.shadowRoot.querySelector('#copy-component');
        if (copyComponent) {
          await copyComponent.copy();
        }
      }
    }
  }

  async fetchContent() {
    if (!this.url) {
      this.error = 'URL is not set';
      this.dispatchError(this.error);
      return;
    }

    this.loading = true;
    this.error = null;

    try {
      const response = await fetch(this.url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      this.content = await response.text();
    } catch (err) {
      this.error = err.message || 'Error fetching content';
      this.dispatchError(this.error);
    } finally {
      this.loading = false;
    }
  }

  dispatchError(message) {
    this.dispatchEvent(
      new CustomEvent('dile-copy-markdown-url-error', {
        detail: { message },
        bubbles: true,
        composed: true
      })
    );
  }
}
