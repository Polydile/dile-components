import { LitElement, html, css } from 'lit';
import { DileAppNavigate } from '../lib/DileAppNavigate';

export class DileRouterLink extends DileAppNavigate(LitElement) {
  static styles = [
    css`
      :host {
        display: inline-block
      }
      a {
        color: var(--dile-router-link-color, inherit);
        text-decoration: var(--dile-router-link-text-decoration, none);
      }
    `
  ];

  static get properties() {
    return {
      href: { type: String },
      title: { type: String },
      name: { type: String },
    };
  }

  render() {
    return html`
      <a href="${this.href}" @click=${this.handleLink}>
        <slot></slot>
      </a>
    `;
  }

  handleLink(e) {
    e.preventDefault();

    this.dispatchEvent(new CustomEvent('dile-router-link-clicked', {
      composed: true,
      bubbles: true,
      detail: {
        href: this.href,
        title: this.title,
        name: this.name,
      },
    }));
    
    this.goToUrl(this.href, this.title);
  }
}
