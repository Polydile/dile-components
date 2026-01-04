---
layout: layout.html
title: Lucide Icon
tags: icons
---

# Generic Lucide Icon Web Component

The `dile-lucide-icon` Custom Element provides a flexible way to display any Lucide icon using a single tag and the `icon` attribute, following the Web Components standard.

This generic component requires importing the specific Lucide icon modules first, then referencing them by name via a string attribute.

```html
<dile-lucide-icon icon="notebook"></dile-lucide-icon>
<dile-lucide-icon icon="chromium"></dile-lucide-icon>
```

Using the tags above will render the following icons:


```html:preview
<script type="module">
  import '@dile/iconlib/lucide-icons/chromium.js';
  import '@dile/iconlib/lucide-icons/notebook.js';
  import '@dile/iconlib/dile-lucide-icon.js';
</script>
<dile-lucide-icon icon="notebook"></dile-lucide-icon>
<dile-lucide-icon icon="chromium"></dile-lucide-icon>
```

## Installation

```bash
npm install @dile/iconlib
```

## Usage

Import the `dile-lucide-icon` component and the specific Lucide icons you plan to use:

```javascript
import '@dile/iconlib/dile-lucide-icon.js';
import '@dile/iconlib/lucide-icons/notebook.js';  // Import needed icons
import '@dile/iconlib/lucide-icons/chromium.js';
```

Set the `icon` attribute to the icon name string:

```html
<dile-lucide-icon icon="notebook"></dile-lucide-icon>
```

This enables dynamic icon switching via data-bound strings, ideal for lists or conditional rendering.

## Attributes

- **icon**: String with the name of the imported Lucide icon

> To find the specific name of each icon, visit the [Lucide Icons documentation page](https://lucide.dev/icons/) and search for the icon you want to integrate.

## Styling and Features

This component inherits all styling options, CSS custom properties, and the `rounded` attribute from the specific Lucide icon components documented in [Lucide Icons Web Components](../lucide-icons/).

- Use `--dile-icon-size`, `--dile-icon-color`, etc., for customization.
- Add `rounded` for button-like appearance.

## Examples

### Styled Icons

```html:preview
<script type="module">
  import '@dile/iconlib/lucide-icons/accessibility.js';
  import '@dile/iconlib/lucide-icons/bird.js';
  import '@dile/iconlib/dile-lucide-icon.js';
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
  <dile-lucide-icon icon="accessibility" class="styled"></dile-lucide-icon>
  <dile-lucide-icon icon="bird" class="styled2"></dile-lucide-icon>
</div>
```

### Rounded Icons

```html:preview
<script type="module">
  import '@dile/iconlib/lucide-icons/notebook.js';
  import '@dile/iconlib/lucide-icons/chromium.js';
  import '@dile/iconlib/dile-lucide-icon.js';
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
  <dile-lucide-icon icon="notebook" rounded class="regular"></dile-lucide-icon>
  <dile-lucide-icon icon="chromium" rounded class="featured"></dile-lucide-icon>
</div>
```

## Import Alternatives

Supports the same ES module, inline script, CDN, and `src` attribute methods as specific icons. See [Lucide Icons Web Components](../lucide-icons/) for details.
