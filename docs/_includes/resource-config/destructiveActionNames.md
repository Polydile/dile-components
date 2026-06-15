This property defines which action names are considered destructive operations on a resource. Destructive actions are those that modify or delete resource data, such as deletion or archiving operations.

When an action is listed in `destructiveActionNames`, the `dile-crud-single` component will skip the automatic refresh of the item detail view after the action completes. This prevents unnecessary API calls when the resource state has been fundamentally altered.

**Type:** `Array<String>`

**Default Value:** `['DeleteAction']`

**Example:**

```javascript
const countryConfig = new CrudConfigBuilder('https://example.com/api/countries', {
  destructiveActionNames: ['DeleteAction', 'ArchiveAction', 'ReviewAndDeleteAction'],
});
```

In this example, any of these three actions will prevent the component from refreshing the item details after completion. The component assumes the resource no longer needs to be displayed in its current state.
