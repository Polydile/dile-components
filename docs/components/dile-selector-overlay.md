---
title: Selector Overlay
package: '@dile/ui'
element: '&lt;dile-selector-overlay&gt;'
status: stable
summary: Selector component hidden behind capsule trigger button. Shows options in overlay menu combining dile-menu-overlay and dile-selector.
tags: menu
---

# dile-selector-overlay

Web Component to create a selector interface, like [dile-selector](/components/dile-selector), but hidden behind a capsule-shaped trigger button that opens the options in an overlay menu instead of showing them inline.

Internally it's built by combining three existing components:

- [dile-menu-overlay](/components/dile-menu-overlay/) for the overlay behavior (positioning, open/close, click outside to close).
- [dile-lucide-badge](/icons/lucide-badge/) for the capsule trigger, or a bare rounded [dile-lucide-icon](/icons/lucide-icon/) when no label is set. Defaults to the `ellipsis-vertical` icon, configurable through the `icon` property.
- [dile-selector-item](/components/dile-selector/) for the selectable options.

## Installation

```bash
npm i @dile/ui
```

## Usage

Import the component.

```javascript
import '@dile/ui/components/selector/selector-overlay.js';
import '@dile/ui/components/selector/selector-item.js';
```

Use the component. Its children must be `<dile-selector-item>` elements, exactly like `dile-selector`.

```html
<dile-selector-overlay selected="1">
  <dile-selector-item>One</dile-selector-item>
  <dile-selector-item>Two</dile-selector-item>
  <dile-selector-item>Three</dile-selector-item>
</dile-selector-overlay>
```

## Properties

Inherited from the [dile-selector-mixin](/mixins/dile-selector-mixin/) (`DileSelectable`), same as `dile-selector`:

- **selected**: Currently selected item. By default an integer index (0 for the first item). See `attrForSelected` to select by attribute value instead.
- **attrForSelected**: Attribute name to match against `selected` instead of using the item index.
- **selectorId** (optional): Links this component to another component sharing the same `selectorId` (e.g. a `dile-pages`).
- **hashSelection**: Boolean. Connects the selection with the URL hash.

Specific to `dile-selector-overlay`:

- **label**: String, `null` by default. Text shown next to the icon in the trigger capsule. When `null` or `""`, the trigger only shows a bare rounded icon, with no visible text. By default this text stays fixed (e.g. `"Menu"` or `"Options"`); see `dynamicLabel` to have it follow the selection instead.
- **dynamicLabel**: Boolean, `false` by default. When `true`, the trigger label automatically follows the currently selected option's text, falling back to `label` when nothing is selected. When `false` (default), the trigger always shows the `label` value as-is, regardless of the selection.
- **icon**: String, `"ellipsis-vertical"` by default. Name of the Lucide icon shown in the trigger. Any icon name available in `@dile/iconlib` can be used.
- **triggerAriaLabel**: String, `"Options"` by default. Accessible label (`aria-label`) used on the trigger when `label` is empty.
- **horizontalAlign**, **verticalAlign**, **moveTop**, **moveLeft**: Forwarded as-is to the internal `dile-menu-overlay`. See [dile-menu-overlay properties](/components/dile-menu-overlay#properties) for valid values.

> If you set `icon` to a value other than the default `"ellipsis-vertical"`, make sure the corresponding icon module is imported somewhere in your app, e.g. `import '@dile/iconlib/lucide-icons/star.js';`, so the custom element for that icon gets registered.

### Methods

- **changeSelectedTo(item)**: set the selected item.

## Custom Events

- **dile-selected-changed**: dispatched when the selection changes, same payload as [dile-selector](/components/dile-selector#custom-events).

```json
{
  selected: this.selected,
  selectorId: this.selectorId,
  initializationEvent,
}
```

- **overlay-opened** / **overlay-closed**: bubble up from the internal `dile-menu-overlay` when the menu opens or closes.

Selecting an option always closes the overlay.

## Styling

`dile-selector-overlay` doesn't define any CSS custom property of its own. To customize its appearance, use the CSS custom properties already exposed by the components it's built from:

- `--dile-menu-overlay-*` (see [dile-menu-overlay styling](/components/dile-menu-overlay#style-customization)) to style the overlay panel.
- `--dile-lucide-badge-*` to style the trigger capsule when `label` is set.
- `--dile-icon-color`, `--dile-icon-size`, `--dile-icon-rounded-background-color`, `--dile-icon-rounded-padding` to style the bare rounded icon shown when `label` is empty.
- `--dile-selector-*` to style the `dile-selector-item` options, exactly like in `dile-selector`.

## dile-selector-overlay demos

### Icon only trigger

Without a `label`, the trigger only shows the rounded `ellipsis-vertical` icon.

```html:preview
<script type="module">
import '@dile/ui/components/selector/selector-overlay.js';
import '@dile/ui/components/selector/selector-item.js';
</script>
<dile-selector-overlay selected="1">
  <dile-selector-item>One</dile-selector-item>
  <dile-selector-item>Two</dile-selector-item>
  <dile-selector-item>Three</dile-selector-item>
  <dile-selector-item>Four</dile-selector-item>
</dile-selector-overlay>
```

### Fixed trigger label

By default the `label` stays constant (e.g. `"Menu"`), regardless of which option gets selected.

```html:preview
<dile-selector-overlay label="Menu" selected="posts" attrForSelected="name">
  <dile-selector-item icon="star" name="users">Users</dile-selector-item>
  <dile-selector-item icon="star" name="posts">Posts</dile-selector-item>
  <dile-selector-item icon="star" name="articles">Articles</dile-selector-item>
  <dile-selector-item icon="star" name="faq">FAQ</dile-selector-item>
</dile-selector-overlay>
```

### Trigger label follows the selection

Set `dynamicLabel` so the trigger label automatically shows the text of the selected option, with no extra wiring needed. Try selecting a different option.

```html:preview
<dile-selector-overlay dynamicLabel selected="posts" attrForSelected="name">
  <dile-selector-item icon="star" name="users">Users</dile-selector-item>
  <dile-selector-item icon="star" name="posts">Posts</dile-selector-item>
  <dile-selector-item icon="star" name="articles">Articles</dile-selector-item>
  <dile-selector-item icon="star" name="faq">FAQ</dile-selector-item>
</dile-selector-overlay>
```

### Custom icon

The default `ellipsis-vertical` icon is always included. If you want to use a different icon, import its module and set it through the `icon` property.

```html:preview
<script type="module">
import '@dile/iconlib/lucide-icons/star.js';
</script>
<dile-selector-overlay icon="star">
  <dile-selector-item>One</dile-selector-item>
  <dile-selector-item>Two</dile-selector-item>
  <dile-selector-item>Three</dile-selector-item>
</dile-selector-overlay>
```

### Custom position

```html:preview
<div style="text-align: right;">
  <dile-selector-overlay horizontalAlign="left" verticalAlign="center">
    <dile-selector-item>One</dile-selector-item>
    <dile-selector-item>Two</dile-selector-item>
    <dile-selector-item>Three</dile-selector-item>
  </dile-selector-overlay>
</div>
```
