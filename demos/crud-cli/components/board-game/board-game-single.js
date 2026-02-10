import { LitElement, html, css } from 'lit';
import '@dile/crud/components/single/crud-single'
import { boardGameConfig } from '../../resources/boardGameConfig.js';

export class BoardGameSingle extends LitElement {
  static styles = [
    css`
      :host {
        display: block;
      }
    `
  ];

  static get properties() {
    return {
      config: { type: Object },
      itemId: { type: String },
      language: { type: String },
    };
  }

  constructor() {
    super();
    this.config = boardGameConfig.getConfig();
  }

  render() {
    return html`
      <dile-crud-single
        relatedId="${this.itemId}"
        .config=${this.config}
        language="${this.language}"
      ></dile-crud-single>
    `;
  }
}
customElements.define('board-game-single', BoardGameSingle);
