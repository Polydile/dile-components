This property sets the maximum number of items that can be selected for batch actions in the CRUD component.

It is used to show or hide the component that allows users to select all items in the current page or all items in a resource.

Note: The component itself does not check the number of items the user selects. This validation must be performed on the backend before processing the batch actions.

This is useful to prevent users from performing batch operations on an excessive number of items at once, which could impact performance.

#### Default value

By default, `maxBatchActionItems` is set to `100`.

```javascript
maxBatchActionItems: 100
```

You can override this value in your resource configuration object if you need a different limit for your use case.
