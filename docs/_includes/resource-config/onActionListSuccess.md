This property accepts a callback function that is executed when a batch action in the `dile-crud` component completes successfully.

The callback function receives an `actionSuccessDetail` object containing information about the completed action. This is useful for performing additional logic based on the action result, such as refreshing related data or displaying custom messages.

**Type:** `Function`

**Parameters:**
- `actionSuccessDetail` (Object): An object with the following properties:
  - `msg` (String): The message returned by the server
  - `action` (String): The name of the action that was processed
  - `data` (any): Additional data returned by the server

**Default Value:**
```javascript
onActionListSuccess(actionSuccessDetail) {}
```

## Example

```javascript
import { html } from 'lit';
import { CrudConfigBuilder } from '@dile/crud/lib/CrudConfigBuilder';

export const countryConfig = new CrudConfigBuilder('https://example.com/api/countries', {
  // ... other config properties
  
  onActionListSuccess(actionDetail) {
    console.log(`Action "${actionDetail.action}" completed successfully`);
    console.log(`Server message: ${actionDetail.msg}`);
    
    if(actionDetail.action === 'PublishAction') {
      // Refresh related data after publishing
      this.refreshPublishedItems();
    }
  },
});
```

## Context

When the callback is executed, the `this` context refers to the `dile-crud` component instance. This allows you to access component methods and properties if needed.

## Alternative: Using Custom Events

Instead of using the `onActionListSuccess` callback, you can listen to the `crud-action-success` custom event dispatched by the `dile-crud` component:

```javascript
const crudElement = document.querySelector('dile-crud');
crudElement.addEventListener('crud-action-success', (event) => {
  const { msg, action, data } = event.detail;
  console.log(`Action "${action}" completed:`, msg);
});
```

For more information about custom events, see the [dile-crud-actions documentation](/crud/crud-actions/).
