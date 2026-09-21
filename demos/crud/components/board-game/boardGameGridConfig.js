import { html } from 'lit';
import { CrudConfigBuilder } from '@dile/crud/lib/CrudConfigBuilder';
import { ResponseApiAdapter } from '@dile/crud/lib/ResponseApiAdapter';
import '@dile/ui/components/pages/pages';
import './demo-board-game-data-grid.js';

class BoardGameResponseApiAdapter extends ResponseApiAdapter {
  getElementList() {
    return this.response.data.result.data;
  }
}

export const boardGameGridConfig = new CrudConfigBuilder('https://timer.escuelait.com/api/board-games', {
  maxBatchActionItems: 200,
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
    {
      name: 'tag',
      endpoint: 'https://timer.escuelait.com/api/tags',
      label: 'Tag',
      active: false,
      value: false,
      type: 'select_ajax',
      optionLabelField: 'name',
      optionValueField: 'id',
    }
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
    single: [
      {
        label: 'Delete board games',
        name: 'DeleteAction',
        destructive: true,
      },
    ],
  },
  templates: {
    grid: (elements, actionIds, config) => html`
      <demo-board-game-data-grid
        .items=${elements}
        .selectedIds=${actionIds}
        .config=${config}
      ></demo-board-game-data-grid>
    `,
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
  onActionListSuccess: (detail) => { console.log('Captured process on action list success with this detail: ', detail); },
});
