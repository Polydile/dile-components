---
layout: layout.html
title: Remix Icon Generic
tags: remixicon
---

# Generic Remix Icon Web Component

The `dile-remixicon-icon` Custom Element provides a flexible way to display any Remix Icon using a single tag and the `icon` attribute, following the Web Components standard.

This generic component requires importing the specific Remix Icon modules first, then referencing them by name via a string attribute.

```html
<dile-remixicon-icon icon="heart-line"></dile-remixicon-icon>
<dile-remixicon-icon icon="star-fill"></dile-remixicon-icon>
```

Using the tags above will render the following icons:


```html:preview
<script type="module">
  import '@dile/iconlib/remixicon-icons/heart-line.js';
  import '@dile/iconlib/remixicon-icons/star-fill.js';
  import '@dile/iconlib/dile-remixicon-icon.js';
</script>
<dile-remixicon-icon icon="heart-line"></dile-remixicon-icon>
<dile-remixicon-icon icon="star-fill"></dile-remixicon-icon>
```

## Installation

```bash
npm install @dile/iconlib
```

## Usage

Import the `dile-remixicon-icon` component and the specific Remix Icon modules you plan to use:

```javascript
import '@dile/iconlib/dile-remixicon-icon.js';
import '@dile/iconlib/remixicon-icons/heart-line.js';   // Import needed icons
import '@dile/iconlib/remixicon-icons/star-fill.js';
```

Set the `icon` attribute to the icon name string:

```html
<dile-remixicon-icon icon="heart-line"></dile-remixicon-icon>
<dile-remixicon-icon icon="star-fill"></dile-remixicon-icon>
```

This enables dynamic icon switching via data-bound strings, ideal for lists or conditional rendering.

## Attributes

- **icon**: String with the name of the imported Remix Icon, including the `-line`/`-fill` suffix when it applies (e.g. `"heart-line"`, `"heart-fill"`). A small set of utility icons have no suffix at all (e.g. `"bold"`, `"italic"`).

> To find the specific name of each icon, visit the [Remix Icon documentation page](https://remixicon.com/), search it in the [Icon Catalog](../icon-catalog/), or check the [Remix Icon web components page](../remixicon-icons/).

## Styling and Features

This component inherits all styling options, CSS custom properties, and the `rounded` attribute from the specific Remix Icon components documented in [Remix Icon Web Components](../remixicon-icons/).

- Use `--dile-icon-size`, `--dile-icon-color`, etc., for customization.
- Add `rounded` for button-like appearance.

## Examples

### Styled Icons

```html:preview
<script type="module">
  import '@dile/iconlib/remixicon-icons/star-line.js';
  import '@dile/iconlib/remixicon-icons/heart-line.js';
  import '@dile/iconlib/dile-remixicon-icon.js';
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
  <dile-remixicon-icon icon="star-line" class="styled"></dile-remixicon-icon>
  <dile-remixicon-icon icon="heart-line" class="styled2"></dile-remixicon-icon>
</div>
```

### Rounded Icons

```html:preview
<script type="module">
  import '@dile/iconlib/remixicon-icons/home-fill.js';
  import '@dile/iconlib/remixicon-icons/heart-fill.js';
  import '@dile/iconlib/dile-remixicon-icon.js';
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
  <dile-remixicon-icon icon="home-fill" rounded class="regular"></dile-remixicon-icon>
  <dile-remixicon-icon icon="heart-fill" rounded class="featured"></dile-remixicon-icon>
</div>
```

## Import Alternatives

Supports the same ES module, inline script, CDN, and `src` attribute methods as specific icons. See [Remix Icon Web Components](../remixicon-icons/) for details.
