---
title: Color Select
package: '@dile/ui'
element: '&lt;dile-color-select&gt;'
status: stable
summary: Select of a color from a closed list, shown as an overlay with a swatch and the name of each color.
tags: forms
---

# dile-color-select

Select of a color from a closed list of named colors. It looks like the other dile-components selects and shows its options in an overlay, each one with a swatch of the color and its name. Its value is the chosen color.

It extends [dile-select-overlay](/components/dile-select-overlay/), so it has the same keyboard behavior, accessibility (ARIA combobox + listbox), form association and `element-changed` event. The difference is that the options come from the `colors` property instead of a slotted `<select>`.

If the user can choose any color, use [dile-color-picker](/components/dile-color-picker/) instead.

## Installation

```bash
npm i @dile/ui
```

## Usage

Import the component.

```javascript
import '@dile/ui/components/select/color-select.js';
```

Give it the list of colors. Each color is an object with its `value` (any CSS color string: hex, `rgb()`...) and its `name`.

```html
<dile-color-select
  name="color"
  label="Color"
  emptyLabel="No color"
  .colors=${[
    { value: '#fecaca', name: 'Red' },
    { value: '#bbf7d0', name: 'Green' },
    { value: '#bfdbfe', name: 'Blue' },
  ]}
></dile-color-select>
```

```html:preview
<script type="module">
  import '@dile/ui/components/select/color-select.js';
  const select = document.getElementById('colorSelectDemo');
  select.colors = [
    { value: '#e5e7eb', name: 'Gray' },
    { value: '#fecaca', name: 'Red' },
    { value: '#fde68a', name: 'Yellow' },
    { value: '#bbf7d0', name: 'Green' },
    { value: '#bfdbfe', name: 'Blue' },
    { value: '#ddd6fe', name: 'Violet' },
  ];
  select.addEventListener('element-changed', (e) => {
    document.getElementById('colorSelectDemoOutput').textContent = e.detail.value || '(none)';
  });
</script>
<dile-color-select id="colorSelectDemo" name="color" label="Tag color" emptyLabel="No color"></dile-color-select>
<p>Value: <span id="colorSelectDemoOutput">(none)</span></p>
```

## Properties

- **colors**: Array of `{ value, name }` objects, the available colors.
- **emptyLabel**: String. When set, adds a first "no color" option with this name and value `''`.
- **value**: String, the chosen color. It must match one of the `colors` values exactly.
- **name**, **label**, **placeholder**, **disabled**, **errored**, **message**, **hideErrorOnInput**, **quietOnStart**, **accessibleLabel**: same as [dile-select-overlay](/components/dile-select-overlay/).

## Events

- **element-changed**: when the value changes. `detail: { name, value }`.

## Styling

Custom property | Description | Default
----------------|-------------|---------
--dile-color-select-swatch-size | Side of the swatch | 1rem
--dile-color-select-swatch-border-radius | Radius of the swatch (50% circle, 0 square) | 50%
--dile-color-select-swatch-border-color | Border of the swatch | rgba(0, 0, 0, 0.25)

Plus the [dile-select-overlay](/components/dile-select-overlay/) custom properties (`--dile-input-*`, `--dile-select-overlay-*`...) and parts. Each swatch is exposed as the `swatch` part.
