This property configures the sorting options available in the CRUD component, allowing users to sort items by different fields and in different directions (ascending or descending).

The `sort` property is an object with two main configurations:

#### `options` (Array)

An array of available sort options. Each option should be an object with the following properties:

- **`name`** (string): The name of the field to sort by. This should match the field name in your API response.
- **`label`** (string): The human-readable label that will be displayed in the UI for this sort option.
- **`direction`** (string): The sort direction - either `'asc'` for ascending or `'desc'` for descending.

#### `initialSortField` (string | null)

The name of the sort field that should be initially selected when the component loads. This value must match one of the `name` values in the `options` array.

#### Example usage

```javascript
sort: {
  options: [
    {
      name: 'name',
      label: 'Name',
      direction: 'asc'
    },
    {
      name: 'year',
      label: 'Year',
      direction: 'desc'
    },
  ],
  initialSortField: 'year',
},
```

In this example, two sort options are defined: "Name" (ascending) and "Year" (descending). When the component first loads, it will be sorted by the "year" field in descending order.

#### Default value

By default, no sort options are available and no initial sort field is set:

```javascript
sort: {
  options: [],
  initialSortField: null,
},
```

This means sorting will be disabled unless you provide custom sort options in your resource configuration.
