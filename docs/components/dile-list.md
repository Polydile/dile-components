---
title: List
package: '@dile/ui'
element: '&lt;dile-list&gt;'
status: experimental
summary: Container and orchestrator component for lists, providing layout framing, property propagation, single/multiple selection, keyboard navigation with roving tabindex, and empty/loading states.
tags: layout
---

# dile-list

Web Component that acts as the container and orchestrator for list layouts. It works in synergy with `<dile-list-item>`, providing unified borders and rounded corners, property cascade down to child items, selection state management (single or multiple), keyboard navigation via roving tabindex, and built-in empty and loading states.

## Installation

```bash
npm i @dile/ui
```

## Usage

Import the components:

```javascript
import '@dile/ui/components/list/list.js';
import '@dile/ui/components/list/list-item.js';
```

Use the component:

```html:preview
<script type="module">
  import '@dile/ui/components/list/list.js';
  import '@dile/ui/components/list/list-item.js';
  import '@dile/iconlib/lucide-icons/user.js';
  import '@dile/iconlib/lucide-icons/chevron-right.js';
  import '@dile/iconlib/lucide-icons/shield.js';
  import '@dile/iconlib/lucide-icons/credit-card.js';
</script>

<dile-list style="max-width: 500px;" divider="full">
  <dile-list-item icon-prefix="lucide.user" icon-suffix="lucide.chevron-right">
    Account Settings
  </dile-list-item>
  <dile-list-item icon-prefix="lucide.shield" icon-suffix="lucide.chevron-right">
    Privacy & Security
  </dile-list-item>
  <dile-list-item icon-prefix="lucide.credit-card" icon-suffix="lucide.chevron-right">
    Billing & Plans
  </dile-list-item>
</dile-list>
```

> [!TIP]
> Notice that the last list item automatically suppresses its bottom divider so it never clashes with the outer border of `<dile-list>`.

---

## Cascading Properties

Instead of repeating attributes like `density="compact"` or `clickable` on every item, set them directly on `<dile-list>`. The container automatically propagates them to its child items:

```html:preview
<script type="module">
  import '@dile/iconlib/lucide-icons/folder.js';
  import '@dile/iconlib/lucide-icons/star.js';
  import '@dile/iconlib/lucide-icons/settings.js';
</script>

<dile-list density="compact" clickable divider="inset" style="max-width: 480px;">
  <dile-list-item icon-prefix="lucide.folder">Projects</dile-list-item>
  <dile-list-item icon-prefix="lucide.star">Favorites</dile-list-item>
  <dile-list-item icon-prefix="lucide.settings">Preferences</dile-list-item>
</dile-list>
```

How the cascade works:

- Only `<dile-list-item>` elements that are **direct children** of the list are managed. Items of a nested `<dile-list>` belong to that nested list.
- **Presentational properties** (`density`, `divider`, `lines`, `align`, `body-align`): a value defined on the item itself takes precedence over the list value.
- **Behavioural properties** (`clickable`, `disabled`): the list value wins while it is active. In selection mode (`single` / `multiple`) items are always clickable.
- When the list stops imposing a value (e.g. `list.disabled = false`, `selection="none"`, or removing `density`), each item gets back the value it had before.
- Items added dynamically receive the cascaded values too.

---

## Selection & State Management

`<dile-list>` can turn lists into interactive selection components for forms and dashboards.

### Single Selection

Set `selection="single"`. `<dile-list>` adopts `role="listbox"`, assigns `role="option"` to child items, handles mutual exclusion, and emits a `dile-list-change` event when the selected option changes (clicking the option that is already selected does not emit the event):

```html:preview
<script type="module">
  import '@dile/iconlib/lucide-icons/mail.js';
  import '@dile/iconlib/lucide-icons/bell.js';
</script>

<dile-list selection="single" value="email" divider="full" style="max-width: 480px;">
  <dile-list-item value="email" icon-prefix="lucide.mail">
    Email Notifications
  </dile-list-item>
  <dile-list-item value="push" icon-prefix="lucide.bell">
    Push Notifications
  </dile-list-item>
</dile-list>
```

Listening to changes in JavaScript:

```javascript
const list = document.querySelector('dile-list');
list.addEventListener('dile-list-change', (e) => {
  console.log('Selected value:', e.detail.value);
  console.log('Selected item:', e.detail.selectedItem);
});
```

### Multiple Selection

Set `selection="multiple"`. `<dile-list>` coordinates multiple selections, maintains `aria-multiselectable="true"`, and reflects an array of selected values in `value` and `e.detail.value`.

In HTML, the `value` attribute accepts a JSON array (`value='["updates", "newsletter"]'`) or a comma separated list (`value="updates,newsletter"`):

```html:preview
<dile-list selection="multiple" value='["updates", "newsletter"]' divider="full" style="max-width: 500px;">
  <dile-list-item value="updates">Product Updates</dile-list-item>
  <dile-list-item value="newsletter">Weekly Newsletter</dile-list-item>
  <dile-list-item value="security">Security Alerts</dile-list-item>
</dile-list>
```

---

## Keyboard Navigation & Roving Tabindex

Keyboard navigation is enabled by default. It applies to interactive items: clickable items, links (`href`) and options in selection mode.

- Only the currently active item has `tabindex="0"`, while all other items have `tabindex="-1"`.
- A user pressing <kbd>Tab</kbd> enters the list with a single keystroke, without having to tab through every row.
- Inside the list, users navigate with <kbd>Arrow Down</kbd> and <kbd>Arrow Up</kbd>, jump to the first item with <kbd>Home</kbd>, and jump to the last item with <kbd>End</kbd>.
- Disabled items are automatically bypassed during keyboard traversal.
- In single selection mode, you can optionally enable `select-on-focus` to automatically select options as the user navigates with the arrow keys.
- Keys pressed on controls placed inside an item (inputs, buttons...) are not intercepted, so for example <kbd>Home</kbd> / <kbd>End</kbd> keep working inside a text field.
- In lists without interactive items the arrow keys are not intercepted.

To disable it, use `navigable="false"` in HTML (or `list.navigable = false` in JavaScript). Then every interactive item gets its own tab stop.

```html
<dile-list clickable navigable="false">
  ...
</dile-list>
```

---

## Empty & Loading States

### Empty State

When no items are present, `<dile-list>` displays the `empty` slot or falls back to the text provided in `empty-text`:

```html:preview
<dile-list empty-text="No notifications found" style="max-width: 450px;">
</dile-list>
```

You can customize the empty state with any custom HTML via `slot="empty"`:

```html
<dile-list>
  <div slot="empty" style="padding: 2rem; text-align: center;">
    <p>Your inbox is empty!</p>
  </div>
</dile-list>
```

### Loading State

When `loading` is set to `true`, `<dile-list>` applies `aria-busy="true"` and displays a `<dile-spinner>`. If the list has items, the loader is shown as an overlay on top of them; if the list is empty (typically during the first load), the loader takes its own space and the empty state is hidden:

```html:preview
<dile-list loading divider="full" style="max-width: 450px;">
  <dile-list-item>Loading Item 1</dile-list-item>
  <dile-list-item>Loading Item 2</dile-list-item>
</dile-list>
```

---

## Properties

Property | Attribute | Type | Default | Description
---------|-----------|------|---------|------------
`selection` | `selection` | String | `'none'` | Selection mode: `'none'`, `'single'`, or `'multiple'`.
`value` | `value` | String / Array | `undefined` | Selected value (string for single selection, array of strings for multiple).
`clickable` | `clickable` | Boolean | `false` | When true, cascades clickable state to all child items.
`density` | `density` | String | `undefined` | Layout density cascaded to items: `'compact'`, `'comfortable'`, or `'spacious'`.
`divider` | `divider` | String | `undefined` | Divider style cascaded to items: `'full'`, `'inset'`, `'none'`, or the boolean attribute `divider` (same as `'full'`).
`lines` | `lines` | String | `undefined` | Text line clamping cascaded to items (`'1'`, `'2'`, a number, or `'auto'`).
`align` | `align` | String | `undefined` | Vertical alignment cascaded to items (`'start'`, `'center'`, `'end'`).
`bodyAlign` | `body-align` | String | `undefined` | Horizontal text alignment cascaded to items (`'left'`, `'center'`, `'right'`).
`disabled` | `disabled` | Boolean | `false` | Disables user interaction for the entire list and its items.
`loading` | `loading` | Boolean | `false` | Shows loading spinner overlay and sets `aria-busy="true"`.
`emptyText` | `empty-text` | String | `''` | Message displayed when there are no items in the list. When empty, the text `No items available` is used.
`navigable` | `navigable` | Boolean | `true` | Enables arrow-key roving tabindex navigation. Use `navigable="false"` to disable it from HTML.
`selectOnFocus` | `select-on-focus` | Boolean | `false` | In single selection mode, automatically selects the option upon keyboard focus.
`borderless` | `borderless` | Boolean | `false` | Removes the outer frame border, border-radius, and box shadow.

## Methods

Method | Parameters | Description
-------|------------|------------
`select(value)` | `val: string` | Programmatically selects an item by its value.
`clearSelection()` | *none* | Deselects all items and resets `value`.
`getItems()` | *none* | Returns an array with the `<dile-list-item>` elements that are direct children of the list.

## Custom Events

Event | Detail | Description
------|--------|------------
`dile-list-change` | `{ value, selectedItem, selectedItems }` | Dispatched whenever the selection changes by user interaction (click, <kbd>Enter</kbd> / <kbd>Space</kbd>, or arrow keys with `select-on-focus`). `selectedItem` is the item that triggered the change and `selectedItems` the array of selected items. It is not dispatched when `value`, `select()` or `clearSelection()` are used programmatically.

## Slots

Slot | Description
-----|------------
*(default)* | Slotted items (typically `<dile-list-item>`).
`empty` | Custom markup displayed when the list has no items.
`loading` | Custom loader template displayed when `loading` is true.

## CSS Shadow Parts

Part | Description
-----|------------
`container` | Wrapper element holding the default items slot.
`empty` | Container for the empty state message.
`loading` | Overlay container for the loading state.

## CSS Custom Properties

Custom Property | Description | Default
----------------|-------------|--------
`--dile-list-border` | Border around the list frame | `1px solid #e2e8f0`
`--dile-list-border-radius` | Border radius of the list frame | `8px`
`--dile-list-background-color` | Background color of the list container | `--dile-surface-color` or `#ffffff`
`--dile-list-box-shadow` | Box shadow applied to the list frame | `none`
`--dile-list-width` | Width of the list container | `100%`
`--dile-list-max-width` | Maximum width of the list container | `none`
`--dile-list-empty-padding` | Padding for the empty state container | `2rem 1rem`
`--dile-list-empty-color` | Text color for the empty state container | `#64748b`
`--dile-list-empty-font-size` | Font size for the empty state container | `0.9rem`
`--dile-list-loading-background-color` | Background color for loading overlay | `rgba(255, 255, 255, 0.8)`
`--dile-list-loading-color` | Text color for the loading overlay | `#64748b`
`--dile-list-loading-padding` | Padding for the loading overlay | `2rem 1rem`
`--dile-list-disabled-opacity` | Opacity when disabled | `0.6`

