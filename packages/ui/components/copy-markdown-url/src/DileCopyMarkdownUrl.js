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
        @click="${this.handleClick}"
      >
        <slot></slot>
      </dile-copy-text>
    `;
  }

  async handleClick(e) {
    if (this.loading) {
      e.preventDefault();
      return;
    }

    if (!this.content && this.url) {
      e.preventDefault();
      await this.fetchContent();
      
      // After fetching, trigger copy on the component using its public API
      const copyComponent = this.shadowRoot.querySelector('#copy-component');
      if (copyComponent && this.content) {
        await copyComponent.copy();
      }
    }
  }

  async fetchContent() {
    if (!this.url) {
      this.error = 'URL is not set';
      this.dispatchEvent(
        new CustomEvent('dile-copy-markdown-url-error', {
          detail: { message: this.error },
          bubbles: true,
          composed: true
        })
      );
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
      
      this.dispatchEvent(
        new CustomEvent('dile-copy-markdown-url-error', {
          detail: { message: this.error },
          bubbles: true,
          composed: true
        })
      );
    } finally {
      this.loading = false;
    }
  }
}
