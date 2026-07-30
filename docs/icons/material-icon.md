---
layout: layout.html
title: Material Generic
tags: material
---

# Generic Material Icon Web Component

The `dile-material-icon` Custom Element provides a flexible way to display any Material icon using a single tag and the `icon` attribute, following the Web Components standard.

This generic component requires importing the specific Material icon modules first, then referencing them by name via a string attribute.

```html
<dile-material-icon icon="favorite"></dile-material-icon>
<dile-material-icon icon="settings"></dile-material-icon>
```

Using the tags above will render the following icons:


```html:preview
<script type="module">
  import '@dile/iconlib/material/favorite.js';
  import '@dile/iconlib/material/settings.js';
  import '@dile/iconlib/dile-material-icon.js';
</script>
<dile-material-icon icon="favorite"></dile-material-icon>
<dile-material-icon icon="settings"></dile-material-icon>
```

## Installation

```bash
npm install @dile/iconlib
```

## Usage

Import the `dile-material-icon` component and the specific Material icons you plan to use:

```javascript
import '@dile/iconlib/dile-material-icon.js';
import '@dile/iconlib/material/favorite.js';  // Import needed icons
import '@dile/iconlib/material/settings.js';
```

Set the `icon` attribute to the icon name string:

```html
<dile-material-icon icon="favorite"></dile-material-icon>
<dile-material-icon icon="settings"></dile-material-icon>
```

This enables dynamic icon switching via data-bound strings, ideal for lists or conditional rendering.

## Attributes

- **icon**: String with the name of the imported Material icon

> To find the specific name of each icon, visit the [Material Icons documentation page](https://fonts.google.com/icons) and search for the icon you want to integrate. Only the filled ("Material Icons") style is included; use the icon name as shown there, replacing spaces and underscores with dashes.

## Styling and Features

This component inherits all styling options, CSS custom properties, and the `rounded` attribute from the specific Material icon components documented in [Material Icons Web Components](../material-icons/).

- Use `--dile-icon-size`, `--dile-icon-color`, etc., for customization.
- Add `rounded` for button-like appearance.

## Examples

### Styled Icons

```html:preview
<script type="module">
  import '@dile/iconlib/material/home.js';
  import '@dile/iconlib/material/star.js';
  import '@dile/iconlib/dile-material-icon.js';
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
  <dile-material-icon icon="home" class="styled"></dile-material-icon>
  <dile-material-icon icon="star" class="styled2"></dile-material-icon>
</div>
```

### Rounded Icons

```html:preview
<script type="module">
  import '@dile/iconlib/material/favorite.js';
  import '@dile/iconlib/material/settings.js';
  import '@dile/iconlib/dile-material-icon.js';
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
  <dile-material-icon icon="favorite" rounded class="regular"></dile-material-icon>
  <dile-material-icon icon="settings" rounded class="featured"></dile-material-icon>
</div>
```

## Import Alternatives

Supports the same ES module, inline script, CDN, and `src` attribute methods as specific icons. See [Material Icons Web Components](../material-icons/) for details.
