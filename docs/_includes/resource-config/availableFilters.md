This property is used to define the filters that the `dile-crud` component will offer.

Filter configuration allows two types of filters that generate different query interfaces, either with checkboxes or select boxes. In the following example, you can see a filter configuration:

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
],
```

> When filters are enabled in the CRUD component, requests are made to the API sending the filter state through the query string.

#### Default `availableFilters` value

By default, `availableFilters` is an empty array.

```javascript
availableFilters: []
```

