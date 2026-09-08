---
title: Button
package: '@dile/ui'
element: '&lt;dile-button&gt;'
status: stable
summary: Customizable button component with disabled and loading states. Supports form integration and extensive CSS property customization.
tags: forms
---

# dile-button

Web Component to create a customizable button.

## Installation

```bash
npm i @dile/ui
```

## Usage

Import the dile-button component.

```javascript
import '@dile/ui/components/button/button.js';
```

Use the component.

```html
<dile-button>Button Label</dile-button>
```

### Adding an icon

`dile-button` can display an icon next to (or instead of) its label, using the same
`"family.name"` string format as [dile-iconlib](/icons/dile-iconlib/). If you don't
set the `icon` property the component behaves exactly as before, so it is fully
backwards compatible.

The icon glyph is imported separately, just like with `dile-iconlib`:

```javascript
import '@dile/ui/components/button/button.js';
import '@dile/iconlib/lucide-icons/rocket.js';
```

```html
<dile-button icon="lucide.rocket">Launch app</dile-button>
```

Supported icon families are the ones documented in [dile-iconlib](/icons/dile-iconlib/):
`lucide`, `material`, `fontawesome`, `phosphor`, `tabler` and `remixicon`.

> If you already build the icon as a lit-html template or an `<img>` template
> (instead of a `"family.name"` string), use
> [dile-button-icon](/components/dile-button-icon/) instead.

### Properties

- **disabled**: Boolean, mark button as disabled.
- **loading**: Boolean, shows a loading spinner and prevents interaction while loading.
- **name**: The name of the button. It reflects to the ```name``` attribute, so it is sent correctly on native ```<form>``` submission, even if you set it from JavaScript instead of markup.
- **value**: The value submitted for this button's ```name``` when it is the button that triggers the form submission, mirroring a native ```<button type="submit" name="..." value="...">```.
- **type**: Use this attribute to create a submit or reset buttom, ie: `type="submit"`
- **icon**: String in `"family.name"` format (e.g. `"lucide.rocket"`, `"material.star"`). When empty, no icon is rendered and the button works like a plain text button.
- **iconPosition**: `"left"` (default) or `"right"` (attribute `icon-position`). Sets where the icon appears relative to the label.
- **no-wrap**: Boolean, prevents the label from wrapping into several lines.
- **label**: String used as the button's accessible name (`aria-label`). **Required for icon-only buttons** (no slotted text), otherwise the button has no accessible name.

When ```type="submit"```, clicking the button submits its closest ancestor ```<form>``` and includes its ```name```/```value``` pair in the submitted data — only for the button that was actually clicked, so you can safely use several submit buttons with different ```name```/```value``` pairs in the same form to distinguish which action was triggered.

### Layout and accessibility notes

- A button with **only an icon** (no slotted text) is rendered with the icon
  perfectly centered — the icon-to-text separation is only applied when there is
  actually a label, so there is no dead space beside the icon.
- A button with **only text** (no `icon`) keeps a clean layout with no extra
  icon spacing.
- The inner `dile-iconlib` icon is marked `aria-hidden="true"` because it is
  decorative; the accessible name comes from the slotted text or from the
  `label` property.
- The native focus ring (`--dile-button-ring-color`) is preserved for keyboard
  users.

### CSS Custom Properties

You can customize it using CSS Custom Properties.

The component accepts both the older --dile-button-* aliases and the more generic --dile-primary-* variables. Alias variables take precedence; when not provided the component falls back to the generic variables and then to the built-in defaults.

Custom property | Description | Default
----------------|-------------|---------
--dile-button-padding-y | Vertical padding | 0.5rem
--dile-button-padding-x | Horizontal padding | 0.8rem
--dile-button-border-radius | Button border radius | 2rem
--dile-button-border-width | Button border width | 3px
--dile-button-border-color | Button border color (alias) |  --dile-primary-dark-color or #12354d
--dile-primary-dark-color | Button border color (legacy) | #12354d
--dile-button-background-color | Background color (alias) |  --dile-primary-color or #7BB93D
--dile-primary-color | Background color (legacy) | #7BB93D
--dile-button-text-color | Text color (alias) |  --dile-on-primary-color or #fff
--dile-on-primary-color | Text color (legacy) | #fff
--dile-button-font-size | Font size | 1rem
--dile-button-font-weight | Font weight | bold
--dile-button-text-transform | Text transform | none
--dile-button-letter-spacing | Text letter spacing | 0
--dile-button-box-shadow | Box shadow | none
--dile-button-hover-background-color | Hover background color | --dile-button-hover-background-color, then --dile-button-background-color, then --dile-primary-light-color or #f3f3ae
--dile-primary-light-color | Hover background color fallback | #f3f3ae
--dile-button-hover-text-color | Hover text color | --dile-button-hover-text-color, then --dile-button-text-color, then --dile-on-primary-light-color or #303030
--dile-on-primary-light-color | Hover text color fallback | #303030
--dile-button-hover-border-color | Hover border color | --dile-button-hover-border-color, then --dile-button-border-color, then --dile-primary-color or #666666
--dile-button-ring-color | Ring color on focus state | #12c9e9
--dile-button-ring-offset-width | Ring width on focus state | 3px
--dile-button-disabled-background-color | Disabled background color |  --dile-button-background-color or #ccc
--dile-button-disabled-border-color | Disabled border color |  --dile-button-border-color or #bbb
--dile-button-disabled-text-color | Disabled text color |  --dile-button-text-color or #999
--dile-button-spinner-gap | Gap between spinner and text | 0.5rem
--dile-button-spinner-size | Spinner icon size | 0.8 * --dile-button-font-size

The following properties apply when the button has an `icon` (they are shared with [dile-button-icon](/components/dile-button-icon/)):

Custom property | Description | Default
----------------|-------------|---------
--dile-button-icon-separation | Space between the icon and the label (only used when there is a label) | 0.3rem
--dile-button-icon-size | Icon size | 1.125 * --dile-button-font-size
--dile-button-icon-color | Icon color | --dile-button-text-color, then --dile-on-primary-color or #fff
--dile-button-icon-hover-color | Icon color on hover | --dile-button-hover-text-color, then --dile-button-text-color or #303030

## dile-button demos

### Regular button

```html:preview
<dile-button>Click here!</dile-button>
```

### Styled button

```html:preview
<style>
  .styled {
    --dile-button-border-color: #666;
    --dile-button-hover-border-color: #ff910f;
    --dile-button-background-color: #491449;
    --dile-button-hover-background-color: #f3c6f3;
    --dile-button-text-color:  #fff; 
    --dile-button-hover-text-color:  #000; 
    --dile-button-font-weight: bold;
    --dile-button-ring-color: #cc5099;
    --dile-button-ring-offset-width: 2px;
    --dile-button-border-radius: 4px;
    --dile-button-text-transform: uppercase;
  }
</style>
<dile-button class="styled">Click here!</dile-button>
```

### Disabled button

```html:preview
  <dile-button name="disabeldbutton" disabled id="disabeldbutton">Disabled button</dile-button>
```

### Loading button

```html:preview
  <dile-button name="loadingbutton" loading id="loadingbutton">Loading...</dile-button>
```

### Button with an icon

The icon glyph is imported separately, exactly like with `dile-iconlib`.

```html:preview
<script type="module">
  import '@dile/iconlib/lucide-icons/rocket.js';
  import '@dile/iconlib/lucide-icons/arrow-right.js';
  import '@dile/iconlib/lucide-icons/heart.js';
  import '@dile/iconlib/lucide-icons/settings.js';
</script>
<dile-button icon="lucide.rocket">Launch app</dile-button>
```

### Icon on the right

```html:preview
<dile-button icon="lucide.arrow-right" icon-position="right">Continue</dile-button>
```

### Icon-only button

An icon-only button needs a `label` for its accessible name. There is no dead
space next to the icon.

```html:preview
<dile-button icon="lucide.settings" label="Open settings"></dile-button>
```