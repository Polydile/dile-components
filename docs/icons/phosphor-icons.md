---
layout: layout.html
title: Phosphor elements
tags: phosphor
---

# Phosphor Icons Web Components

The `@dile/iconlib` package provides an easy way to use icons from the [Phosphor Icons](https://phosphoricons.com/) library through native Custom Elements based on the Web Components standard.

These elements let you integrate icons using simple HTML tags like this:

```html
<dile-phosphor-icon-house></dile-phosphor-icon-house>
```

Using the tag above will display the following icon with default styles:

```html:preview
<dile-phosphor-icon-house></dile-phosphor-icon-house>
```

This integration also provides various utilities that let you style icons conveniently, among other features described in this page.

## Installation

```bash
npm install @dile/iconlib
```

## Usage

First, import the icon you want to use in your app or website:

```javascript
import '@dile/iconlib/phosphor-icons/house.js';
```

> In this case, the icon is "`house`". To find the specific name of each icon, browse the [Phosphor Icons documentation page](https://phosphoricons.com/) and search for the icon you want to integrate, or search it directly in the [Icon Catalog](../icon-catalog/).

Once you have imported the icon into your project, use the corresponding Custom Element tag, which looks like this:

```html
<dile-phosphor-icon-house></dile-phosphor-icon-house>
```

## Weights

Unlike the other icon libraries, Phosphor ships every icon in 6 different weights: `regular`, `bold`, `duotone`, `fill`, `light` and `thin`. Each weight is a separate Custom Element — the weight is appended as a suffix to the tag name, except for `regular`, which has no suffix:

```html
<dile-phosphor-icon-house></dile-phosphor-icon-house>          <!-- regular -->
<dile-phosphor-icon-house-bold></dile-phosphor-icon-house-bold>
<dile-phosphor-icon-house-duotone></dile-phosphor-icon-house-duotone>
<dile-phosphor-icon-house-fill></dile-phosphor-icon-house-fill>
<dile-phosphor-icon-house-light></dile-phosphor-icon-house-light>
<dile-phosphor-icon-house-thin></dile-phosphor-icon-house-thin>
```

```html:preview
<script type="module">
  import '@dile/iconlib/phosphor-icons/house.js';
  import '@dile/iconlib/phosphor-icons/house-bold.js';
  import '@dile/iconlib/phosphor-icons/house-duotone.js';
  import '@dile/iconlib/phosphor-icons/house-fill.js';
  import '@dile/iconlib/phosphor-icons/house-light.js';
  import '@dile/iconlib/phosphor-icons/house-thin.js';
</script>
<div style="display: flex; gap: 1rem;">
  <dile-phosphor-icon-house></dile-phosphor-icon-house>
  <dile-phosphor-icon-house-bold></dile-phosphor-icon-house-bold>
  <dile-phosphor-icon-house-duotone></dile-phosphor-icon-house-duotone>
  <dile-phosphor-icon-house-fill></dile-phosphor-icon-house-fill>
  <dile-phosphor-icon-house-light></dile-phosphor-icon-house-light>
  <dile-phosphor-icon-house-thin></dile-phosphor-icon-house-thin>
</div>
```

Each icon file/tag pair follows the same naming rule, so importing `phosphor-icons/house-bold.js` registers `dile-phosphor-icon-house-bold`, importing `phosphor-icons/house-duotone.js` registers `dile-phosphor-icon-house-duotone`, and so on.

## rounded Attribute

The `rounded` boolean attribute adds a rounded background area around the SVG, turning the icon into a button-like appearance.

Use it like this:

```html
<dile-phosphor-icon-house rounded></dile-phosphor-icon-house>
```

This applies padding and a circular border radius through CSS custom properties like `--dile-icon-rounded-background-color` and `--dile-icon-rounded-padding`.

## CSS Custom Properties

To style icons easily, use the CSS Custom Properties shown in the table below.

| Custom property                      | Description                        | Default |
| ------------------------------------ | ---------------------------------- | ------- |
| --dile-icon-size                     | Icon size                          | 24px    |
| --dile-icon-color                    | Icon color                         | #888    |
| --dile-icon-transition-duration      | Transition duration                | 0.3s    |
| --dile-icon-rounded-background-color | Background color for rounded icons | #eee    |
| --dile-icon-rounded-padding          | Padding for rounded icons          | 0.5rem  |

> Phosphor icons are fill-based (solid SVG paths, no stroke), so `--dile-icon-stroke-width` has no visible effect on them — it only applies to stroke-based libraries like Lucide.

## Generic `dile-phosphor-icon` Component

A generic component also exists that lets you import any icon from the Phosphor library using a single tag. Specify the icon name (including the weight suffix, if not `regular`) via the `icon` attribute:

```html
<dile-phosphor-icon icon="house"></dile-phosphor-icon>
<dile-phosphor-icon icon="house-bold"></dile-phosphor-icon>
```

See the full [documentation page for the generic dile-phosphor-icon](../phosphor-icon/) for complete usage instructions.

## Included Icons

This package provides all icons available in the Phosphor Icons library, in its 6 weights. You can browse thousands of icons directly in the [Phosphor documentation](https://phosphoricons.com/). Each icon/weight combination has its corresponding Custom Element tag:

```html
<dile-phosphor-icon-acorn></dile-phosphor-icon-acorn>
<dile-phosphor-icon-acorn-bold></dile-phosphor-icon-acorn-bold>
<!-- ... -->
```

All icons accept the same attributes and CSS custom properties. Examples in action are shown below.

### Regular icons

```html:preview
<script type="module">
  import '@dile/iconlib/phosphor-icons/house.js';
  import '@dile/iconlib/phosphor-icons/heart.js';
  import '@dile/iconlib/phosphor-icons/star.js';
</script>
<div style="display: flex; gap: 1rem;">
  <dile-phosphor-icon-house></dile-phosphor-icon-house>
  <dile-phosphor-icon-heart></dile-phosphor-icon-heart>
  <dile-phosphor-icon-star></dile-phosphor-icon-star>
</div>
```

### Styled icons

```html:preview
<script type="module">
  import '@dile/iconlib/phosphor-icons/house.js';
  import '@dile/iconlib/phosphor-icons/heart.js';
  import '@dile/iconlib/phosphor-icons/star.js';
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
   .styled3 {
    --dile-icon-color: #3ba;
    --dile-icon-size: 18px;
   }
</style>
<div style="display: flex; gap: 1rem; align-items: center;">
  <dile-phosphor-icon-house class="styled"></dile-phosphor-icon-house>
  <dile-phosphor-icon-heart class="styled2"></dile-phosphor-icon-heart>
  <dile-phosphor-icon-star class="styled3"></dile-phosphor-icon-star>
</div>
```

### Rounded icons

```html:preview
<script type="module">
  import '@dile/iconlib/phosphor-icons/house-fill.js';
  import '@dile/iconlib/phosphor-icons/heart-fill.js';
</script>
<style>
  .roundedstyled {
    --dile-icon-color: black;
    --dile-icon-size: 32px;
   }
   .roundedstyled2 {
    --dile-icon-color: rgba(255, 255, 255, 1);
    --dile-icon-size: 28px;
    --dile-icon-rounded-background-color: rgba(104, 104, 6, 1);
    --dile-icon-rounded-padding: 1rem;
   }
  .roundedstyled2:hover {
    --dile-icon-rounded-background-color: rgba(62, 62, 34, 1);
  }
</style>
<div style="display: flex; gap: 1rem; align-items: center;">
  <dile-phosphor-icon-house-fill rounded class="roundedstyled"></dile-phosphor-icon-house-fill>
  <dile-phosphor-icon-heart-fill rounded class="roundedstyled2"></dile-phosphor-icon-heart-fill>
</div>
```

## Import Alternatives

### ES Module Import
Import icons directly in JavaScript modules within your build tools or frameworks:

```javascript
import '@dile/iconlib/phosphor-icons/house.js';
```

### Inline Script Import
Load icons dynamically using `<script type="module">` with inline imports:

```html
<script type="module">
  import '@dile/iconlib/phosphor-icons/house.js';
</script>
```

### CDN Script Import
Use public CDNs (unpkg or jsDelivr) with inline imports:

```html
<script type="module">
  import 'https://unpkg.com/@dile/iconlib/phosphor-icons/house.js';
</script>
<!-- or with jsDelivr -->
<script type="module">
  import 'https://cdn.jsdelivr.net/npm/@dile/iconlib/phosphor-icons@latest/house.js';
</script>
```

### CDN Script `src` Attribute
Load via `<script>` `src` attribute for cleaner HTML:

```html
<script type="module" src="https://unpkg.com/@dile/iconlib/phosphor-icons/house.js"></script>
<script type="module" src="https://cdn.jsdelivr.net/npm/@dile/iconlib/phosphor-icons@latest/house.js"></script>
```

All methods register the Custom Element, making `<dile-phosphor-icon-house></dile-phosphor-icon-house>` available immediately after loading.
