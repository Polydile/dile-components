import { LitElement, html, css } from 'lit';
import { clearIcon } from '@dile/icons';
import '@dile/ui/components/icon/icon.js';

export class DileChip  extends LitElement {

  static get styles() {
    return css`
      :host {
        display: inline-block;
      }
      div {
        display: flex;
        align-items: center;
        background-color: var(--dile-chip-background-color, #e5e5e5);
        padding-right: var(--dile-chip-padding-x, 0.5rem);
        padding-left: var(--dile-chip-padding-x, 0.5rem);
        padding-top: var(--dile-chip-padding-y, 0.3rem);
        padding-bottom: var(--dile-chip-padding-y, 0.3rem);
        border-radius: var(--dile-chip-border-radius, 0);
      }
      .text {
        font-size: var(--dile-chip-font-size, 1rem);
        font-weight: var(--dile-chip-font-weight, bold);
        color: var(--dile-chip-text-color, #303030);
        display: inline-block;
        margin-right: 20px;
      }
      button {
        all: unset;
        box-sizing: border-box;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        /* Enlarge the hit area (WCAG 2.5.8) without changing the visual size */
        padding: 4px;
        margin: -4px;
        min-width: 24px;
        min-height: 24px;
        border-radius: 4px;
        cursor: pointer;
        --dile-icon-color: var(--dile-chip-icon-color, #303030);
        --dile-icon-size: var(--dile-chip-icon-size, 16px);
        -webkit-tap-highlight-color: transparent;
      }
      button:hover,
      button:focus-visible {
        --dile-icon-color: var(--dile-chip-icon-hover-color, #d06060);
      }
      button:focus-visible {
        outline: 2px solid var(--dile-chip-focus-outline-color, var(--dile-primary-color, #1a73e8));
        outline-offset: 0;
      }
      .action-label {
        display: none;
      }
    `;
  }

  static get properties() {
    return {
      name: { type: String },
      icon: { type: Object },
      iconLabel: { type: String, attribute: 'icon-label' },
    };
  }

  constructor() {
    super();
    this.icon = clearIcon;
    this.iconLabel = 'Remove';
  }

  render() {
    return html`
      <div>
        <span class="text" id="text"><slot></slot></span>
        <span class="action-label" id="action">${this.iconLabel}</span>
        <button
          type="button"
          part="button"
          aria-labelledby="action text"
          @click="${this.doClick}"
          @keydown="${this.onKeyDown}"
        >
          <dile-icon .icon="${this.icon}" aria-hidden="true"></dile-icon>
        </button>
      </div>
    `;
  }

  onKeyDown(e) {
    if (e.key === 'Delete' || e.key === 'Backspace') {
      e.preventDefault();
      this.doClick();
    }
  }

  focus(options) {
    this.shadowRoot?.querySelector('button')?.focus(options);
  }

  doClick() {
    this.dispatchEvent(new CustomEvent('dile-chip-icon-click', {
      bubbles: true,
      composed: true,
      detail: {
          name: this.name,
      }
    }));
  }
}
