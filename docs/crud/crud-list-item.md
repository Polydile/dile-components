---
title: List item components
tags: operations
package: '@dile/crud'
summary: How to template each item rendered inside a dile-crud-list, and how to use dile-crud-item-actions.
---

# Item for lists

The [CRUD component for creating an item list](/crud/crud-list/) requires you to provide a template to display a particular item.

The item template must be provided in the [resource configuration object](/crud/resource-config/), in the `templates.item` property.

In that property, you can simply specify a template like this:

```javascript
templates: {
  item: (item) => html`This is the item ${item.name}`,    
},
```

But sometimes the item is complex enough to use a component that encapsulates its view, styles, and behavior. For this reason, we can also assign an item like this:

```javascript
templates: {
  item: (item) => html`<customer-item .item=${item}></customer-item>` ,
}
```

## Item Requirements

The item for lists has no particular requirements and doesn't need a CRUD component to implement it. It can be any arbitrary component you generate in your project.

However, it will need to define a property to bind the item data object that should be rendered.

## Generate an Item with the CLI

You can use the Dile Components CLI to generate the scaffolding for an item component like this:

```bash
dile g-item user-list-item
```

To see complete help about this generator, run the command:

```bash
dile g-item --help
```

## Example of an Item Component

You can see a simple example of an item component in the following block. 

```javascript
import { LitElement, html, css } from 'lit';

export class userListItem extends LitElement {
  static styles = [
    css`
      :host {
        display: block;
      }
      span {
        font-size: 0.875rem;
      }
    `
  ];

  static get properties() {
    return {
      item: { type: Object }
    };
  }

  render() {
    return html`
      <b>${this.item.name}</b> <span>${this.item.name}<span>
    `;
  }
}
customElements.define('user-list-item', userListItem);
```

This component only displays the name and email of a user, with a very rudimentary style, but you could display it with any other style and add more detailed information, as well as functionality if necessary.

---

# dile-crud-item-actions

The `<dile-crud-item-actions>` component centralizes and standardizes item actions (Edit, Delete, and Restore) for both traditional list items (`dile-crud-list-item`) and custom DataGrids (`dile-data-grid`).

## Installation and Import

```javascript
import '@dile/crud/components/list/crud-item-actions.js';
import { DileCrudItemActions } from '@dile/crud/components/list/src/DileCrudItemActions.js';
```

## Usage

### 1. Automatic configuration with `.config` (Recommended)

When passing the CRUD `config` object, `<dile-crud-item-actions>` automatically handles:
- Global disables (`config.customization.disableListActions`, `disableEdit`, `disableDelete`, `disableRestore`).
- Row-level conditions (`config.isItemEditable(item)`, `config.isItemDeletable(item)`).
- Custom ID computation (`config.computeItemId(item)`).
- Soft-delete detection (`item.deleted_at`).

```html
<dile-crud-item-actions
  .item=${this.item}
  .config=${this.config}
></dile-crud-item-actions>
```

### 2. Manual properties

You can also control each aspect manually or override config defaults:

```html
<dile-crud-item-actions
  .item=${this.item}
  itemId="${this.item.id}"
  ?disableEdit=${false}
  ?disableDelete=${false}
  ?disableRestore=${false}
  ?isDeleted=${false}
></dile-crud-item-actions>
```

### 3. Conditional Column in DataGrids with `hasActions(config)`

You can use the static method `DileCrudItemActions.hasActions(config)` to avoid rendering the `Actions` column when all actions are disabled:

```javascript
get columns() {
  const cols = [
    { field: 'id', header: 'ID', sortable: true },
    { field: 'name', header: 'Name', sortable: true },
  ];

  if (DileCrudItemActions.hasActions(this.config)) {
    cols.push({
      header: 'Actions',
      align: 'right',
      width: '110px',
      render: (item) => html`
        <dile-crud-item-actions
          .item=${item}
          .config=${this.config}
        ></dile-crud-item-actions>
      `,
    });
  }

  return cols;
}
```

> See also the [Rendering Modes](/crud/crud-list/#rendering-modes) section in `dile-crud-list` for how this pattern integrates with both the declarative `config.grid.columns` and the custom `config.templates.grid` rendering paths.

### Static Methods

- **`DileCrudItemActions.hasActions(config)`**: Returns `false` if `config.customization.disableListActions` is `true`, or if `disableEdit`, `disableDelete`, and `disableRestore` are all `true`. Otherwise returns `true`.

### Properties

- **item**: Object. The complete item data object.
- **config**: Object. Optional CRUD configuration object. When provided, automatically resolves edit/delete/restore permissions and item IDs.
- **itemId**: String / Number. The identifier of the item. Defaults to `config.computeItemId(item)` or `item.id`.
- **disableEdit**: Boolean. When `true`, hides the edit action button. Defaults to `false`.
- **disableDelete**: Boolean. When `true`, hides the delete action button. Defaults to `false`.
- **disableRestore**: Boolean. When `true`, hides the restore action button. Defaults to `false`.
- **isDeleted**: Boolean. When `true`, renders the restore button instead of the regular edit/delete buttons. Automatically inferred if `item.deleted_at` is set.

### Dispatched Events

- **crud-item-edit**: Dispatched when clicking the Edit button. Detail: `{ item, itemId }` (bubbles, composed).
- **crud-item-delete**: Dispatched when clicking the Delete button. Detail: `{ item, itemId }` (bubbles, composed).
- **crud-item-restore**: Dispatched when clicking the Restore button. Detail: `{ item, itemId }` (bubbles, composed).

---

# dile-crud-list-item

The `dile-crud-list-item` component accepts the following properties:

- **item**: Object. The item data object that will be rendered in the list item.
- **itemId**: String. Unique identifier for the item.
- **actionIds**: Array. Array of item IDs that are currently selected.
- **disableEdit**: Boolean. When `true`, hides the edit action icon. Defaults to `false`.
- **disableDelete**: Boolean. When `true`, hides the delete action icon. Defaults to `false`.
- **disableRestore**: Boolean. When `true`, hides the restore action icon. Defaults to `false`.
- **hideCheckboxSelection**: Boolean. When `true`, hides the checkbox for item selection. Defaults to `false`.
- **isDeleted**: Boolean. When `true`, shows the restore action instead of edit/delete actions. Defaults to `false`.

## Events

The `dile-crud-list-item` component dispatches the following events:

- **item-checkbox-changed**: Dispatched when the item checkbox is toggled. The event detail contains:
  - `checked`: Boolean indicating if the checkbox is now checked.
  - `itemId`: String with the item ID.

- **crud-item-edit**: Dispatched when the edit icon is clicked via `<dile-crud-item-actions>`. Detail: `{ item, itemId }`.
- **crud-item-delete**: Dispatched when the delete icon is clicked via `<dile-crud-item-actions>`. Detail: `{ item, itemId }`.
- **crud-item-restore**: Dispatched when the restore icon is clicked via `<dile-crud-item-actions>`. Detail: `{ item, itemId }`.

## CSS Custom Properties

The item component accepts the following CSS custom properties to customize its appearance:

| Custom Property | Description | Fallback |
|---|---|---|
| `--dile-crud-list-item-display` | Display property for the item container | `block` |
| `--dile-crud-list-item-max-width` | Maximum width for the item container | `100%` |
| `--dile-crud-list-item-width` | Width for the item container | `100%` |
| `--dile-crud-list-item-padding` | Padding for list items | `0.5rem 0.5rem` (mobile) / `0.5rem 1rem` (550px+) |
| `--dile-crud-list-item-line-separator` | Border style between items | `1px solid #ddd` |
| `--dile-checkbox-unchecked-color` | Color of unchecked checkboxes | `#888` |
| `--dile-crud-list-item-action-button-background-color` | Background color for action buttons | `transparent` |
| `--dile-crud-list-item-action-button-border-color` | Border color for action buttons | `transparent` |
| `--dile-crud-list-item-action-button-hover-background-color` | Hover background color for action buttons | `var(--dile-neutral-color)` fallback to `#f1f5f9` |
| `--dile-crud-list-item-action-button-hover-border-color` | Hover border color for action buttons | `transparent` |
| `--dile-crud-list-item-action-button-padding-y` | Vertical padding for action buttons | `0.25rem` |
| `--dile-crud-list-item-action-button-padding-x` | Horizontal padding for action buttons | `0.25rem` |
| `--dile-crud-list-item-action-button-icon-size` | Icon size for action buttons | `24px` |
| `--dile-crud-list-item-action-button-border-radius` | Border radius for action buttons | `2rem` |
| `--edit-icon-color` | Color of the edit action button icon | `var(--dile-alert-neutral-color)` fallback to `#2889a7` |
| `--dile-crud-list-item-edit-icon-hover-color` | Hover color of the edit action button icon | same as `--edit-icon-color` |
| `--delete-icon-color` | Color of the delete action button icon | `var(--dile-danger-color)` fallback to `#e33` |
| `--dile-crud-list-item-delete-icon-hover-color` | Hover color of the delete action button icon | same as `--delete-icon-color` |
| `--restore-icon-color` | Color of the restore action button icon | `var(--dile-alert-success-color)` fallback to `#00900f` |
| `--dile-crud-list-item-restore-icon-hover-color` | Hover color of the restore action button icon | same as `--restore-icon-color` |
