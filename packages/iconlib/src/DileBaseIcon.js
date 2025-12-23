import { lucideIconStyles as iconStyles } from "./lucideIconStyles.js";

export class DileBaseIcon extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.adoptedStyleSheets = [iconStyles];
    this.render();
  }
  
  render() {
    this.shadowRoot.innerHTML = `
      <div class="icon-container">
        ${this.getSvgIcon()}
      </div>
    `;
  }

  getSvgIcon() {
    throw new Error('getSvgIcon() must be implemented by subclass');
  }
}

