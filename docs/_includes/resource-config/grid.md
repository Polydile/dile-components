This property lets a list render its results as a DataGrid (a table with columns) instead of one item template per element, by declaring a list of columns rather than building a custom component.

**Type:** `Object | null`

**Default Value:** `null` — grid mode is off, and the list renders each item via [`templates.item`](#templates).

**Example:**

```javascript
grid: {
  columns: [
    { field: 'id', header: 'ID', width: '70px', align: 'center', sortable: true },
    { field: 'name', header: 'Name', sortable: true },
  ],
  stickyFirstColumn: true,
  striped: true,
}
```

Setting `grid.columns` is the **recommended, simplest way** to get a DataGrid: `dile-crud-list` renders a built-in grid component for you, including an automatic `Actions` column with edit/delete/restore buttons.

For the full reference of column definition properties (`field`, `header`, `width`, `align`, `sortable`, `render`, ...) and grid-level options (`stickyFirstColumn`, `striped`, `responsiveMode`, `emptyMessage`, `selectable`, `hideActionsColumn`, `actionsColumnHeader`, `actionsColumnWidth`, `actionsColumnAlign`, `actionsColumnSticky`), see [Rendering Modes → Option A](/crud/crud-list/#option-a) on the `dile-crud-list` page.

If the declarative `grid` option isn't flexible enough for what you need, you can instead render a fully custom DataGrid component via [`templates.grid`](#templates) — see [Rendering Modes → Option B](/crud/crud-list/#option-b).

### Combining `grid` with `templates.item`

You don't have to choose one or the other. If you configure **both** `grid` (or `templates.grid`) and an explicit `templates.item` for the same resource, `dile-crud-list` renders the item view by default and `dile-crud` shows a toggle button — in `navActionsTemplate()` — that lets users switch to the grid and back. See [List/Grid View Switch](/crud/crud-component/#list-grid-view-switch) on the `dile-crud` page for the full behavior, including the responsive icon-only button and the `customization.disableListWiewSwitch` flag that turns it off.
