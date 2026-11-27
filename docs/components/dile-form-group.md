---
title: Form Group
package: '@dile/ui'
element: '&lt;dile-form-group&gt;'
status: experimental
summary: Groups form fields under a label and description, laying them out in responsive columns or left/right slots that collapse based on the group width.
tags: forms
---

# dile-form-group

Web Component to group related form fields under a title, with a customizable visual separation and an automatic column layout. It lets you build multi-column forms without writing layout CSS.

The columns collapse to a single column when the **component itself** is narrower than a breakpoint, so the same form adapts whether it is placed in a full page, a sidebar or a modal.

## Installation

```bash
npm i @dile/ui
```

## Usage

Import the `dile-form-group` component.

```javascript
import '@dile/ui/components/form-group/form-group.js';
```

Use the component, placing the form fields as children.

```html
<dile-form-group label="Personal data" columns="2">
  <dile-input label="First name" name="firstName"></dile-input>
  <dile-input label="Last name" name="lastName"></dile-input>
  <dile-textarea label="Notes" name="notes" data-span="full"></dile-textarea>
</dile-form-group>
```

## Properties

| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `label` | `String` | `undefined` | Title of the group. When not set (and the `label` slot is empty) no header is rendered. |
| `description` | `String` | `undefined` | Help text shown below the title. It is linked to the group with `aria-describedby`. |
| `labelLevel` | `Number` | `undefined` | When set, the title is exposed as a heading of this level (`role="heading"`). Exposed via `label-level`. |
| `columns` | `Number` | `1` | Number of columns (1, 2 or 3) for the fields in the default slot. |
| `breakpoint` | `Number` | `600` | Width in pixels of the component below which every layout collapses to one column. Use `0` to never collapse. |
| `variant` | `String` | `"line"` | Visual preset: `line` (top line separator), `box` (bordered panel) or `plain` (no decoration). |
| `collapsed` | `Boolean` | `false` | Read only. Set and reflected by the component when its width is below `breakpoint`, so you can style it from outside: `dile-form-group[collapsed]`. |

## Layout

### Columns

Set `columns="2"` or `columns="3"` and the children of the default slot are placed on a CSS grid. A child can take more space with the `data-span` attribute:

- `data-span="2"`: the field spans two columns.
- `data-span="full"`: the field takes the whole row.

When the group is collapsed, `data-span` is ignored and every field takes the full width.

### Left / right slots

Place fields in the `left` and `right` slots to decide manually which column each field goes to. The proportion of both columns is set with `--dile-form-group-split-columns` (`1fr 1fr` by default). Content in the default slot, if any, is rendered below with its own `columns` layout.

```html
<dile-form-group label="Shipping">
  <dile-input slot="left" label="Address"></dile-input>
  <dile-input slot="left" label="City"></dile-input>
  <dile-input slot="right" label="Phone"></dile-input>
</dile-form-group>
```

> **Note:** The breakpoint is measured with a `ResizeObserver` on the component, not on the viewport.

## Slots

- **main slot** (unnamed slot): form fields laid out in `columns`.
- **left slot**: fields for the left column of the split layout.
- **right slot**: fields for the right column of the split layout.
- **label slot**: custom title, replacing the `label` property. Useful to control the heading markup (`<h3 slot="label">`).

## CSS Custom Properties

Custom property | Description | Default
----------------|-------------|---------
--dile-form-group-margin | Margin of the component | 0 0 1.5rem
--dile-form-group-padding | Inner padding | 1rem 0 0 (line), 1rem (box), 0 (plain)
--dile-form-group-gap | Gap between fields (rows columns) | 0 1rem
--dile-form-group-line-color | Color of the line (line variant) and border (box variant) | --dile-secondary-dark-color or #888 (line), #ccc (box)
--dile-form-group-border-top | Top border in the line variant | 1px solid line color
--dile-form-group-border | Border in the box variant | 1px solid line color
--dile-form-group-border-radius | Border radius in the box variant | 0.5rem
--dile-form-group-background-color | Background in the box variant | transparent
--dile-form-group-label-color | Title color | --dile-secondary-dark-color or #888
--dile-form-group-label-font-size | Title font size | 1.1rem
--dile-form-group-label-font-weight | Title font weight | 300
--dile-form-group-description-color | Description color | --dile-on-background-color or #303030
--dile-form-group-description-font-size | Description font size | 0.875rem
--dile-form-group-header-margin-bottom | Space between header and fields | 0.75rem
--dile-form-group-split-columns | Grid template of the left/right layout | 1fr 1fr

## Accessibility

The fields are wrapped in an element with `role="group"`, labelled by the title (`aria-labelledby`) and described by the description (`aria-describedby`), so screen readers announce the group name when entering it.

## dile-form-group demos

### Basic usage

```html:preview
<script type="module">
  import '@dile/ui/components/form-group/form-group.js';
  import '@dile/ui/components/input/input.js';
  import '@dile/ui/components/textarea/textarea.js';
</script>
<dile-form-group label="Account">
  <dile-input label="Email" name="email"></dile-input>
  <dile-input label="Username" name="username"></dile-input>
</dile-form-group>
```

### Two columns with description

Resize the browser to see the fields collapse when the group is narrower than 520px.

```html:preview
<dile-form-group label="Personal data" description="As it will appear on your invoices." columns="2" breakpoint="520">
  <dile-input label="First name" name="firstName"></dile-input>
  <dile-input label="Last name" name="lastName"></dile-input>
  <dile-input label="Phone" name="phone"></dile-input>
  <dile-input label="Email" name="email"></dile-input>
  <dile-textarea label="Notes" name="notes" data-span="full"></dile-textarea>
</dile-form-group>
```

### Three columns, box variant

```html:preview
<dile-form-group label="Address" variant="box" columns="3" breakpoint="640">
  <dile-input label="Street" name="street" data-span="2"></dile-input>
  <dile-input label="Number" name="number"></dile-input>
  <dile-input label="City" name="city"></dile-input>
  <dile-input label="Postal code" name="zip"></dile-input>
  <dile-input label="Province" name="province"></dile-input>
</dile-form-group>
```

### Left / right slots

```html:preview
<dile-form-group label="Shipping" style="--dile-form-group-split-columns: 2fr 1fr;">
  <dile-input slot="left" label="Address" name="address"></dile-input>
  <dile-input slot="left" label="City" name="city"></dile-input>
  <dile-input slot="right" label="Postal code" name="zip"></dile-input>
  <dile-input slot="right" label="Phone" name="phone"></dile-input>
  <dile-textarea label="Delivery instructions" name="instructions"></dile-textarea>
</dile-form-group>
```

### Styled

```html:preview
<style>
  .styled-group {
    --dile-form-group-border: 2px solid #8ac;
    --dile-form-group-border-radius: 1rem;
    --dile-form-group-background-color: #f2f8fc;
    --dile-form-group-label-color: #246;
    --dile-form-group-label-font-weight: 700;
    --dile-form-group-padding: 1.25rem 1.5rem;
  }
  html.dark-theme .styled-group {
    --dile-form-group-background-color: #1d2a33;
    --dile-form-group-label-color: #9cf;
  }
</style>
<dile-form-group class="styled-group" label="Preferences" variant="box" columns="2">
  <dile-input label="Display name" name="displayName"></dile-input>
  <dile-input label="Website" name="website"></dile-input>
</dile-form-group>
```
