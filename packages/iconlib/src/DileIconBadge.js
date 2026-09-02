import { badgeStyles } from './badgeStyles.js';

export class DileIconBadge extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.adoptedStyleSheets = [badgeStyles];
    this.icon = 'lucide.dot';
    this.variant = null;
    this.render();
  }

  getTagName() {
    if (!this.icon) return null;
    const dotIndex = this.icon.indexOf('.');
    if (dotIndex === -1) {
      console.warn(`dile-icon-badge: icon="${this.icon}" no tiene el formato "familia.nombre", ej. "lucide.home".`);
      return null;
    }

    const family = this.icon.slice(0, dotIndex);
    const name = this.icon.slice(dotIndex + 1);
    if (!name) return null;

    return `dile-${family}-icon-${name}`;
  }

  render() {
    const tag = this.getTagName();
    const variantClass = this.variant ? `variant-${this.variant}` : '';

    if (this.variant) {
      this.setAttribute('variant', this.variant);
    } else {
      this.removeAttribute('variant');
    }

    this.shadowRoot.innerHTML = `
      <div class="badge-container ${variantClass}">
        <div class="icon-wrapper">
          ${tag ? `<${tag} class="badge-icon"></${tag}>` : ''}
        </div>
        <div class="text-wrapper">
          <slot></slot>
        </div>
      </div>
    `;
  }

  static get observedAttributes() {
    return ['icon', 'variant'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'icon' && newValue !== null) {
      this.icon = newValue;
      this.render();
    }

    if (name === 'variant' && newValue !== null) {
      this.variant = newValue;
      this.render();
    }
  }
}

if (!customElements.get('dile-icon-badge')) {
  customElements.define('dile-icon-badge', DileIconBadge);
}
