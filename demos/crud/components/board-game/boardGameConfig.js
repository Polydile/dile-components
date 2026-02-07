import { html } from 'lit';
import { CrudConfigBuilder } from '@dile/crud/lib/CrudConfigBuilder';
import { ResponseApiAdapter } from '@dile/crud/lib/ResponseApiAdapter';
import '@dile/ui/components/pages/pages';

class BoardGameResponseApiAdapter extends ResponseApiAdapter {
  getElementList() {
    return this.response.data.result.data;
  }
}

export const boardGameConfig = new CrudConfigBuilder('https://timer.escuelait.com/api/board-games', {
  customization: {
    hideCountSummary: false,
    hideCheckboxSelection: false,
    disablePagination: false,
    disableHelp: true,
    disableKeywordSearch: false,
    disableSort: false,
    disableFilter: false,
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
  responseAdapter: new BoardGameResponseApiAdapter(),
  actions: {
    list: [
      {
        label: 'Delete board games',
        name: 'DeleteAction',
        destructive: true,
      },
      {
        label: 'Change Essential',
        name: 'DemoChangeEssentialAction'
      },
      {
        label: 'Change name',
        name: 'DemoChangeNameAction'
      },
    ],
  },
  templates: {
    item: (boardGame) => html`<demo-board-game-item .boardGame=${boardGame}></demo-board-game-item>`,
    insertForm: (belongsTo, relationId) => html`<demo-board-game-form id="insertform" belongsTo="${belongsTo}" relationId="${relationId}"></demo-board-game-form>`,
    updateForm: () => html`<demo-board-game-form id="updateform"></demo-board-game-form>`,
    formActions: (actionName, actionIds) => html`
        <dile-pages attrForSelected="action" selected="${actionName}">
            <dile-crud-delete-action action="DeleteAction"></dile-crud-delete-action>
            <demo-change-essential-action action="DemoChangeEssentialAction" .actionIds=${actionIds}></demo-change-essential-action>
            <demo-change-name-action action="DemoChangeNameAction" .actionIds=${actionIds}></demo-change-name-action>
        </dile-pages>
    `,
  },
  onActionListSuccess: (detail) => { console.log('Captured process on action list success with this detail: ', detail);},
});