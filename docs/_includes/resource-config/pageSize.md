This property allows you to configure the pagination settings for list views in the CRUD component.

The `pageSize` property is an object with two main configurations:

#### `available` (Array)

An array of page size options that users can select from. These numbers represent how many items should be displayed per page.

#### `initial` (Number)

The initial page size that will be selected when the component first loads. This value must be one of the values in the `available` array.

#### Example usage

```javascript
pageSize: {
  available: [10, 25, 50, 100],
  initial: 25,
},
```

In this example, users can choose to display 10, 25, 50, or 100 items per page, and by default, the component will show 25 items per page.

#### Default value

By default, the page size configuration includes common pagination options:

```javascript
pageSize: {
  available: [10, 25, 50],
  initial: 25,
},
```
