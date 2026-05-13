---
title: Item list
tags: operations
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

## CSS Custom Properties

The item component accepts the following CSS custom properties to customize its appearance:

| Custom Property | Default Value | Description |
|---|---|---|
| `--dile-crud-list-item-line-separator` | `1px solid #ddd` | Border style between items |
| `--dile-checkbox-unchecked-color` | `#888` | Color of unchecked checkboxes |
| `--dile-icon-size` | `24px` | Size of action icons |
| `--dile-icon-color` | `#33ad67` | Color of edit icon |
| `--edit-icon-color` | `#33ad67` | Color of the edit action icon |
| `--delete-icon-color` | `#e33` | Color of the delete action icon |

You can customize these properties in your CSS to match your design:

```css
dile-crud-list-item {
  --dile-crud-list-item-line-separator: 2px solid #ccc;
  --dile-checkbox-unchecked-color: #666;
  --dile-icon-size: 20px;
  --edit-icon-color: #0066cc;
  --delete-icon-color: #cc0000;
}
```