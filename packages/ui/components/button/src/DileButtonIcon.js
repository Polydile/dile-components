import { html, css } from "lit";
import { DileButton } from './DileButton.js';
import '../../icon/icon.js';

/**
 * dile-button-icon renders an icon supplied as a lit-html template (or any HTML
 * template, e.g. an `<img>`). If you want string-based icons with icon-family
 * support ("lucide.rocket", "material.home", ...), use `<dile-button>` together
 * with its `icon` property instead.
 *
 * It inherits every feature from dile-button: `iconPosition`, `no-wrap`,
 * `label`, loading spinner and form integration.
 */
export class DileButtonIcon extends DileButton {
  static get properties() {
    return {
      icon: { type: Object },
    };
  }

  static get styles() {
    return [
      super.styles,
      css`
        button {
          --dile-icon-color: var(--dile-button-icon-color, var(--dile-on-primary-color, #ffffff));
        }
        button:hover {
          --dile-icon-color: var(--dile-button-icon-hover-color, var(--dile-on-primary-light-color, #888));
        }
      `
    ];
  }

  get iconTemplate() {
    const side = this.iconPosition === 'right' ? 'icon-right' : 'icon-left';
    return html`
      <dile-icon
        class="button-icon ${side}"
        .icon=${this.icon}
        aria-hidden="true"
      ></dile-icon>
    `;
  }
}
