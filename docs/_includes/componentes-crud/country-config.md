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
</script>
```