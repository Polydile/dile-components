This property allows you to customize the behavior and visibility of various elements and features in the CRUD component.

The `customization` property is an object containing multiple boolean flags that control different aspects of the component's functionality and UI.

#### Available customization options

- **`disableKeywordSearch`** (boolean): When set to `true`, disables the keyword search functionality. Default: `true`.
- **`hideCountSummary`** (boolean): When set to `true`, hides the summary showing the total count of items. Default: `false`.
- **`hidePageReport`** (boolean): When set to `true`, hides the page information (e.g., "Page 1 of 5"). Default: `false`.
- **`hideCheckboxSelection`** (boolean): When set to `true`, hides checkboxes used for selecting multiple items. Default: `true`.
- **`hideEmptyInsertButton`** (boolean): When set to `true`, hides the insert button when no items exist. Default: `false`.
- **`disableInsert`** (boolean): When set to `true`, disables the ability to insert new items. Default: `false`.
- **`disableEdit`** (boolean): When set to `true`, disables the ability to edit existing items. Can be overridden per-item using `isItemEditable()`. Default: `false`.
- **`disableDelete`** (boolean): When set to `true`, disables the ability to delete items. Can be overridden per-item using `isItemDeletable()`. Default: `false`.
- **`disableRestore`** (boolean): When set to `true`, disables the restore functionality for soft-deleted items. Default: `false`.
- **`disablePagination`** (boolean): When set to `true`, disables pagination controls. Default: `true`.
- **`disableSort`** (boolean): When set to `true`, disables sorting functionality. Default: `true`.
- **`disableFilter`** (boolean): When set to `true`, disables filtering functionality. Default: `true`.
- **`disableHelp`** (boolean): When set to `true`, hides the help information. Default: `true`.

#### Example usage

```javascript
customization: {
  disableKeywordSearch: false,  // Enable keyword search
  hideCountSummary: false,      // Show total count
  hidePageReport: false,        // Show page information
  hideCheckboxSelection: false, // Show selection checkboxes
  disablePagination: false,     // Enable pagination
  disableSort: false,           // Enable sorting
  disableFilter: false,         // Enable filtering
  disableHelp: false,           // Show help
  disableEdit: false,           // Enable editing
  disableDelete: false,         // Enable deletion
},
```

#### Default value

The default configuration disables most features and hides selection UI elements:

```javascript
customization: {
  disableKeywordSearch: true,
  hideCountSummary: false,
  hidePageReport: false,
  hideCheckboxSelection: true,
  hideEmptyInsertButton: false,
  disableInsert: false,
  disableEdit: false,
  disableDelete: false,
  disableRestore: false,
  disablePagination: true,
  disableSort: true,
  disableFilter: true,
  disableHelp: true,
},
```
