---
layout: layout.html
title: Tabler Generic
tags: tabler
---

# Generic Tabler Icon Web Component

The `dile-tabler-icon` Custom Element provides a flexible way to display any Tabler icon using a single tag and the `icon` attribute, following the Web Components standard.

This generic component requires importing the specific Tabler icon modules first, then referencing them by name via a string attribute.

```html
<dile-tabler-icon icon="heart"></dile-tabler-icon>
<dile-tabler-icon icon="star-filled"></dile-tabler-icon>
```

Using the tags above will render the following icons:


```html:preview
<script type="module">
  import '@dile/iconlib/tabler-icons/heart.js';
  import '@dile/iconlib/tabler-icons/star-filled.js';
  import '@dile/iconlib/dile-tabler-icon.js';
</script>
<dile-tabler-icon icon="heart"></dile-tabler-icon>
<dile-tabler-icon icon="star-filled"></dile-tabler-icon>
```

## Installation

```bash
npm install @dile/iconlib
```

## Usage

Import the `dile-tabler-icon` component and the specific Tabler icons you plan to use:

```javascript
import '@dile/iconlib/dile-tabler-icon.js';
import '@dile/iconlib/tabler-icons/heart.js';        // Import needed icons
import '@dile/iconlib/tabler-icons/star-filled.js';
```

Set the `icon` attribute to the icon name string:

```html
<dile-tabler-icon icon="heart"></dile-tabler-icon>
<dile-tabler-icon icon="star-filled"></dile-tabler-icon>
```

This enables dynamic icon switching via data-bound strings, ideal for lists or conditional rendering.

## Attributes

- **icon**: String with the name of the imported Tabler icon, including the `-filled` suffix when using the filled variant (e.g. `"heart"` for outline, `"heart-filled"` for filled)

> To find the specific name of each icon, visit the [Tabler Icons documentation page](https://tabler.io/icons), search it in the [Icon Catalog](../icon-catalog/), or check the [Tabler icons web components page](../tabler-icons/).

## Styling and Features

This component inherits all styling options, CSS custom properties, and the `rounded` attribute from the specific Tabler icon components documented in [Tabler Icons Web Components](../tabler-icons/).

- Use `--dile-icon-size`, `--dile-icon-color`, etc., for customization.
- Add `rounded` for button-like appearance.

## Examples

### Styled Icons

```html:preview
<script type="module">
  import '@dile/iconlib/tabler-icons/star.js';
  import '@dile/iconlib/tabler-icons/heart.js';
  import '@dile/iconlib/dile-tabler-icon.js';
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
  <dile-tabler-icon icon="star" class="styled"></dile-tabler-icon>
  <dile-tabler-icon icon="heart" class="styled2"></dile-tabler-icon>
</div>
```

### Rounded Icons

```html:preview
<script type="module">
  import '@dile/iconlib/tabler-icons/home-filled.js';
  import '@dile/iconlib/tabler-icons/heart-filled.js';
  import '@dile/iconlib/dile-tabler-icon.js';
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
  <dile-tabler-icon icon="home-filled" rounded class="regular"></dile-tabler-icon>
  <dile-tabler-icon icon="heart-filled" rounded class="featured"></dile-tabler-icon>
</div>
```

## Import Alternatives

Supports the same ES module, inline script, CDN, and `src` attribute methods as specific icons. See [Tabler Icons Web Components](../tabler-icons/) for details.
