This property is a function that determines whether a specific item can be edited or not. It allows you to implement custom logic to enable or disable the edit action on a per-item basis.

The function receives the item element as a parameter and should return a boolean value:
- `true` if the item can be edited
- `false` if the item cannot be edited

This works in conjunction with the `customization.disableEdit` boolean property. An item is considered editable only if:
1. `customization.disableEdit` is `false` (editing is globally enabled)
2. AND `isItemEditable(item)` returns `true` (the specific item is editable)

#### Example usage

```javascript
isItemEditable(item) {
  // Only allow editing of items with status 'active' or 'draft'
  return ['active', 'draft'].includes(item.status);
}
```

#### Default value

By default, the function always returns `true`, allowing all items to be edited (as long as `customization.disableEdit` is `false`).

```javascript
isItemEditable(element) {
  return true;
}
```
