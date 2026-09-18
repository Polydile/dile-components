---
title: Data Grid
package: '@dile/ui'
element: '&lt;dile-data-grid&gt;'
status: stable
summary: Reactive and accessible data grid component with customizable columns, custom cell renderers, responsive scrolling, and client/external sorting.
---

# dile-data-grid

`dile-data-grid` is a reactive and customizable data grid web component for displaying tabular data. It follows the *props-down, events-up* pattern, offering custom cell render callbacks, sorting support, and CSS theming.

## Installation

```bash
npm i @dile/ui
```

## Usage

Import the component:

```javascript
import '@dile/ui/components/data-grid/data-grid.js';
```

Use the component in HTML or Lit templates:

```html
<dile-data-grid id="myGrid"></dile-data-grid>
```

```javascript
const grid = document.getElementById('myGrid');

grid.columns = [
  { field: 'id', header: 'ID', sortable: true, width: '80px', align: 'center' },
  { field: 'name', header: 'Name', sortable: true },
  { 
    field: 'role', 
    header: 'Role',
    render: (row) => html`<strong>${row.role}</strong>`
  }
];

grid.items = [
  { id: 1, name: 'Alice', role: 'Admin' },
  { id: 2, name: 'Bob', role: 'Editor' }
];
```

## Properties

- **items** (`Array`, default: `[]`): Array of data objects to display.
- **columns** (`Array`, default: `[]`): Array of column configuration objects.
- **sortField** (`String`, default: `''`): The field currently used to sort the data.
- **sortDirection** (`String`, default: `''`): Direction of the sort (`'asc'`, `'desc'`, or `''`).
- **sortMode** (`String`, default: `'client'`): Sorting mode. Set to `'client'` to sort items internally, or `'external'` when sorting is handled by a parent component/server.
- **emptyMessage** (`String`, default: `'No data available'`): Message displayed when the items list is empty.
- **rowIdField** (`String`, default: `'id'`): Property key to uniquely identify rows.
- **striped** (`Boolean`, default: `false`): Applies alternating background colors to rows.

## Column Configuration

Each item in the `columns` array can have the following properties:

- **field** (`String`): The property key in the row object to display.
- **header** (`String`): The column header title.
- **sortable** (`Boolean`): Whether the column can be clicked to sort.
- **width** (`String`): CSS width for the column (e.g. `'100px'`, `'20%'`).
- **align** (`String`): Text alignment (`'left'`, `'center'`, or `'right'`).
- **render** (`Function`): Custom render callback `(row, rowIndex, column) => TemplateResult | string`.
- **comparator** (`Function`): Custom comparator callback `(valA, valB, rowA, rowB) => number` for custom sorting logic.

## Custom Events

- **dile-data-grid-sort**: Dispatched when a sortable column header is clicked. Detail contains `{ field, direction, column }`.
- **dile-data-grid-row-click**: Dispatched when a table row is clicked. Detail contains `{ row, index, event }`.

## CSS Custom Properties

| Custom property | Description | Default |
| :--- | :--- | :--- |
| `--dile-data-grid-font-family` | Font family for the grid | `inherit` |
| `--dile-data-grid-background-color` | Table container background | `#ffffff` |
| `--dile-data-grid-border` | Table container border | `1px solid #e2e8f0` |
| `--dile-data-grid-border-radius` | Container border radius | `6px` |
| `--dile-data-grid-header-background-color` | Header row background | `#f8fafc` |
| `--dile-data-grid-header-border-bottom` | Header bottom border | `2px solid #e2e8f0` |
| `--dile-data-grid-header-color` | Header text color | `#334155` |
| `--dile-data-grid-header-font-weight` | Header font weight | `600` |
| `--dile-data-grid-header-font-size` | Header font size | `0.875rem` |
| `--dile-data-grid-header-padding` | Header cell padding | `0.75rem 1rem` |
| `--dile-data-grid-header-hover-background-color` | Sortable header hover color | `#f1f5f9` |
| `--dile-data-grid-sort-icon-color` | Inactive sort icon color | `#94a3b8` |
| `--dile-data-grid-sort-icon-active-color` | Active sort icon color | `#2563eb` |
| `--dile-data-grid-row-border-bottom` | Row bottom border | `1px solid #f1f5f9` |
| `--dile-data-grid-row-padding` | Body cell padding | `0.75rem 1rem` |
| `--dile-data-grid-row-color` | Body cell text color | `#1e293b` |
| `--dile-data-grid-row-font-size` | Body cell font size | `0.875rem` |
| `--dile-data-grid-row-hover-background-color` | Row hover background color | `#f8fafc` |
| `--dile-data-grid-row-striped-background-color` | Striped row alternate background | `#fcfdfe` |
| `--dile-data-grid-empty-padding` | Empty state padding | `2.5rem 1rem` |
| `--dile-data-grid-empty-color` | Empty state text color | `#64748b` |
| `--dile-data-grid-empty-font-size` | Empty state font size | `0.875rem` |
