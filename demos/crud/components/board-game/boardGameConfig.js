import { html } from 'lit';
import { CrudConfigBuilder } from '@dile/crud/lib/CrudConfigBuilder';

export const boardGameConfig = new CrudConfigBuilder('https://timer.escuelait.com/api/board-games', {
  customization: {
    hideCountSummary: false,
    hideCheckboxSelection: false,
  },
  sort: {
    options: [
      {
        name: 'name',
        label: 'Name',
        direction: 'asc'
      },
      {
        name: 'year',
        label: 'Year',
        direction: 'desc'
      },
    ],
    initialSortField: 'year',
  },
  availableFilters: [
    {
      name: 'essential',
      label: 'Is essential',
      active: false,
      value: false,
      type: 'boolean',
    },
  ],
  api: {
    getElementList: (response) => response.data.result.data,
  },
  templates: {
    item: (boardGame) => html`<demo-board-game-item .boardGame=${boardGame}></demo-board-game-item>`,
    insertForm: () => html`<demo-board-game-form id="insertform"></demo-board-game-form>`,
    updateForm: () => html`<demo-board-game-form id="updateform"></demo-board-game-form>`,
    selectActions: (deleteLabel) => html`
        <dile-select>
            <select slot="select">
                <option value="DeleteAction">${deleteLabel}</option>
                <option value="DemoChangeEssentialAction">Change Essential</option>
            </select>
        </dile-select>
    `,
    formActions: (actionName) => html`
        <dile-pages attrForSelected="action" selected="${actionName}">
            <dile-crud-delete-action action="DeleteAction"></dile-crud-delete-action>
            <demo-change-essential-action action="DemoChangeEssentialAction"></demo-change-essential-action>
        </dile-pages>
    `,
  },
});