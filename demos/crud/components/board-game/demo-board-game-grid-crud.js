import { LitElement, html, css } from 'lit';
import { boardGameGridConfig } from './boardGameGridConfig.js';
import './demo-board-game-form.js';
import './demo-change-essential-action.js';
import './demo-change-name-action.js';

export class DemoBoardGamesGridCrud extends LitElement {
  static styles = [
    css`
      :host {
        display: block;
        --dile-crud-h1-font-weight: 300;
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
    this.config = boardGameGridConfig.getConfig();
  }

  render() {
    return html`
      <dile-crud
        title="Board Games with DataGrid"
        .config="${this.config}"
      ></dile-crud>
    `;
  }
}

if (!customElements.get('demo-board-game-grid-crud')) {
  customElements.define('demo-board-game-grid-crud', DemoBoardGamesGridCrud);
}
