import { LitElement, html, css } from 'lit';

export class boardGameDetail extends LitElement {
  static styles = [
    css`
      :host {
        display: block;
      }
      h2 {
        font-size: 1.8rem;
        font-weight: 300;
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
      <h2>${this.item.name}</h2>
      <p>
        (
          ${this.item.year},
          ${this.item.essential ? 'Essential' : 'Not essential'}
        )
      </p>
    `;
  }
}
customElements.define('board-game-detail', boardGameDetail);
