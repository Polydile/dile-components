import { LitElement, html, css } from 'lit';
import { boardGameConfig } from './boardGameConfig';
import './demo-board-game-form';
import './demo-board-game-item';
import './demo-change-essential-action';
import './demo-change-name-action';
export class DemoBoardGamesCrudSingleAction extends LitElement {
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
    this.config = boardGameConfig.getConfig();
  }

  render() {
    return html`
      <dile-crud
        title="Board games"
        singleActionDispatcher="DeleteAction"
        .config="${this.config}"
      ></dile-crud>
    `;
  }
}
if (!customElements.get('demo-board-game-crud-single-action')) {
  customElements.define('demo-board-game-crud-single-action', DemoBoardGamesCrudSingleAction);
}
