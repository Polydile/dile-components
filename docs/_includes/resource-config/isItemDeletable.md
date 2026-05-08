This property is a function that determines whether a specific item can be deleted or not. It allows you to implement custom logic to enable or disable the delete action on a per-item basis.

The function receives the item element as a parameter and should return a boolean value:
- `true` if the item can be deleted
- `false` if the item cannot be deleted

This works in conjunction with the `customization.disableDelete` boolean property. An item is considered deletable only if:
1. `customization.disableDelete` is `false` (deletion is globally enabled)
2. AND `isItemDeletable(item)` returns `true` (the specific item is deletable)

#### Example usage

```javascript
isItemDeletable(item) {
  // Prevent deletion of items that have child relationships
  return !item.hasChildren;
}
```

#### Default value

By default, the function always returns `true`, allowing all items to be deleted (as long as `customization.disableDelete` is `false`).

```javascript
isItemDeletable(element) {
  return true;
}
```
