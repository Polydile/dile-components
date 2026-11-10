---
title: Sortable
package: '@dile/ui'
element: '&lt;dile-sortable&gt;'
status: stable
summary: Container that lets the user reorder its children by dragging a handle with the mouse, a finger or the keyboard.
tags: layout
---

# dile-sortable

Container that lets the user reorder its children dragging them by a handle, with the mouse, a finger or the keyboard.

The component **does not move the DOM**. It previews the movement with transforms and, when the item is dropped, emits `dile-sortable-change` with the `from` and `to` indexes. You reorder your data and render again. In Lit, use `repeat()` with a stable key so the children keep their state. The `moveItem(array, from, to)` helper returns a reordered copy of an array.

## Installation

```bash
npm i @dile/ui
```

## Usage

Import the component (and the helper if you need it).

```javascript
import '@dile/ui/components/sortable/sortable.js';
import { moveItem } from '@dile/ui/components/sortable/index.js';
```

Each child must contain a handle marked with `data-sortable-handle`. The handle can be inside the child's shadow DOM.

```javascript
html`
  <dile-sortable @dile-sortable-change=${(e) => this.items = moveItem(this.items, e.detail.from, e.detail.to)}>
    ${repeat(this.items, (item) => item.id, (item) => html`
      <div class="row">
        <span data-sortable-handle tabindex="0" aria-label="Move ${item.name}">≡</span>
        ${item.name}
      </div>
    `)}
  </dile-sortable>
`
```

```html:preview
<script type="module">
  import { moveItem } from '@dile/ui/components/sortable/index.js';
  import '@dile/ui/components/sortable/sortable.js';
  const list = document.getElementById('sortableDemo');
  let items = ['First', 'Second', 'Third', 'Fourth'];
  const render = () => {
    list.innerHTML = items.map((item) => `
      <div style="display:flex;gap:0.5rem;align-items:center;padding:0.5rem;margin-bottom:0.25rem;background:#f4f4f4;border-radius:4px">
        <span data-sortable-handle tabindex="0" style="cursor:grab;touch-action:none" aria-label="Move ${item}">≡</span> ${item}
      </div>`).join('');
  };
  list.addEventListener('dile-sortable-change', (e) => {
    items = moveItem(items, e.detail.from, e.detail.to);
    render();
  });
  render();
</script>
<dile-sortable id="sortableDemo"></dile-sortable>
```

## Handles

- Mark the handle with `data-sortable-handle`. Drags that don't start on a handle are ignored.
- Give it `touch-action: none`, so the gesture doesn't scroll the page on touch screens.
- Give it `tabindex="0"` and an accessible name, so it can be moved with the keyboard: **Alt + ↑ / Alt + ↓** moves the item one position, and the focus stays on its handle.
- While dragging, the page scrolls automatically near the top and bottom edges of the window.
- While dragging, the child gets the `data-sortable-dragging` attribute, to style it with `:host([data-sortable-dragging])` from inside the child.

## Properties

- **disabled**: Boolean, disables reordering.
- **dragging**: Boolean, reflected while an item is being dragged.

## Events

- **dile-sortable-change**: when an item is dropped in a new position. `detail: { from, to }`.

## Styling

Custom property | Description | Default
----------------|-------------|---------
--dile-sortable-transition-duration | Duration of the movement of the other items | 150ms
--dile-sortable-dragging-shadow | Shadow of the dragged item | 0 6px 16px rgba(0, 0, 0, 0.18)
--dile-sortable-dragging-background-color | Background of the dragged item | (unset)

With `prefers-reduced-motion: reduce`, the movement of the other items is not animated.
