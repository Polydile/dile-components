import { html } from 'lit';
import { CrudConfigBuilder } from '@dile/crud/lib/CrudConfigBuilder';
import '@dile/ui/components/pages/pages';
import './demo-country-item.js';

export const countrySwitchConfig = new CrudConfigBuilder('https://timer.escuelait.com/api/countries', {
  maxBatchActionItems: 100,
  grid: {
    columns: [
      {
        field: 'name',
        header: 'Name',
        sortable: true,
      },
      {
        field: 'id',
        header: 'ID',
        width: '70px',
        align: 'center',
        sortable: true,
      },
      {
        field: 'continent',
        header: 'Continent',
        sortable: false,
      },
    ],
    stickyFirstColumn: true,
    striped: true,
    responsiveMode: 'scroll',
    actionsColumnSticky: 'right',
    actionsColumnHeader: ' ',
  },
  templates: {
    item: (country) => html`<demo-country-item .country="${country}"></demo-country-item>`,
    insertForm: () => html`<demo-country-form id="insertform"></demo-country-form>`,
    updateForm: () => html`<demo-country-form id="updateform"></demo-country-form>`,
    help: () => html`<p>This demo shows the list/grid view switch button.</p>`,
    detail: (country) => html`<demo-country-detail .country="${country}"></demo-country-detail>`,
    relations: (country) => html`<p>${country.name}</p><demo-country-relations .country=${country}></demo-country-relations>`,
  },
  customization: {
    disablePagination: true,
    disableHelp: false,
    disableKeywordSearch: false,
    disableSort: false,
    disableFilter: true,
    hideCheckboxSelection: false,
  },
  labels: {
    helpTitle: 'Country help',
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
});
