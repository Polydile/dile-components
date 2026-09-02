import { badgeStyles } from "./badgeStyles.js";
import '../dile-material-icon.js';

export class DileMaterialBadge extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.adoptedStyleSheets = [badgeStyles];
    this.icon = "home";
    this.variant = null;
    this.rounded = false;
    this.render();
  }

  render() {
    const variantClass = this.variant ? `variant-${this.variant}` : '';
    this.shadowRoot.innerHTML = `
      <div class="badge-container ${variantClass}">
        <div class="icon-wrapper">
          <dile-material-icon icon="${this.icon}"></dile-material-icon>
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
    if (name === 'variant') {
      this.variant = newValue !== null ? newValue : null;
      this.render();
    }
    if (name === 'rounded') {
      this.rounded = newValue !== null;
    }
  }
}
