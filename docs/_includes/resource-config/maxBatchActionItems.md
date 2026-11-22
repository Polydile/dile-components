This property sets the maximum number of items that can be selected for batch actions in the CRUD component.

The "select all" menu shows the options for the current page and for all matching items. When an option would select more items than the limit, it is shown disabled, with a message telling the user the limit and suggesting to filter the list. When the user selects more items than the limit one by one, the actions menu shows a warning and doesn't let them run the action.

The effective limit is the lower of `maxBatchActionItems` and the `maxIds` value the server may send with paginated listings (see [Response adapter](/crud/response-adapter/)). So the backend can dictate the limit and the frontend doesn't need to repeat it.

The backend must still check the number of items before processing the batch actions.

This is useful to prevent users from performing batch operations on an excessive number of items at once, which could impact performance.

#### Default value

By default, `maxBatchActionItems` is set to `100`.

```javascript
maxBatchActionItems: 100
```

You can override this value in your resource configuration object if you need a different limit for your use case.
