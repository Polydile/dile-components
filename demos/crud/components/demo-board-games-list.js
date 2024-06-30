import { LitElement, html, css } from 'lit';
import './demo-board-game-item';

export class DemoBoardGamesList extends LitElement {
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
    this.config = {
      endpoint: 'api/board-games',
      filters: [],
      itemTemplate: (boardGame) => html`<demo-board-game-item .boardGame=${boardGame}></demo-board-game-item>`,
      customization: {
        hideCountSummary: false,
        hidePageReport: false,
        hideCheckboxSelection: true,
        hideEmptyInsertButton: false,
        disableInsert: false,
        disableEdit: false,
        disablePagination: false,
      },
      apiConfig: {
        responseDataProperty: 'data',
        responseMessageProperty: 'message',
        validationErrorsProperty: 'errors',
        getResultsListFromResponse(results) {
          console.log(results);
          return results.data.result.data;
        },
        getDataFromResponse(results) {
          console.log(results);
          return results.data;
        }
      }
    }
  }

  render() {
    return html`

      <dile-crud-list
        .config="${this.config}"
        pageSize="10"
      ></dile-crud-list>
    `;
  }

}
customElements.define('demo-board-games-list', DemoBoardGamesList);