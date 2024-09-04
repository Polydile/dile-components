```html:preview
<script type="module">
import { html } from 'lit';
import { CrudConfigBuilder } from '@dile/crud/lib/CrudConfigBuilder';

// For the correct functioning of this declaration in the demo system, we have defined the variable with the configuration object globally. Normally, it would be created in a module and exported.
window.countryConfig = new CrudConfigBuilder('https://timer.escuelait.com/api/countries', {
  templates: {
    item: (country) => html`<demo-country-item .country=${country}></demo-country-item>`,
    insertForm: () => html`<demo-country-form id="insertform"></demo-country-form>`,
    updateForm: () => html`<demo-country-form id="updateform"></demo-country-form>`,
    help: () => html`<p>This is the help provided to the countries resource.</p>`,
    detail: (country) => html`<demo-country-detail .country="${country}"></demo-country-detail>`,
    relations: (country) => html`<demo-country-relations .country=${country}></demo-country-relations>`,
    formSingleActions: (actionName) => html`
        <dile-pages attrForSelected="action" selected="${actionName}">
            <demo-set-europe-as-continent-action action="SetEurope"></demo-set-europe-as-continent-action>
            <demo-set-asia-as-continent-action action="SetAsia"></demo-set-asia-as-continent-action>
        </dile-pages>
    `,
  },
  customization: {
    disablePagination: true,
    disableHelp: false,
    disableKeywordSearch: false,
    disableSort: false,
    disableFilter: false,
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
</script>
```