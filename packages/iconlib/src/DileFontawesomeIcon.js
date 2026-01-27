import { iconStylesNamedIcons } from "../src/lucideIconStyles.js";
import '../fontawesome-icons/dot-circle.js';

export class DileFontawesomeIcon extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.adoptedStyleSheets = [iconStylesNamedIcons];
    this.icon = "dot-circle";
    this.rounded = false;
    this.render();

  }

  render() {
    this.shadowRoot.innerHTML = `
      <dile-fontawesome-icon-${this.icon} ${this.rounded ? 'rounded': ''} class="flex"></dile-fontawesome-icon-${this.icon}>
    `;
  }

  static get observedAttributes() {
    return ['icon', 'rounded'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'icon' && newValue !== null) {
      this.icon = newValue;
      this.render();
    }
    if (name === 'rounded' && newValue !== null) {
      this.rounded = true;
      this.render();
    } else {
      this.rounded = false;
      this.render();
    }
  }
}
