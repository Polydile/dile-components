import { LitElement, html, css } from 'lit';
import { DileInput } from '../../input/index.js';
import '@dile/iconlib/lucide-icons/eye.js';
import '@dile/iconlib/lucide-icons/eye-off.js';

export class DilePassword extends DileInput {

  static get properties() {
    return {
      ...super.properties,
      /** Enable show/hide password toggle */
      showPasswordToggle: { type: Boolean },
      /** Current password visibility state */
      passwordVisible: { type: Boolean },
    };
  }

  static get styles() {
    return [
      ...super.styles,
      css`
        .password-toggle-btn {
          background: none;
          border: none;
          cursor: pointer;
          padding: var(--dile-password-toggle-padding, var(--dile-input-padding, 5px));
          margin: var(--dile-password-toggle-margin, 0 5px);
          color: var(--dile-password-toggle-color, var(--dile-input-color, #303030));
          display: flex;
          align-items: center;
          justify-content: center;
          width: var(--dile-password-toggle-width, 32px);
          height: var(--dile-password-toggle-height, 32px);
          border-radius: var(--dile-password-toggle-border-radius, var(--dile-input-border-radius, 5px));
          transition: var(--dile-password-toggle-transition, background-color 0.2s);
        }
        .password-toggle-btn:hover {
          background-color: var(--dile-password-toggle-hover-bg, rgba(0, 0, 0, 0.05));
        }
        .password-toggle-btn:active {
          background-color: var(--dile-password-toggle-active-bg, rgba(0, 0, 0, 0.1));
        }
        .password-toggle-btn:disabled {
          cursor: not-allowed;
          opacity: 0.5;
        }
        .password-toggle-btn dile-lucide-icon-eye,
        .password-toggle-btn dile-lucide-icon-eye-off {
          --dile-icon-color: var(--dile-password-toggle-color, var(--dile-input-color, #303030));
          --dile-icon-size: var(--dile-password-toggle-icon-size, 20px);
        }
      `
    ];
  }

  constructor() {
    super();
    this.showPasswordToggle = false;
    this.passwordVisible = false;
  }

  render() {
    const inputType = this.passwordVisible ? 'text' : 'password';
    
    return html`
    <div>
      ${this.label
        ? html`<label for="textField">${this.label}</label>`
        : ''
      }
      <section class="for-input">
        <input
          type="${inputType}"
          id="textField"
          name="${this.name}"
          placeholder="${this.placeholder}"
          ?disabled="${this.disabled}"
          @keypress="${this._lookForEnter}"
          @input="${this._input}"
          .value="${this.value}"
          class="${ this.errored ? 'errored' : '' }"
        >
        ${this.showPasswordToggle
          ? html`<button
              class="password-toggle-btn"
              type="button"
              @click="${this._togglePasswordVisibility}"
              ?disabled="${this.disabled}"
              aria-label="${this.passwordVisible ? 'Hide password' : 'Show password'}"
            >
              ${this.passwordVisible 
                ? html`<dile-lucide-icon-eye></dile-lucide-icon-eye>`
                : html`<dile-lucide-icon-eye-off></dile-lucide-icon-eye-off>`
              }
            </button>`
          : ''
        }
      </section>
      ${this.message
        ? html`<div class="message ${this.errored ? 'errored-msg' : ''}"><span>${this.message}</span></div>`
        : ''
      }
    </div>
    `;
  }

  _togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
    this.dispatchEvent(new CustomEvent('password-visibility-changed', {
      bubbles: true,
      composed: true,
      detail: {
        visible: this.passwordVisible,
      }
    }));
  }

}
