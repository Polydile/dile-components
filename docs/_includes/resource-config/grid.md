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

For the full reference of column definition properties (`field`, `header`, `width`, `align`, `sortable`, `render`, ...) and grid-level options (`stickyFirstColumn`, `striped`, `responsiveMode`, `emptyMessage`, `selectable`, `hideActionsColumn`, `actionsColumnHeader`, `actionsColumnWidth`, `actionsColumnAlign`), see [Rendering Modes → Option A](/crud/crud-list/#option-a) on the `dile-crud-list` page.

If the declarative `grid` option isn't flexible enough for what you need, you can instead render a fully custom DataGrid component via [`templates.grid`](#templates) — see [Rendering Modes → Option B](/crud/crud-list/#option-b).
