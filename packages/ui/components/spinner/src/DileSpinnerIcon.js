import { LitElement, html, css } from "lit";
import { DileSpinnerMixin } from "./DileSpinnerMixin.js";
import "@dile/iconlib/lucide-icons/loader-circle.js";

export class DileSpinnerIcon extends DileSpinnerMixin(LitElement) {
  static get styles() {
    return css`
      :host {
        display: none;
      }
      :host([active]) {
        display: inline-block;
      }
      dile-lucide-icon-loader-circle {
        animation: spin var(--dile-spinner-icon-animation-time, 1s) linear infinite;
      }
      @keyframes spin {
        from {
          transform: rotate(0deg);
        }
        to {
          transform: rotate(360deg);
        }
      }
    `;
  }

  render() {
    return html`
      <dile-lucide-icon-loader-circle></dile-lucide-icon-loader-circle>
    `;
  }
}
