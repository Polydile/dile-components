import { html } from 'lit';
import { CrudConfigBuilder } from '@dile/crud/lib/CrudConfigBuilder';
import '@dile/ui/components/pages/pages';

export const countryConfig = new CrudConfigBuilder('https://timer.escuelait.com/api/countries', {
  templates: {
    item: (country) => html`<demo-country-item .country=${country}></demo-country-item>`,
    insertForm: () => html`<demo-country-form id="insertform"></demo-country-form>`,
    updateForm: () => html`<demo-country-form id="updateform"></demo-country-form>`,
    help: () => html`<p>This is the help provided to the countries resource.</p>`,
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
    ]
  },
  labels: {
    helpTitle: 'Country help',
  },
  sort: {
    options: [
      {
        name: 'name',
        label: 'Name',
        direction: 'desc'
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
  }
});