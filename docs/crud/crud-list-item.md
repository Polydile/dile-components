---
title: List item components
tags: operations
package: '@dile/crud'
summary: How to template each item rendered inside a dile-crud-list.
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

## Properties

The `dile-crud-list-item` component accepts the following properties:

- **item**: Object. The item data object that will be rendered in the list item.
- **itemId**: String. Unique identifier for the item.
- **actionIds**: Array. Array of item IDs that are currently selected.
- **disableEdit**: Boolean. When `true`, hides the edit action icon. Defaults to `false`.
- **disableDelete**: Boolean. When `true`, hides the delete action icon. Defaults to `false`.
- **hideCheckboxSelection**: Boolean. When `true`, hides the checkbox for item selection. Defaults to `false`.
- **isDeleted**: Boolean. When `true`, shows the restore action instead of edit/delete actions. Defaults to `false`.

## Events

The `dile-crud-list-item` component dispatches the following events:

- **item-checkbox-changed**: Dispatched when the item checkbox is toggled. The event detail contains:
  - `checked`: Boolean indicating if the checkbox is now checked.
  - `itemId`: String with the item ID.

- **crud-item-edit**: Dispatched when the edit icon is clicked. The event detail contains:
  - `item`: Object with the complete item data.
  - `itemId`: String with the item ID.

- **crud-item-delete**: Dispatched when the delete icon is clicked. The event detail contains:
  - `item`: Object with the complete item data.
  - `itemId`: String with the item ID.

- **crud-item-restore**: Dispatched when the restore icon is clicked. The event detail contains:
  - `item`: Object with the complete item data.
  - `itemId`: String with the item ID.

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
| `--edit-icon-color` | Color of the edit action button icon | `var(--dile-alert-neutral-color)` fallback to `#2889a7` |
| `--delete-icon-color` | Color of the delete action button icon | `var(--dile-danger-color)` fallback to `#e33` |
| `--restore-icon-color` | Color of the restore action button icon | `var(--dile-alert-success-color)` fallback to `#00900f` |

You can customize these properties in your CSS to match your design:

```css
dile-crud-list-item {
  --dile-crud-list-item-line-separator: 2px solid #ccc;
  --dile-crud-list-item-padding: 0.75rem;
  --dile-checkbox-unchecked-color: #666;
  --edit-icon-color: #0066cc;
  --delete-icon-color: #cc0000;
  --restore-icon-color: #00aa00;
}
```