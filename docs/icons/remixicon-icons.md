---
layout: layout.html
title: Remix Icon elements
tags: remixicon
---

# Remix Icon Web Components

The `@dile/iconlib` package provides an easy way to use icons from the [Remix Icon](https://remixicon.com/) library through native Custom Elements based on the Web Components standard.

These elements let you integrate icons using simple HTML tags like this:

```html
<dile-remixicon-icon-heart-line></dile-remixicon-icon-heart-line>
```

Using the tag above will display the following icon with default styles:

```html:preview
<dile-remixicon-icon-heart-line></dile-remixicon-icon-heart-line>
```

This integration also provides various utilities that let you style icons conveniently, among other features described in this page.

## Installation

```bash
npm install @dile/iconlib
```

## Usage

First, import the icon you want to use in your app or website:

```javascript
import '@dile/iconlib/remixicon-icons/heart-line.js';
```

> In this case, the icon is "`heart-line`". To find the specific name of each icon, browse the [Remix Icon documentation page](https://remixicon.com/) and search for the icon you want to integrate, or search it directly in the [Icon Catalog](../icon-catalog/).

Once you have imported the icon into your project, use the corresponding Custom Element tag, which looks like this:

```html
<dile-remixicon-icon-heart-line></dile-remixicon-icon-heart-line>
```

## Variants: line and fill

Most Remix Icon icons ship in 2 variants, encoded directly in the icon name: `-line` (outline) and `-fill` (solid). A handful of utility/editor icons (e.g. `bold`, `italic`, `underline`) only exist in a single style, with no suffix at all:

```html
<dile-remixicon-icon-heart-line></dile-remixicon-icon-heart-line>
<dile-remixicon-icon-heart-fill></dile-remixicon-icon-heart-fill>
```

```html:preview
<script type="module">
  import '@dile/iconlib/remixicon-icons/heart-line.js';
  import '@dile/iconlib/remixicon-icons/heart-fill.js';
</script>
<div style="display: flex; gap: 1rem;">
  <dile-remixicon-icon-heart-line></dile-remixicon-icon-heart-line>
  <dile-remixicon-icon-heart-fill></dile-remixicon-icon-heart-fill>
</div>
```

Unlike Lucide or Tabler, Remix Icon's SVGs are fill-based (solid paths, no `stroke`) for both variants — the "line" look comes from the path geometry itself, not from an actual SVG stroke.

## rounded Attribute

The `rounded` boolean attribute adds a rounded background area around the SVG, turning the icon into a button-like appearance.

Use it like this:

```html
<dile-remixicon-icon-heart-line rounded></dile-remixicon-icon-heart-line>
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

> Remix Icon icons are fill-based (solid SVG paths, no stroke), so `--dile-icon-stroke-width` has no visible effect on them — it only applies to stroke-based libraries like Lucide or Tabler's outline variant.

## Generic `dile-remixicon-icon` Component

A generic component also exists that lets you import any icon from the Remix Icon library using a single tag. Specify the icon name (including the `-line`/`-fill` suffix, when it applies) via the `icon` attribute:

```html
<dile-remixicon-icon icon="heart-line"></dile-remixicon-icon>
<dile-remixicon-icon icon="heart-fill"></dile-remixicon-icon>
```

See the full [documentation page for the generic dile-remixicon-icon](../remixicon-icon/) for complete usage instructions.

## Included Icons

This package provides all icons available in the Remix Icon library, in both variants where available. You can browse thousands of icons directly in the [Remix Icon documentation](https://remixicon.com/). Each icon has its corresponding Custom Element tag:

```html
<dile-remixicon-icon-star-line></dile-remixicon-icon-star-line>
<dile-remixicon-icon-star-fill></dile-remixicon-icon-star-fill>
<!-- ... -->
```

All icons accept the same attributes and CSS custom properties. Examples in action are shown below.

### Regular icons

```html:preview
<script type="module">
  import '@dile/iconlib/remixicon-icons/home-line.js';
  import '@dile/iconlib/remixicon-icons/heart-line.js';
  import '@dile/iconlib/remixicon-icons/star-line.js';
</script>
<div style="display: flex; gap: 1rem;">
  <dile-remixicon-icon-home-line></dile-remixicon-icon-home-line>
  <dile-remixicon-icon-heart-line></dile-remixicon-icon-heart-line>
  <dile-remixicon-icon-star-line></dile-remixicon-icon-star-line>
</div>
```

### Styled icons

```html:preview
<script type="module">
  import '@dile/iconlib/remixicon-icons/home-line.js';
  import '@dile/iconlib/remixicon-icons/heart-line.js';
  import '@dile/iconlib/remixicon-icons/star-line.js';
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
  <dile-remixicon-icon-home-line class="styled"></dile-remixicon-icon-home-line>
  <dile-remixicon-icon-heart-line class="styled2"></dile-remixicon-icon-heart-line>
  <dile-remixicon-icon-star-line class="styled3"></dile-remixicon-icon-star-line>
</div>
```

### Rounded icons

```html:preview
<script type="module">
  import '@dile/iconlib/remixicon-icons/home-fill.js';
  import '@dile/iconlib/remixicon-icons/heart-fill.js';
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
  <dile-remixicon-icon-home-fill rounded class="roundedstyled"></dile-remixicon-icon-home-fill>
  <dile-remixicon-icon-heart-fill rounded class="roundedstyled2"></dile-remixicon-icon-heart-fill>
</div>
```

## Import Alternatives

### ES Module Import
Import icons directly in JavaScript modules within your build tools or frameworks:

```javascript
import '@dile/iconlib/remixicon-icons/heart-line.js';
```

### Inline Script Import
Load icons dynamically using `<script type="module">` with inline imports:

```html
<script type="module">
  import '@dile/iconlib/remixicon-icons/heart-line.js';
</script>
```

### CDN Script Import
Use public CDNs (unpkg or jsDelivr) with inline imports:

```html
<script type="module">
  import 'https://unpkg.com/@dile/iconlib/remixicon-icons/heart-line.js';
</script>
<!-- or with jsDelivr -->
<script type="module">
  import 'https://cdn.jsdelivr.net/npm/@dile/iconlib/remixicon-icons@latest/heart-line.js';
</script>
```

### CDN Script `src` Attribute
Load via `<script>` `src` attribute for cleaner HTML:

```html
<script type="module" src="https://unpkg.com/@dile/iconlib/remixicon-icons/heart-line.js"></script>
<script type="module" src="https://cdn.jsdelivr.net/npm/@dile/iconlib/remixicon-icons@latest/heart-line.js"></script>
```

All methods register the Custom Element, making `<dile-remixicon-icon-heart-line></dile-remixicon-icon-heart-line>` available immediately after loading.
