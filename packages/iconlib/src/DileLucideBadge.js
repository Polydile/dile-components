import { badgeStyles } from "./lucideBadgeStyles.js";

export class DileLucideBadge extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.adoptedStyleSheets = [badgeStyles];
    this.icon = "dot";
    this.iconLabel = null;
    this.variant = null;
    this.rounded = false;
    this.render();
  }

  render() {
    const iconAriaLabel = this.iconLabel || this.icon;
    this.shadowRoot.innerHTML = `
      <div class="badge-container">
        <div class="icon-wrapper" role="img" aria-label="${iconAriaLabel}">
          <dile-lucide-icon icon="${this.icon}"></dile-lucide-icon>
        </div>
        <div class="text-wrapper">
          <slot></slot>
        </div>
      </div>
    `;
  }

  static get observedAttributes() {
    return ['icon', 'icon-label', 'variant', 'rounded'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'icon' && newValue !== null) {
      this.icon = newValue;
      this.render();
    }
    if (name === 'icon-label') {
      this.iconLabel = newValue;
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
