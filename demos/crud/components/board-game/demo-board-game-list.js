import { LitElement, html, css } from 'lit';
import './demo-board-game-item';
import { boardGameConfig } from './boardGameConfig';

export class DemoBoardGameList extends LitElement {
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
      <dile-crud-list
        .config="${this.config}"
        pageSize="15"
      ></dile-crud-list>
    `;
  }

}
customElements.define('demo-board-game-list', DemoBoardGameList);