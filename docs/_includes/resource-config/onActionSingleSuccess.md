This property accepts a callback function that is executed when an action in the `dile-crud-single` component completes successfully.

The callback function receives an `actionSuccessDetail` object containing information about the completed action. This is useful for performing additional logic based on the action result, such as refreshing related data or triggering dependent operations.

**Type:** `Function`

**Parameters:**
- `actionSuccessDetail` (Object): An object with the following properties:
  - `msg` (String): The message returned by the server
  - `action` (String): The name of the action that was processed
  - `data` (any): Additional data returned by the server

**Default Value:**
```javascript
onActionSingleSuccess(actionSuccessDetail) {}
```

## Example

```javascript
import { html } from 'lit';
import { CrudConfigBuilder } from '@dile/crud/lib/CrudConfigBuilder';

export const countryConfig = new CrudConfigBuilder('https://example.com/api/countries', {
  // ... other config properties
  
  onActionSingleSuccess(detail) {
    console.log(`Action on single process defined with onActionSingleSuccess and this detail`, detail, this);
    
    if(detail.action === 'SetEurope') {
      // Refresh relationships after setting continent
      this.refreshRelations();
    }
  },
});
```

## Context

When the callback is executed, the `this` context refers to the `dile-crud-single` component instance. This allows you to access component methods and properties such as `refresh()` to reload the item details after an action completes.

```javascript
onActionSingleSuccess(detail) {
  if(detail.action === 'ArchiveAction') {
    // Trigger a navigation after archiving
    window.history.back();
  }
}
```

## Alternative: Using Custom Events

Instead of using the `onActionSingleSuccess` callback, you can listen to the `crud-action-success` custom event dispatched by the `dile-crud-single` component:

```javascript
const singleElement = document.querySelector('dile-crud-single');
singleElement.addEventListener('crud-action-success', (event) => {
  const { msg, action, data } = event.detail;
  console.log(`Single action "${action}" completed:`, msg);
});
```

You can also listen for error events using `crud-action-error`:

```javascript
singleElement.addEventListener('crud-action-error', (event) => {
  const { msg } = event.detail;
  console.error(`Action failed:`, msg);
});
```

For more information about custom events, see the [dile-crud-actions documentation](/crud/crud-actions/).
