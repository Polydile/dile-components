import { badgeStyles } from "./lucideBadgeStyles.js";
import '../dile-lucide-icon.js';

export class DileLucideBadge extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.adoptedStyleSheets = [badgeStyles];
    this.icon = "dot";
    this.variant = null;
    this.rounded = false;
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <div class="badge-container">
        <div class="icon-wrapper">
          <dile-lucide-icon icon="${this.icon}"></dile-lucide-icon>
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
