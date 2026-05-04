import { LitElement, html, css } from 'lit';
import { contentCopyIcon } from '@dile/icons';
import '../../floating-feedback/floating-feedback.js';

export class DileCopyText extends LitElement {
  static styles = [
    css`
      :host {
        display: inline-block;
      }

      a {
        cursor: pointer;
        text-decoration: var(--dile-copy-text-text-decoration, none);
        color: var(--dile-copy-text-color, inherit);
        transition: all var(--dile-copy-text-transition-duration, 0.3s) ease;
      }

      a:hover {
        color: var(--dile-copy-text-hover-color, #0066cc);
        text-decoration: var(--dile-copy-text-hover-text-decoration, underline);
      }

      a:focus {
        outline: var(--dile-copy-text-focus-outline, 2px solid #0066cc);
        outline-offset: 2px;
      }
    `
  ];

  static get properties() {
    return {
      copy: { type: String },
      copiedDuration: { type: Number },
      feedbackText: { type: String },
      hideIcon: { type: Boolean }
    };
  }

  constructor() {
    super();
    this.copy = '';
    this.copiedDuration = 1000; // 2 seconds by default
    this.feedbackText = 'Copied!';
    this.hideIcon = false;
  }

  render() {
    return html`
      <a
        href="#"
        role="button"
        tabindex="0"
        @click="${this.handleCopy}"
        @keydown="${this.handleKeydown}"
      >
        <slot></slot>
      </a>
      <dile-floating-feedback
        id="copy-feedback"
        feedback="${this.feedbackText}"
        duration="${this.copiedDuration}"
        ?hideIcon=${this.hideIcon}
        .icon=${contentCopyIcon}
      ></dile-floating-feedback>
    `;
  }

  handleCopy(e) {
    e.preventDefault();
    this.copyToClipboard();
  }

  handleKeydown(e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      this.copyToClipboard();
    }
  }

  async copyToClipboard() {
    try {
      // Try to use Clipboard API first (modern browsers)
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(this.copy);
      } else {
        // Fallback for older browsers
        this.copyWithExecCommand();
      }

      // Dispatch custom event
      this.dispatchEvent(
        new CustomEvent('dile-text-copied', {
          detail: { text: this.copy },
          bubbles: true,
          composed: true
        })
      );

      // Show visual feedback
      this.showCopiedFeedback();
    } catch (error) {
      console.error('Failed to copy text:', error);
      // Try fallback if Clipboard API fails
      try {
        this.copyWithExecCommand();
        this.dispatchEvent(
          new CustomEvent('dile-text-copied', {
            detail: { text: this.copy },
            bubbles: true,
            composed: true
          })
        );
        this.showCopiedFeedback();
      } catch (fallbackError) {
        console.error('Fallback copy method also failed:', fallbackError);
      }
    }
  }

  copyWithExecCommand() {
    const textArea = document.createElement('textarea');
    textArea.value = this.copy;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    const successful = document.execCommand('copy');
    document.body.removeChild(textArea);
    if (!successful) {
      throw new Error('execCommand copy failed');
    }
  }

  showCopiedFeedback() {
    const feedback = this.shadowRoot.querySelector('#copy-feedback');
    if (feedback) {
      feedback.show();
    }
  }
}
