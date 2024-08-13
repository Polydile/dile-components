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
        <dile-crud
          title="Juegos de ${this.country.name}"
          .config="${this.boardGameConfig}"
          belongsTo="country"
          relationId="${this.country.id}"
        ></dile-crud>  
      `
      : ''
    }
    
    `;
  }
}
customElements.define('demo-country-relations', DemoCountryRelations);
