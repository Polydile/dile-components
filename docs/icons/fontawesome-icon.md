---
layout: layout.html
title: FontAwesome Icon
tags: icons
---

# Generic FontAwesome Icon Web Component

The `dile-fontawesome-icon` Custom Element displays any FontAwesome icon using a single tag and the `icon` attribute, following the Web Components standard.

This generic component requires importing specific FontAwesome icon modules first, then referencing them by name via a string attribute.

```html
<dile-fontawesome-icon icon="facebook"></dile-fontawesome-icon>
<dile-fontawesome-icon icon="google"></dile-fontawesome-icon>
```

Using the tags above renders these icons:

```html:preview
<script type="module">
  import '@dile/iconlib/fontawesome-icons/facebook.js';
  import '@dile/iconlib/fontawesome-icons/google.js';
  import '@dile/iconlib/dile-fontawesome-icon.js';
</script>
<dile-fontawesome-icon icon="facebook"></dile-fontawesome-icon>
<dile-fontawesome-icon icon="google"></dile-fontawesome-icon>
```

## Installation

```bash
npm install @dile/iconlib
```

## Usage

Import the `dile-fontawesome-icon` component and the specific FontAwesome icons:

```javascript
import '@dile/iconlib/dile-fontawesome-icon.js';
import '@dile/iconlib/fontawesome-icons/facebook.js';  // Import needed icons
import '@dile/iconlib/fontawesome-icons/google.js';
```

Set the `icon` attribute to the icon name string:

```html
<dile-fontawesome-icon icon="facebook"></dile-fontawesome-icon>
```

This supports dynamic icon switching via data-bound strings, suitable for lists or conditional rendering.

## Attributes

- **icon**: String with the name of the imported FontAwesome icon (e.g., "facebook", "regular-home")

> Icon names match FontAwesome conventions: brands like "amazon", regular prefixed as "regular-angry". Browse at [FontAwesome icons](https://fontawesome.com/icons/).

## Styling and Features

Inherits all styling, CSS custom properties, and `rounded` attribute from specific FontAwesome components in [FontAwesome Icons Web Components](../fontawesome-icons/).

- Customize with `--dile-icon-size`, `--dile-icon-color`, etc.
- Use `rounded` for button-like appearance.

## Examples

### Styled Icons

```html:preview
<script type="module">
  import '@dile/iconlib/fontawesome-icons/airbnb.js';
  import '@dile/iconlib/fontawesome-icons/11ty.js';
  import '@dile/iconlib/dile-fontawesome-icon.js';
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
  <dile-fontawesome-icon icon="airbnb" class="styled"></dile-fontawesome-icon>
  <dile-fontawesome-icon icon="11ty" class="styled2"></dile-fontawesome-icon>
</div>
```

### Rounded Icons

```html:preview
<script type="module">
  import '@dile/iconlib/fontawesome-icons/facebook.js';
  import '@dile/iconlib/fontawesome-icons/mobile.js';
  import '@dile/iconlib/dile-fontawesome-icon.js';
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
  <dile-fontawesome-icon icon="facebook" rounded class="regular"></dile-fontawesome-icon>
  <dile-fontawesome-icon icon="mobile" rounded class="featured"></dile-fontawesome-icon>
</div>
```

## Import Alternatives

Supports ES module, inline script, CDN, and `src` attribute methods as specific icons. See [FontAwesome Icons Web Components](../fontawesome-icons/) for details.