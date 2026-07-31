---
layout: layout.html
title: Universal Generic
tags: icons
---

# Universal Icon Web Component

The `dile-iconlib` Custom Element provides a single, flexible way to display an icon from **any** of the supported icon libraries — Lucide, Material or FontAwesome — using one tag and a compound `icon` attribute, following the Web Components standard.

The `icon` attribute value follows the `<family>.<name>` format, where `family` is one of `lucide`, `material` or `fontawesome`:

```html
<dile-iconlib icon="lucide.house"></dile-iconlib>
<dile-iconlib icon="material.receipt"></dile-iconlib>
<dile-iconlib icon="fontawesome.microsoft"></dile-iconlib>
```

Using the tags above will render the following icons:

```html:preview
<script type="module">
  import '@dile/iconlib/lucide-icons/house.js';
  import '@dile/iconlib/material-icons/receipt.js';
  import '@dile/iconlib/fontawesome-icons/microsoft.js';
  import '@dile/iconlib/dile-iconlib.js';
</script>
<dile-iconlib icon="lucide.house"></dile-iconlib>
<dile-iconlib icon="material.receipt"></dile-iconlib>
<dile-iconlib icon="fontawesome.microsoft"></dile-iconlib>
```

## Installation

```bash
npm install @dile/iconlib
```

## Usage

Import the `dile-iconlib` component and the specific icon modules you plan to use, from whichever families you need:

```javascript
import '@dile/iconlib/dile-iconlib.js';
import '@dile/iconlib/lucide-icons/house.js';       // Lucide icon
import '@dile/iconlib/material-icons/receipt.js';         // Material icon
import '@dile/iconlib/fontawesome-icons/microsoft.js'; // FontAwesome icon
```

Set the `icon` attribute to the compound `family.name` string:

```html
<dile-iconlib icon="lucide.house"></dile-iconlib>
<dile-iconlib icon="material.receipt"></dile-iconlib>
<dile-iconlib icon="fontawesome.microsoft"></dile-iconlib>
```

This enables dynamic icon switching via data-bound strings — including switching between icon *libraries*, not just icon names — ideal for lists or conditional rendering that mixes icon sets.

## Attributes

- **icon**: String combining the family and the icon name as `family.name`, e.g. `"lucide.house"`, `"material.receipt"`, `"fontawesome.microsoft"`. Supported families: `lucide`, `material`, `fontawesome`. If the family isn't recognized, a warning is logged to the console and nothing is rendered; if `icon` is omitted, a default icon (`lucide.dot`) is shown.
- **rounded**: Boolean attribute for a button-like, circular background.

> To find the specific name of each icon, check the [Lucide icons](../lucide-icons/), [Material icons](../material-icons/) or [FontAwesome icons](../fontawesome-icons/) web components pages.

## Styling and Features

This component inherits all styling options and CSS custom properties from the underlying family-specific icon components documented in [Lucide Icons](../lucide-icons/), [Material Icons](../material-icons/) and [FontAwesome Icons](../fontawesome-icons/) Web Components.

- Use `--dile-icon-size`, `--dile-icon-color`, etc., for customization.
- Add `rounded` for button-like appearance, combined with `--dile-icon-rounded-background-color` and `--dile-icon-rounded-padding`.

## Examples

### Mixed libraries, styled

```html:preview
<script type="module">
  import '@dile/iconlib/lucide-icons/dribbble.js';
  import '@dile/iconlib/material-icons/star.js';
  import '@dile/iconlib/fontawesome-icons/airbnb.js';
</script>
<style>
  .styled {
    --dile-icon-color: orange;
    --dile-icon-size: 32px;
  }
  .styled2 {
    --dile-icon-color: #37b;
    --dile-icon-size: 48px;
  }
</style>
<div style="display: flex; gap: 1rem; align-items: center;">
  <dile-iconlib icon="lucide.dribbble" class="styled"></dile-iconlib>
  <dile-iconlib icon="material.star" class="styled2"></dile-iconlib>
  <dile-iconlib icon="fontawesome.airbnb" class="styled"></dile-iconlib>
</div>
```

### Rounded Icons

```html:preview
<script type="module">
  import '@dile/iconlib/lucide-icons/bird.js';
  import '@dile/iconlib/material-icons/favorite.js';
</script>
<style>
  .regular {
    --dile-icon-rounded-background-color: #eee;
    --dile-icon-rounded-padding: 0.5rem;
  }
  .regular:hover {
    --dile-icon-rounded-background-color: #ddd;
  }
  .featured {
    --dile-icon-rounded-background-color: #bd0a61;
    --dile-icon-rounded-padding: 0.75rem;
    --dile-icon-color: #fff;
  }
  .featured:hover {
    --dile-icon-rounded-background-color: #8d0031;
    --dile-icon-color: #fda;
  }
</style>
<div style="display: flex; gap: 1rem; align-items: center;">
  <dile-iconlib icon="lucide.bird" rounded class="regular"></dile-iconlib>
  <dile-iconlib icon="material.favorite" rounded class="featured"></dile-iconlib>
</div>
```

## Family-specific components

`dile-iconlib` is an additional, convenience component. The original per-family components (`dile-lucide-icon`, `dile-material-icon`, `dile-fontawesome-icon`) remain available and unchanged — see [Lucide Generic](../lucide-icon/), [Material Generic](../material-icon/) and [FontAwesome Generic](../fontawesome-icon/).
