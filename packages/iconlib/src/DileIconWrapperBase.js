import { iconStylesNamedIcons } from "./iconStyles.js";

export class DileIconWrapperBase extends HTMLElement {
  constructor(defaultIcon = '', family = null) {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.adoptedStyleSheets = [iconStylesNamedIcons];
    this.icon = defaultIcon;
    this.family = family;
    this.rounded = false;
    this.render();
  }

  getTagName() {
    return this.icon ? `dile-${this.family}-icon-${this.icon}` : null;
  }

  render() {
    const tag = this.getTagName();
    this.shadowRoot.innerHTML = tag
      ? `<${tag} ${this.rounded ? 'rounded' : ''} class="flex"></${tag}>`
      : '';
  }

  static get observedAttributes() {
    return ['icon', 'rounded'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'icon' && newValue !== null) {
      this.icon = newValue;
      this.render();
    }
    if (name === 'rounded') {
      this.rounded = newValue !== null;
      this.render();
    }
  }
}
