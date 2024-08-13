import { LitElement, html, css } from 'lit';
import { boardGameConfig } from '../board-game/boardGameConfig';
import '../board-game/demo-board-game-form';
import '../board-game/demo-board-game-item';
import '../board-game/demo-change-essential-action'

export class DemoCountryRelations extends LitElement {
  static styles = [
    css`
      :host {
        display: block;
      }
      h2 {
        font-weight: 600;
        font-size: 1.2rem;
        border-top: 1px solid #ddd;
        padding-top: 1rem;
        margin-top: 1.5rem;
      }
    `
  ];

  static get properties() {
    return {
      boardGameConfig: { type: Object },
      country: { type: Object },
    };
  }

  constructor() {
    super();
    this.boardGameConfig = boardGameConfig.getConfig();
  }

  firstUpdated() {
    console.log(this.country);
  }

  render() {
    return html`
    ${this.country
      ? html `
        <h2>Juegos de mesa de ${this.country.name}</h2>
        <dile-crud
          .config="${this.boardGameConfig}"
        ></dile-crud>  
      `
      : ''
    }
    
    `;
  }
}
customElements.define('demo-country-relations', DemoCountryRelations);
