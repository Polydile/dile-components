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
- Optional properties: `optionLabelField` (default: 'name'), `optionValueField` (default: 'id'), `resultDataProperty`, `getSelectResultList`
- Learn more in the [`dile-select-ajax-simple` documentation](/crud/select-ajax-simple.html)

> When filters are enabled in the CRUD component, requests are made to the API sending the filter state through the query string.

#### Default `availableFilters` value

By default, `availableFilters` is an empty array.

```javascript
availableFilters: []
```

