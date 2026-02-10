import { html } from 'lit';
import { CrudConfigBuilder } from '@dile/crud/lib/CrudConfigBuilder';
import { ResponseApiAdapter } from '@dile/crud/lib/ResponseApiAdapter';
import '@dile/ui/components/pages/pages.js';
import '@dile/crud/components/action/crud-delete-action.js'
import '../components/board-game/board-game-item.js';
import '../components/board-game/board-game-form.js';
import '../components/board-game/board-game-detail.js';

class BoardGameResponseApiAdapter extends ResponseApiAdapter {
  getElementList() {
    return this.response.data.result.data;
  }
}

export const boardGameConfig = new CrudConfigBuilder('https://timer.escuelait.com/api/board-games', {
  responseAdapter: new BoardGameResponseApiAdapter(),
  templates: {
    item: (item) => html`<board-game-item .item=${item}></board-game-item>` ,
    insertForm: () => html`<board-game-form id="insertform"></board-game-form>` ,
    updateForm: () => html`<board-game-form id="updateform"></board-game-form>` ,
    help: () => html`<p>BoardGame help.</p>`,
    detail: (item) => html`<board-game-detail .item=${item}></board-game-detail>` ,
    formActions: (actionName, actionIds) => html`
        <dile-pages attrForSelected="action" selected="${actionName}">
            <dile-crud-delete-action action="DeleteAction"></dile-crud-delete-action>
        </dile-pages>
    `,
    formSingleActions: (actionName, item) => html`
        <dile-pages attrForSelected="action" selected="${actionName}">
            <dile-crud-delete-action action="DeleteAction"></dile-crud-delete-action>
        </dile-pages>
    `,
  },
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
    ],
    initialSortField: 'name',
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
      name: 'year',
      label: 'Año',
      active: false,
      value: false,
      type: 'select',
      options: [
        {
          value: '2012',
          label: 'Año 2012'
        },
        {
          value: '2013',
          label: 'Año 2013'
        },
      ]
    },
  ],
  actions: {
    list: [
      {
        label: 'Delete resorce',
        name: 'DeleteAction',
        destructive: true,
      },
    ],
    single: [
      {
        label: 'Delete resource',
        name: 'DeleteAction',
        destructive: true,
      },
    ],
  },
});