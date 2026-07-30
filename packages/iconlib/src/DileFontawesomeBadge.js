import { badgeStyles } from "./fontawesomeBadgeStyles.js";
import '../dile-fontawesome-icon.js';

export class DileFontawesomeBadge extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.adoptedStyleSheets = [badgeStyles];
    this.icon = "dot-circle";
    this.variant = null;
    this.rounded = false;
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <div class="badge-container">
        <div class="icon-wrapper">
          <dile-fontawesome-icon icon="${this.icon}"></dile-fontawesome-icon>
        </div>
        <div class="text-wrapper">
          <slot></slot>
        </div>
      </div>
    `;
  }

  static get observedAttributes() {
    return ['icon', 'variant', 'rounded'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'icon' && newValue !== null) {
      this.icon = newValue;
      this.render();
    }
    if (name === 'variant' && newValue !== null) {
      this.variant = newValue;
    }
    if (name === 'rounded') {
      this.rounded = newValue !== null;
    }
  }
}
