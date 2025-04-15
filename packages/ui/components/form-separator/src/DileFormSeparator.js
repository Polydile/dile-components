import { LitElement, html, css } from 'lit';

export class DileFormSeparator extends LitElement {
  static styles = [
    css`
      :host {
        display: block;
      }
      div {
        border-top: 1px solid var(--dile-form-separator-color, var(--dile-secondary-dark-color, #888));
        margin: 1.5rem 0.2rem 1rem;
      }
      h3 {
        margin: 1rem 0 0.5rem 0;
        font-weight: 300;
        color: var(--dile-form-separator-text-color, var(--dile-secondary-dark-color, #888));
        font-size: 1.1rem;
      }
      :host([removeline]) div {
        border-top: none;
      }
    `
  ];

  static get properties() {
    return {
      label: { type: String }
    };
  }

  render() {
    return html`
      <div>
        ${this.label ? html`<h3>${this.label}</h3>` : ''}
      </div>
    `;
  }
}
