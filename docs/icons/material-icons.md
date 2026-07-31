---
layout: layout.html
title: Material elements
tags: material
---

# Material Icons Web Components

The `@dile/iconlib` package provides an easy way to use icons from Google's [Material Icons](https://fonts.google.com/icons) library through native Custom Elements based on the Web Components standard.

These elements let you integrate icons using simple HTML tags like this:

```html
<dile-material-icon-home></dile-material-icon-home>
```

Using the tag above will display the following icon with default styles:

```html:preview
<dile-material-icon-home></dile-material-icon-home>
```

This integration also provides various utilities that let you style icons conveniently, among other features described in this page.

> Looking for the previous, smaller icon set built on Lit? See the [legacy Material Icons implementation](/icons/material-icons-legacy/).

## Installation 

```bash
npm install @dile/iconlib 
```

## Usage

First, import the icon you want to use in your app or website:

```javascript
import '@dile/iconlib/material-icons/home.js';
```

> In this case, the icon is "`home`". To find the specific name of each icon, visit the [Material Icons documentation page](https://fonts.google.com/icons) and search for the icon you want to integrate. Only the filled ("Material Icons") style is included; use the icon name as shown there, replacing spaces and underscores with dashes.

Once you have imported the icon into your project, use the corresponding Custom Element tag, which looks like this:

```html
<dile-material-icon-home></dile-material-icon-home>
```

## rounded Attribute

The `rounded` boolean attribute adds a rounded background area around the SVG, turning the icon into a button-like appearance.

Use it like this:

```html
<dile-material-icon-home rounded></dile-material-icon-home>
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

## Generic `dile-material-icon` Component

A generic component also exists that lets you import any icon from the Material library using a single tag. Specify the icon name via the `icon` attribute:

```html
<dile-material-icon icon="favorite"></dile-material-icon>
```

See the full [documentation page for the generic dile-material-icon](../material-icon/) for complete usage instructions.

## Included Icons

This package provides the "filled" style of every icon available in the Material Icons library. You can browse thousands of icons directly in the [Material Icons documentation](https://fonts.google.com/icons). Each icon has its corresponding Custom Element tag:

```html
<dile-material-icon-home></dile-material-icon-home>
<dile-material-icon-favorite></dile-material-icon-favorite>
<!-- ... -->
```

All icons accept the same attributes and CSS custom properties. Examples in action are shown below.

### Regular icons

```html:preview
<script type="module">
  import '@dile/iconlib/material-icons/home.js';
  import '@dile/iconlib/material-icons/star.js';
  import '@dile/iconlib/material-icons/favorite.js';
  import '@dile/iconlib/material-icons/search.js';
  import '@dile/iconlib/material-icons/settings.js';
  import '@dile/iconlib/material-icons/notifications.js';
</script>
<div style="display: flex; gap: 1rem;">
  <dile-material-icon-home></dile-material-icon-home>
  <dile-material-icon-star></dile-material-icon-star>
  <dile-material-icon-favorite></dile-material-icon-favorite>
  <dile-material-icon-search></dile-material-icon-search>
  <dile-material-icon-settings></dile-material-icon-settings>
  <dile-material-icon-notifications></dile-material-icon-notifications>
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
  <dile-material-icon-home class="styled"></dile-material-icon-home>
  <dile-material-icon-star class="styled2"></dile-material-icon-star>
  <dile-material-icon-favorite class="styled3"></dile-material-icon-favorite>
  <dile-material-icon-search class="styled"></dile-material-icon-search>
  <dile-material-icon-settings class="styled2"></dile-material-icon-settings>
  <dile-material-icon-notifications class="styled3"></dile-material-icon-notifications>
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
  <dile-material-icon-home rounded class="roundedstyled"></dile-material-icon-home>
  <dile-material-icon-star rounded class="roundedstyled2"></dile-material-icon-star>
  <dile-material-icon-favorite rounded class="roundedstyled3"></dile-material-icon-favorite>
  <dile-material-icon-search rounded class="roundedstyled"></dile-material-icon-search>
  <dile-material-icon-settings rounded class="roundedstyled2"></dile-material-icon-settings>
  <dile-material-icon-notifications rounded class="roundedstyled3"></dile-material-icon-notifications>
</div>
```

## Import Alternatives

### ES Module Import
Import icons directly in JavaScript modules within your build tools or frameworks:

```javascript
import '@dile/iconlib/material-icons/home.js';
```

### Inline Script Import
Load icons dynamically using `<script type="module">` with inline imports:

```html
<script type="module">
  import '@dile/iconlib/material-icons/home.js';
</script>
```

### CDN Script Import
Use public CDNs (unpkg or jsDelivr) with inline imports:

```html
<script type="module">
  import 'https://unpkg.com/@dile/iconlib/material-icons/home.js';
</script>
<!-- or with jsDelivr -->
<script type="module">
  import 'https://cdn.jsdelivr.net/npm/@dile/iconlib/material-icons@latest/home.js';
</script>
```

### CDN Script `src` Attribute
Load via `<script>` `src` attribute for cleaner HTML:

```html
<script type="module" src="https://unpkg.com/@dile/iconlib/material-icons/home.js"></script>
<script type="module" src="https://cdn.jsdelivr.net/npm/@dile/iconlib/material-icons@latest/home.js"></script>
```

All methods register the Custom Element, making `<dile-material-icon-home></dile-material-icon-home>` available immediately after loading.
