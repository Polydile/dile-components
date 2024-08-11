
import { CrudConfigBuilder } from '@dile/crud/lib/CrudConfigBuilder';
console.log('antes de crear la variable en window')
window.countryConfig = new CrudConfigBuilder('https://timer.escuelait.com/api/countries', {
  templates: {
    item: (country) => html`<demo-country-item .country=${country}></demo-country-item>`,
    insertForm: () => html`<demo-country-form id="insertform"></demo-country-form>`,
    updateForm: () => html`<demo-country-form id="updateform"></demo-country-form>`,
  },
  customization: {
    disablePagination: true,
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
console.log('después de crear la variable en window', window.countryConfig)

