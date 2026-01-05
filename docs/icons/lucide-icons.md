---
layout: layout.html
title: Lucide Icons Web Components
---

# Lucide Icons Web Components

The `@dile/iconlib` package provides an easy way to use icons from the [Lucide Icons](https://lucide.dev/icons/) library through native Custom Elements based on the Web Components standard.

These elements let you integrate icons using simple HTML tags like this:

```html
<dile-lucide-icon-bird></dile-lucide-icon-bird>
```

Using the tag above will display the following icon with default styles:

```html:preview
<dile-lucide-icon-bird></dile-lucide-icon-bird>
```

This integration also provides various utilities that let you style icons conveniently, among other features described in this page.

## Installation 

```bash
npm install @dile/iconlib 
```

## Usage

First, import the icon you want to use in your app or website:

```javascript
import '@dile/iconlib/lucide-icons/bird.js';
```

> In this case, the icon is "`bird`". To find the specific name of each icon, visit the [Lucide Icons documentation page](https://lucide.dev/icons/) and search for the icon you want to integrate.

Once you have imported the icon into your project, use the corresponding Custom Element tag, which looks like this:

```html
<dile-lucide-icon-bird></dile-lucide-icon-bird>
```

## rounded Attribute

The `rounded` boolean attribute adds a rounded background area around the SVG, turning the icon into a button-like appearance.

Use it like this:

```html
<dile-icon-lucide name="bird" rounded></dile-icon-lucide>
```

This applies padding and a circular border radius through CSS custom properties like `--dile-icon-rounded-background-color` and `--dile-icon-rounded-padding`.

## CSS Custom Properties

To style icons easily, use the CSS Custom Properties shown in the table below.


| Custom property                      | Description                        | Default |
| ------------------------------------ | ---------------------------------- | ------- |
| --dile-icon-size                     | Icon size                          | 24px    |
| --dile-icon-color                    | Icon color                         | #888    |
| --dile-icon-stroke-width             | SVG stroke width                   | 2px     |
| --dile-icon-transition-duration      | Transition duration                | 0.3s    |
| --dile-icon-rounded-background-color | Background color for rounded icons | #eee    |
| --dile-icon-rounded-padding          | Padding for rounded icons          | 0.5rem  |

## Generic `dile-lucide-icon` Component

A generic component also exists that lets you import any icon from the Lucide library using a single tag. Specify the icon name via the `icon` attribute:

```html
<dile-lucide-icon icon="notebook"></dile-lucide-icon>
```

See the full [documentation page for the generic dile-lucide-icon](../lucide-icon/) for complete usage instructions.

## Included Icons

This package provides all icons available in the Lucide Icons library. You can browse thousands of icons directly in the [Lucide documentation](https://lucide.dev/icons/). Each icon has its corresponding Custom Element tag:

```html
<dile-icon-lucide name="accessibility"></dile-icon-lucide>
<dile-icon-lucide name="warehouse"></dile-icon-lucide>
<!-- ... -->
```

All icons accept the same attributes and CSS custom properties. Examples in action are shown below.

### Regular icons

```html:preview
<script type="module">
  import '@dile/iconlib/lucide-icons/accessibility.js';
  import '@dile/iconlib/lucide-icons/bird.js';
  import '@dile/iconlib/lucide-icons/dribbble.js';
  import '@dile/iconlib/lucide-icons/warehouse.js';
  import '@dile/iconlib/lucide-icons/chromium.js';
  import '@dile/iconlib/lucide-icons/notebook.js';
</script>
<div style="display: flex; gap: 1rem;">
  <dile-lucide-icon-accessibility></dile-lucide-icon-accessibility>
  <dile-lucide-icon-bird></dile-lucide-icon-bird>
  <dile-lucide-icon-dribbble></dile-lucide-icon-dribbble>
  <dile-lucide-icon-warehouse></dile-lucide-icon-warehouse>
  <dile-lucide-icon-chromium></dile-lucide-icon-chromium>
  <dile-lucide-icon-notebook></dile-lucide-icon-notebook>
</div>
```

### Styled icons

```html:preview
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
  <dile-lucide-icon-accessibility class="styled"></dile-lucide-icon-accessibility>
  <dile-lucide-icon-bird class="styled2"></dile-lucide-icon-bird>
  <dile-lucide-icon-dribbble class="styled3"></dile-lucide-icon-dribbble>
  <dile-lucide-icon-warehouse class="styled"></dile-lucide-icon-warehouse>
  <dile-lucide-icon-chromium class="styled2"></dile-lucide-icon-chromium>
  <dile-lucide-icon-notebook class="styled3"></dile-lucide-icon-notebook>
</div>
```

### Rounded icons

```html:preview
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

   .roundedstyled3 {
    --dile-icon-rounded-background-color: #b7e9f2;
    --dile-icon-color: #000;
    --dile-icon-size: 22px;
   }
   .roundedstyled3:hover {
    --dile-icon-rounded-background-color: #285d67;
    --dile-icon-color: #ffffff;
    --dile-icon-size: 22px;
   }
</style>
<div style="display: flex; gap: 1rem; align-items: center;">
  <dile-lucide-icon-accessibility rounded class="roundedstyled"></dile-lucide-icon-accessibility>
  <dile-lucide-icon-bird rounded class="roundedstyled2"></dile-lucide-icon-bird>
  <dile-lucide-icon-dribbble rounded class="roundedstyled3"></dile-lucide-icon-dribbble>
  <dile-lucide-icon-warehouse rounded class="roundedstyled"></dile-lucide-icon-warehouse>
  <dile-lucide-icon-chromium rounded class="roundedstyled2"></dile-lucide-icon-chromium>
  <dile-lucide-icon-notebook rounded class="roundedstyled3"></dile-lucide-icon-notebook>
</div>
```

## Import Alternatives

### ES Module Import
Import icons directly in JavaScript modules within your build tools or frameworks:

```javascript
import '@dile/iconlib/lucide-icons/bird.js';
```

### Inline Script Import
Load icons dynamically using `<script type="module">` with inline imports:

```html
<script type="module">
  import '@dile/iconlib/lucide-icons/bird.js';
</script>
```

### CDN Script Import
Use public CDNs (unpkg or jsDelivr) with inline imports:

```html
<script type="module">
  import 'https://unpkg.com/@dile/iconlib/lucide-icons/bird.js';
</script>
<!-- or with jsDelivr -->
<script type="module">
  import 'https://cdn.jsdelivr.net/npm/@dile/iconlib/lucide-icons@latest/bird.js';
</script>
```

### CDN Script `src` Attribute
Load via `<script>` `src` attribute for cleaner HTML:

```html
<script type="module" src="https://unpkg.com/@dile/iconlib/lucide-icons/bird.js"></script>
<script type="module" src="https://cdn.jsdelivr.net/npm/@dile/iconlib/lucide-icons@latest/bird.js"></script>
```

All methods register the Custom Element, making `<dile-icon-lucide name="bird"></dile-icon-lucide>` available immediately after loading.
