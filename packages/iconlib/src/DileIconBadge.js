import { badgeStyles } from './badgeStyles.js';

export class DileIconBadge extends HTMLElement {
  #_icon = 'lucide.dot';
  #_variant = null;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.adoptedStyleSheets = [badgeStyles];
    this.render();
  }

  get icon() {
    return this.#_icon;
  }

  set icon(value) {
    if (this.#_icon === value) return;
    this.#_icon = value;
    if (value === null) {
      this.removeAttribute('icon');
    } else {
      this.setAttribute('icon', value);
    }
    this.render();
  }

  get variant() {
    return this.#_variant;
  }

  set variant(value) {
    if (this.#_variant === value) return;
    this.#_variant = value;
    if (value === null) {
      this.removeAttribute('variant');
    } else {
      this.setAttribute('variant', value);
    }
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
    // Update internal properties directly to avoid re-triggering setters
    if (name === 'icon') {
      this.#_icon = newValue !== null ? newValue : 'lucide.dot';
      this.render();
    }

    if (name === 'variant') {
      this.#_variant = newValue;
      this.render();
    }
  }
}

if (!customElements.get('dile-icon-badge')) {
  customElements.define('dile-icon-badge', DileIconBadge);
}
