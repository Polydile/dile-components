import { html } from 'lit';
import { CrudConfigBuilder } from '@dile/crud/lib/CrudConfigBuilder';
import '@dile/ui/components/pages/pages';

export const countryGridConfig = new CrudConfigBuilder('https://timer.escuelait.com/api/countries', {
  maxBatchActionItems: 100,
  grid: {
    columns: [
      {
        field: 'id',
        header: 'ID',
        width: '70px',
        align: 'center',
        sortable: true,
      },
      {
        field: 'name',
        header: 'Name',
        sortable: true,
      },
      {
        field: 'continent',
        header: 'Continent',
        // Not sortable: continent is resolved from a related table by the backend,
        // which has no support for ordering by it — see docs/crud/crud-list.md#option-a.
        render: (country) => html`
          <span style="display: inline-block; padding: 0.2rem 0.5rem; border-radius: 12px; background-color: var(--dile-primary-light-color, #e0f2fe); color: var(--dile-primary-dark-color, #0369a1); font-size: 0.8rem; font-weight: 600;">
            ${country.continent || 'N/A'}
          </span>
        `,
      },
    ],
    stickyFirstColumn: true,
    striped: true,
  },
  templates: {
    insertForm: () => html`<demo-country-form id="insertform"></demo-country-form>`,
    updateForm: () => html`<demo-country-form id="updateform"></demo-country-form>`,
    help: () => html`<p>This is the help provided to the countries resource with DataGrid.</p>`,
    detail: (country) => html`<demo-country-detail .country="${country}"></demo-country-detail>`,
    relations: (country) => html`<p>${country.name}</p><demo-country-relations .country=${country}></demo-country-relations>`,
    formSingleActions: (actionName, country) => html`
        <dile-pages attrForSelected="action" selected="${actionName}">
            <demo-set-europe-as-continent-action action="SetEurope" .country=${country}></demo-set-europe-as-continent-action>
            <demo-set-asia-as-continent-action action="SetAsia" .country=${country}></demo-set-asia-as-continent-action>
        </dile-pages>
    `,
  },
  customization: {
    disablePagination: true,
    disableHelp: false,
    disableKeywordSearch: false,
    disableSort: false,
    disableFilter: false,
    hideCheckboxSelection: false,
  },
  actions: {
    single: [
      {
        name: "SetEurope",
        label: "Set Europe as continent"
      },
      {
        name: "SetAsia",
        label: "Set Asia as continent"
      },
      {
        name: "Foo",
        label: "Show console message",
        onClick: (element) => console.log('Foo Action:', element),
      }
    ],
    directSingleActions: ['SetEurope', 'Foo'],
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
      {
        name: 'id',
        label: 'Id',
        direction: 'asc'
      },
    ],
    initialSortField: 'name',
  },
  availableFilters: [
    {
      name: 'continent',
      label: 'Continent',
      active: false,
      value: false,
      type: 'select',
      options: [
        {
          value: 'Europe',
          label: 'Europe'
        },
        {
          value: 'Africa',
          label: 'Africa'
        },
        {
          value: 'Asia',
          label: 'Asia'
        },
      ]
    },
  ],
  onActionSingleSuccess(detail) {
    console.log('Action on single process defined with onActionSingleSuccess and this detail', detail, this);
  },
});
