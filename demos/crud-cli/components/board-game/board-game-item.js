import { LitElement, html, css } from 'lit';

export class boardGameItem extends LitElement {
  static styles = [
    css`
      :host {
        display: block;
      }
      span {
        font-size: 0.875rem;
      }
    `
  ];

  static get properties() {
    return {
      item: { type: Object }
    };
  }

  render() {
    return html`
      ${this.item.name} 
      <span>
        (${this.item.year},
        ${this.item.essential ? 'Essential' : 'Not essential'})
      </span>
    `;
  }
}
customElements.define('board-game-item', boardGameItem);
