import { html } from 'lit';
import { CrudConfigBuilder } from '@dile/crud/lib/CrudConfigBuilder';

export const countryConfig = new CrudConfigBuilder('https://timer.escuelait.com/api/countries', {
  templates: {
    item: (country) => html`<demo-country-item .country=${country}></demo-country-item>`,
    insertForm: () => html`<demo-country-form id="insertform"></demo-country-form>`,
    updateForm: () => html`<demo-country-form id="updateform"></demo-country-form>`,
    help: () => html`<p>This is the help provided to the countries resource.</p>`,
  },
  customization: {
    disablePagination: true,
    disableHelp: false,
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
                name: 'Europe',
                label: 'Europe'
            },
            {
                name: 'Africa',
                label: 'Africa'
            },
            {
              name: 'Asia',
              label: 'Asia'
          },
        ]
      },
    ],
});