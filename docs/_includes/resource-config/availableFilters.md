This property is used to define the filters that the `dile-crud` component will offer.

Filter configuration allows three types of filters that generate different query interfaces: checkboxes, static select boxes, or dynamic select boxes loaded via AJAX. In the following example, you can see a filter configuration:

```json
availableFilters: [
  {
    type: 'boolean',
    name: 'column',
    label: 'Column',
    active: false,
    value: false,
  },
  {
    type: 'select',
    name: 'column2',
    label: 'Column 2',
    active: false,
    value: false,
    options: [
      {
        value: '1',
        label: 'Value 1'
      },
      {
        value: '2',
        label: 'Value 2'
      },
    ]
  },
  {
    type: 'select_ajax',
    name: 'category',
    label: 'Category',
    active: false,
    value: false,
    endpoint: '/api/categories',
    optionLabelField: 'name',
    optionValueField: 'id',
  },
],
```

#### Filter types

**`boolean`** — A checkbox filter
- Generates a boolean interface for true/false filtering
- Properties: `type`, `name`, `label`, `active`, `value`

**`select`** — A static select filter with predefined options
- Generates a select dropdown with hardcoded options
- Required properties: `type`, `name`, `label`, `options` (array with `value` and `label`)
- Properties: `type`, `name`, `label`, `active`, `value`, `options`

**`select_ajax`** — A dynamic select filter that loads options from an API endpoint
- Generates a select dropdown with options loaded via AJAX
- Options are loaded once when the component connects
- Required properties: `type`, `name`, `label`, `endpoint` (API URL to fetch options)
- Optional properties: `optionLabelField` (default: 'name'), `optionValueField` (default: 'id'), `resultDataProperty`, `getSelectResultList`, `additionalQueryString`
- The active filter chip shows the label of the selected option (its `optionLabelField`). While the options are not loaded yet (for example, a filter that starts active with a `value`), or if the value is not among the options, the chip shows the filter `label`, and it is updated as soon as the options arrive
- The CRUD stores the resolved option label in the filter's `valueLabel` property and clears it when the filter is removed. You don't need to set it in the configuration
- Learn more in the [`dile-select-ajax-simple` documentation](/crud/select-ajax-simple.html)

#### Active filter chips

Each active filter is shown as a chip above the list, which can be clicked to remove the filter:

- `boolean` filters show the filter `label`.
- `select` filters show the label of the selected option.
- `select_ajax` filters show the label of the selected option, or the filter `label` while it is unknown.

With several filters active it can be clearer to show the filter name too. Set `showLabelInChip: true` in a `select` or `select_ajax` filter to render the chip as `label: value` (for example "Tag: Strategy"). It is `false` by default, so existing chips do not change.

```javascript
{
  type: 'select_ajax',
  name: 'tag',
  label: 'Tag',
  active: false,
  value: '',
  endpoint: '/api/tags',
  showLabelInChip: true,
}
```

> When filters are enabled in the CRUD component, requests are made to the API sending the filter state through the query string.

#### Default `availableFilters` value

By default, `availableFilters` is an empty array.

```javascript
availableFilters: []
```

