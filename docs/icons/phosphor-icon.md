---
layout: layout.html
title: Phosphor Generic
tags: phosphor
---

# Generic Phosphor Icon Web Component

The `dile-phosphor-icon` Custom Element provides a flexible way to display any Phosphor icon using a single tag and the `icon` attribute, following the Web Components standard.

This generic component requires importing the specific Phosphor icon modules first, then referencing them by name via a string attribute.

```html
<dile-phosphor-icon icon="house"></dile-phosphor-icon>
<dile-phosphor-icon icon="heart-bold"></dile-phosphor-icon>
```

Using the tags above will render the following icons:


```html:preview
<script type="module">
  import '@dile/iconlib/phosphor-icons/house.js';
  import '@dile/iconlib/phosphor-icons/heart-bold.js';
  import '@dile/iconlib/dile-phosphor-icon.js';
</script>
<dile-phosphor-icon icon="house"></dile-phosphor-icon>
<dile-phosphor-icon icon="heart-bold"></dile-phosphor-icon>
```

## Installation

```bash
npm install @dile/iconlib
```

## Usage

Import the `dile-phosphor-icon` component and the specific Phosphor icons you plan to use:

```javascript
import '@dile/iconlib/dile-phosphor-icon.js';
import '@dile/iconlib/phosphor-icons/house.js';       // Import needed icons
import '@dile/iconlib/phosphor-icons/heart-bold.js';
```

Set the `icon` attribute to the icon name string:

```html
<dile-phosphor-icon icon="house"></dile-phosphor-icon>
<dile-phosphor-icon icon="heart-bold"></dile-phosphor-icon>
```

This enables dynamic icon switching via data-bound strings, ideal for lists or conditional rendering.

## Attributes

- **icon**: String with the name of the imported Phosphor icon, including the weight suffix when it's not `regular` (e.g. `"house"` for regular, `"house-bold"` for bold, `"house-duotone"` for duotone, `"house-fill"` for fill, `"house-light"` for light, `"house-thin"` for thin)

> To find the specific name of each icon, visit the [Phosphor Icons documentation page](https://phosphoricons.com/), search it in the [Icon Catalog](../icon-catalog/), or check the [Phosphor icons web components page](../phosphor-icons/).

## Styling and Features

This component inherits all styling options, CSS custom properties, and the `rounded` attribute from the specific Phosphor icon components documented in [Phosphor Icons Web Components](../phosphor-icons/).

- Use `--dile-icon-size`, `--dile-icon-color`, etc., for customization.
- Add `rounded` for button-like appearance.

## Examples

### Styled Icons

```html:preview
<script type="module">
  import '@dile/iconlib/phosphor-icons/star.js';
  import '@dile/iconlib/phosphor-icons/heart.js';
  import '@dile/iconlib/dile-phosphor-icon.js';
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
  <dile-phosphor-icon icon="star" class="styled"></dile-phosphor-icon>
  <dile-phosphor-icon icon="heart" class="styled2"></dile-phosphor-icon>
</div>
```

### Rounded Icons

```html:preview
<script type="module">
  import '@dile/iconlib/phosphor-icons/house-fill.js';
  import '@dile/iconlib/phosphor-icons/heart-fill.js';
  import '@dile/iconlib/dile-phosphor-icon.js';
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
    --dile-icon-rounded-padding: 0.75rem;
  }
</style>
<div style="display: flex; gap: 1rem; align-items: center;">
  <dile-phosphor-icon icon="house-fill" rounded class="regular"></dile-phosphor-icon>
  <dile-phosphor-icon icon="heart-fill" rounded class="featured"></dile-phosphor-icon>
</div>
```

## Import Alternatives

Supports the same ES module, inline script, CDN, and `src` attribute methods as specific icons. See [Phosphor Icons Web Components](../phosphor-icons/) for details.
