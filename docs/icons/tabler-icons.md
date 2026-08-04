---
layout: layout.html
title: Tabler elements
tags: tabler
---

# Tabler Icons Web Components

The `@dile/iconlib` package provides an easy way to use icons from the [Tabler Icons](https://tabler.io/icons) library through native Custom Elements based on the Web Components standard.

These elements let you integrate icons using simple HTML tags like this:

```html
<dile-tabler-icon-heart></dile-tabler-icon-heart>
```

Using the tag above will display the following icon with default styles:

```html:preview
<dile-tabler-icon-heart></dile-tabler-icon-heart>
```

This integration also provides various utilities that let you style icons conveniently, among other features described in this page.

## Installation

```bash
npm install @dile/iconlib
```

## Usage

First, import the icon you want to use in your app or website:

```javascript
import '@dile/iconlib/tabler-icons/heart.js';
```

> In this case, the icon is "`heart`". To find the specific name of each icon, browse the [Tabler Icons documentation page](https://tabler.io/icons) and search for the icon you want to integrate, or search it directly in the [Icon Catalog](../icon-catalog/).

Once you have imported the icon into your project, use the corresponding Custom Element tag, which looks like this:

```html
<dile-tabler-icon-heart></dile-tabler-icon-heart>
```

## Variants: outline and filled

Tabler ships every icon in 2 variants: `outline` (stroke-based, the library's default style) and `filled` (solid). The `filled` variant is only available for a subset of the icons. The variant is appended as a suffix `-filled` to the tag name; the outline variant has no suffix:

```html
<dile-tabler-icon-heart></dile-tabler-icon-heart>                <!-- outline -->
<dile-tabler-icon-heart-filled></dile-tabler-icon-heart-filled>  <!-- filled -->
```

```html:preview
<script type="module">
  import '@dile/iconlib/tabler-icons/heart.js';
  import '@dile/iconlib/tabler-icons/heart-filled.js';
</script>
<div style="display: flex; gap: 1rem;">
  <dile-tabler-icon-heart></dile-tabler-icon-heart>
  <dile-tabler-icon-heart-filled></dile-tabler-icon-heart-filled>
</div>
```

Each icon file/tag pair follows the same naming rule, so importing `tabler-icons/heart-filled.js` registers `dile-tabler-icon-heart-filled`.

## rounded Attribute

The `rounded` boolean attribute adds a rounded background area around the SVG, turning the icon into a button-like appearance.

Use it like this:

```html
<dile-tabler-icon-heart rounded></dile-tabler-icon-heart>
```

This applies padding and a circular border radius through CSS custom properties like `--dile-icon-rounded-background-color` and `--dile-icon-rounded-padding`.

## CSS Custom Properties

To style icons easily, use the CSS Custom Properties shown in the table below.

| Custom property                      | Description                        | Default |
| ------------------------------------ | ---------------------------------- | ------- |
| --dile-icon-size                     | Icon size                          | 24px    |
| --dile-icon-color                    | Icon color                         | #888    |
| --dile-icon-stroke-width             | SVG stroke width (outline variant) | 2px     |
| --dile-icon-transition-duration      | Transition duration                | 0.3s    |
| --dile-icon-rounded-background-color | Background color for rounded icons | #eee    |
| --dile-icon-rounded-padding          | Padding for rounded icons          | 0.5rem  |

> `--dile-icon-stroke-width` only has a visible effect on the `outline` variant (stroke-based, same 24x24 canvas convention as Lucide). The `filled` variant is solid, like Material or FontAwesome, so stroke width doesn't apply to it.

## Generic `dile-tabler-icon` Component

A generic component also exists that lets you import any icon from the Tabler library using a single tag. Specify the icon name (including the `-filled` suffix, if not outline) via the `icon` attribute:

```html
<dile-tabler-icon icon="heart"></dile-tabler-icon>
<dile-tabler-icon icon="heart-filled"></dile-tabler-icon>
```

See the full [documentation page for the generic dile-tabler-icon](../tabler-icon/) for complete usage instructions.

## Included Icons

This package provides all icons available in the Tabler Icons library, in both variants. You can browse thousands of icons directly in the [Tabler documentation](https://tabler.io/icons). Each icon/variant combination has its corresponding Custom Element tag:

```html
<dile-tabler-icon-star></dile-tabler-icon-star>
<dile-tabler-icon-star-filled></dile-tabler-icon-star-filled>
<!-- ... -->
```

All icons accept the same attributes and CSS custom properties. Examples in action are shown below.

### Regular icons

```html:preview
<script type="module">
  import '@dile/iconlib/tabler-icons/home.js';
  import '@dile/iconlib/tabler-icons/heart.js';
  import '@dile/iconlib/tabler-icons/star.js';
</script>
<div style="display: flex; gap: 1rem;">
  <dile-tabler-icon-home></dile-tabler-icon-home>
  <dile-tabler-icon-heart></dile-tabler-icon-heart>
  <dile-tabler-icon-star></dile-tabler-icon-star>
</div>
```

### Styled icons

```html:preview
<script type="module">
  import '@dile/iconlib/tabler-icons/home.js';
  import '@dile/iconlib/tabler-icons/heart.js';
  import '@dile/iconlib/tabler-icons/star.js';
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
  <dile-tabler-icon-home class="styled"></dile-tabler-icon-home>
  <dile-tabler-icon-heart class="styled2"></dile-tabler-icon-heart>
  <dile-tabler-icon-star class="styled3"></dile-tabler-icon-star>
</div>
```

### Rounded icons

```html:preview
<script type="module">
  import '@dile/iconlib/tabler-icons/home-filled.js';
  import '@dile/iconlib/tabler-icons/heart-filled.js';
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
  <dile-tabler-icon-home-filled rounded class="roundedstyled"></dile-tabler-icon-home-filled>
  <dile-tabler-icon-heart-filled rounded class="roundedstyled2"></dile-tabler-icon-heart-filled>
</div>
```

## Import Alternatives

### ES Module Import
Import icons directly in JavaScript modules within your build tools or frameworks:

```javascript
import '@dile/iconlib/tabler-icons/heart.js';
```

### Inline Script Import
Load icons dynamically using `<script type="module">` with inline imports:

```html
<script type="module">
  import '@dile/iconlib/tabler-icons/heart.js';
</script>
```

### CDN Script Import
Use public CDNs (unpkg or jsDelivr) with inline imports:

```html
<script type="module">
  import 'https://unpkg.com/@dile/iconlib/tabler-icons/heart.js';
</script>
<!-- or with jsDelivr -->
<script type="module">
  import 'https://cdn.jsdelivr.net/npm/@dile/iconlib/tabler-icons@latest/heart.js';
</script>
```

### CDN Script `src` Attribute
Load via `<script>` `src` attribute for cleaner HTML:

```html
<script type="module" src="https://unpkg.com/@dile/iconlib/tabler-icons/heart.js"></script>
<script type="module" src="https://cdn.jsdelivr.net/npm/@dile/iconlib/tabler-icons@latest/heart.js"></script>
```

All methods register the Custom Element, making `<dile-tabler-icon-heart></dile-tabler-icon-heart>` available immediately after loading.
