import { LitElement, html, css } from 'lit';
import { boardGameConfig } from '../../resources/boardGameConfig.js';
import '@dile/crud/components/crud/crud.js';

export class BoardGameCrud extends LitElement {
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
    };
  }

  constructor() {
    super();
    this.config = boardGameConfig.getConfig();
  }

  render() {
    return html`
      <dile-crud
        .config=${this.config}
      ></dile-crud>
    `;
  }
}
customElements.define('board-game-crud', BoardGameCrud);
