import { LitElement, html, css } from 'lit';
import './demo-board-games-form';
import './demo-board-game-item';
import './demo-change-essential-action'
export class DemoBoardGamesCrud extends LitElement {
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
      //endpoint: 'https://timer.escuelait.com/api/board-games',
      endpoint: 'http://localhost/api/board-games',
      filters: [],
      itemTemplate: (boardGame) => html`<demo-board-game-item .boardGame=${boardGame}></demo-board-game-item>`,
      selectActionsTemplate: (deleteLabel) => html`
                <dile-select>
                    <select slot="select">
                        <option value="DeleteAction">${deleteLabel}</option>
                        <option value="DemoChangeEssentialAction">Change Essential</option>
                    </select>
                </dile-select>
            `,
      formActionsTemplate: (actionName) => html`
                <dile-pages attrForSelected="action" selected="${actionName}">
                    <dile-crud-delete-action action="DeleteAction"></dile-crud-delete-action>
                    <demo-change-essential-action action="DemoChangeEssentialAction"></demo-change-essential-action>
                </dile-pages>
            `,
      sortOptions: [
        {
          name: 'name',
          label: 'Name',
          direction: 'asc'
      },
      ],
      initialSortField: 'name',
      initialSortDirection: 'asc',
      filters: [
        {
          name: 'essential',
          label: 'Is essential',
          active: false,
          value: false,
          type: 'boolean',
      },
      ],
      availablePageSizes: [10,25,50],
      pageSize: 25,
      insertForm: () => html`<demo-board-games-form id="insertform"></demo-board-games-form>`,
      updateForm: () => html`<demo-board-games-form id="updateform"></demo-board-games-form>`,
      customization: {
        hideCountSummary: false,
        hidePageReport: false,
        hideCheckboxSelection: false,
        hideEmptyInsertButton: false,
        disableInsert: false,
        disableEdit: false,
        disablePagination: false,
        disableSort: false,
        disableFilter: false,
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
        },
        getIdsFromResponse(results) {
          console.log(results);
          return results.data;
        }
      },
      labels: {
        insertAction: 'Insert board game',
        updateAction: 'Save',
        insertWindowTitle: 'Insert a board game',
        updateWindowTitle: 'Update a board game',
        deleteAction: 'Delete board games',
      },
      formIds: {
        insertForm: 'insertform',
        updateForm: 'updateform',
      }
    }
  }

  render() {
    return html`
      <dile-crud
        .config="${this.config}"
      ></dile-crud>
    `;
  }
}
customElements.define('demo-board-games-crud', DemoBoardGamesCrud);
