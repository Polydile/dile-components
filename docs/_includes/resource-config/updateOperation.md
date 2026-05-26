The `updateOperation` property allows you to customize how the CRUD system handles the edit/update operation when a user clicks the edit button on an item.

## Default Behavior

By default, the `updateOperation` is configured to open the update form in a modal dialog:

```javascript
updateOperation: {
  type: 'modal'
}
```

## Custom Handler

You can override this behavior by providing a custom handler function. This is useful when you want to:
- Navigate to a different page for editing
- Use a different interface based on item properties
- Trigger custom logic before opening the edit form

To use a custom handler, configure `updateOperation` like this:

```javascript
updateOperation: {
  type: 'handler',
  handler: (itemId, crudComponent, item) => {
    // Your custom logic here
  }
}
```

### Handler Parameters

- **itemId**: String or Number. The unique identifier of the item being edited.
- **crudComponent**: LitElement. Reference to the CRUD component instance.
- **item**: Object. The complete item data object.

### Handler Example

Here's a practical example that navigates to different edit pages based on the item's type:

```javascript
import { navigateService } from '@your-app/services';

const countryConfig = new CrudConfigBuilder('https://example.com/api/countries', {
  updateOperation: {
    type: 'handler',
    handler: (itemId, crudComponent, item) => {
      if (item.rectificative_type === 'S') {
        navigateService.goToUrl(`/rectificacion-wizard/${itemId}`);
      } else {
        navigateService.goToUrl(`/invoice-wizard/${itemId}`);
      }
    },
  },
});
```

## Configuration Structure

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `type` | String | Yes | Either `'modal'` or `'handler'` |
| `handler` | Function | Only if type is 'handler' | Custom function to handle the update operation |
