---
layout: layout.html
title: FontAwesome Icons Web Components
---

# FontAwesome Icons Web Components

These native Custom Elements, based on the Web Components standard, let you integrate FontAwesome free icons using simple HTML tags:

```html
<dile-fontawesome-icon-xbox></dile-fontawesome-icon-xbox>
```

Using the tag above will display the Xbox icon with default styles:

```html:preview
<dile-fontawesome-icon-xbox></dile-fontawesome-icon-xbox>
```

This integration provides utilities for styling icons and other features described on this page.

## Installation

```bash
npm install @dile/iconlib
```

## Usage

First, import the icon you want to use in your app or website:

```javascript
import '@dile/iconlib/fontawesome-icons/xbox.js';
```

> Icon names follow FontAwesome conventions. For brands, use names like "xbox", "amazon". For solid icons use the icon name as you find in FontAwesome docs. For regular icons, prefix with "regular-", like "regular-angry". Check the [FontAwesome icons](https://fontawesome.com/icons) page for available icons.

Once imported, use the corresponding Custom Element tag:

```html
<dile-fontawesome-icon-xbox></dile-fontawesome-icon-xbox>
```

## rounded Attribute

The `rounded` boolean attribute adds a rounded background around the SVG for a button-like look.

```html
<dile-fontawesome-icon name="xbox" rounded></dile-fontawesome-icon>
```

It uses CSS custom properties like `--dile-icon-rounded-background-color` and `--dile-icon-rounded-padding`.

## CSS Custom Properties

Style icons with these CSS custom properties:

| Custom property                      | Description                        | Default |
| ------------------------------------ | ---------------------------------- | ------- |
| --dile-icon-size                     | Icon size                          | 24px    |
| --dile-icon-color                    | Icon color                         | #888    |
| --dile-icon-stroke-width             | SVG stroke width                   | 2px     |
| --dile-icon-transition-duration      | Transition duration                | 0.3s    |
| --dile-icon-rounded-background-color | Background for rounded icons       | #eee    |
| --dile-icon-rounded-padding          | Padding for rounded icons          | 0.5rem  |

## Generic `dile-fontawesome-icon` Component

Use the generic component for any FontAwesome icon with the `icon` attribute:

```html
<dile-fontawesome-icon icon="facebook"></dile-fontawesome-icon>
```

See the full [documentation for dile-fontawesome-icon](../fontawesome-icon/) for details.

## Included Icons

This package includes FontAwesome Brands, Solid and Regular icons. Browse them at [FontAwesome](https://fontawesome.com/icons). Each has a dedicated tag like `<dile-fontawesome-icon-{name}>`.

All accept the same attributes and CSS properties.

### Regular Icons

```html:preview
<script type="module">
  import '@dile/iconlib/fontawesome-icons/xbox.js';
  import '@dile/iconlib/fontawesome-icons/11ty.js';
  import '@dile/iconlib/fontawesome-icons/airbnb.js';
  import '@dile/iconlib/fontawesome-icons/amazon.js';
  import '@dile/iconlib/fontawesome-icons/google.js';
  import '@dile/iconlib/fontawesome-icons/facebook.js';
</script>
<div style="display: flex; gap: 1rem;">
  <dile-fontawesome-icon-xbox></dile-fontawesome-icon-xbox>
  <dile-fontawesome-icon-11ty></dile-fontawesome-icon-11ty>
  <dile-fontawesome-icon-airbnb></dile-fontawesome-icon-airbnb>
  <dile-fontawesome-icon-amazon></dile-fontawesome-icon-amazon>
  <dile-fontawesome-icon-google></dile-fontawesome-icon-google>
  <dile-fontawesome-icon-facebook></dile-fontawesome-icon-facebook>
</div>
```

### Styled Icons

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
</style>
<script type="module">
  import '@dile/iconlib/fontawesome-icons/airbnb.js';
  import '@dile/iconlib/fontawesome-icons/11ty.js';
  import '@dile/iconlib/fontawesome-icons/user.js';
  import '@dile/iconlib/fontawesome-icons/regular-angry.js';
</script>
<div style="display: flex; gap: 1rem; align-items: center;">
  <dile-fontawesome-icon-airbnb class="styled"></dile-fontawesome-icon-airbnb>
  <dile-fontawesome-icon-11ty class="styled2"></dile-fontawesome-icon-11ty>
  <dile-fontawesome-icon-user class="styled"></dile-fontawesome-icon-user>
  <dile-fontawesome-icon-regular-angry class="styled2"></dile-fontawesome-icon-regular-angry>
</div>
```

### Icons by Name

```html:preview
<script type="module">
  import '@dile/iconlib/fontawesome-icons/facebook.js';
  import '@dile/iconlib/fontawesome-icons/google.js';
  import '@dile/iconlib/fontawesome-icons/regular-home.js';
  import '@dile/iconlib/fontawesome-icons/mobile.js';
  import '@dile/iconlib/dile-fontawesome-icon.js';
</script>
<div style="display: flex; gap: 1rem;">
  <dile-fontawesome-icon icon="facebook"></dile-fontawesome-icon>
  <dile-fontawesome-icon icon="google"></dile-fontawesome-icon>
  <dile-fontawesome-icon icon="regular-home"></dile-fontawesome-icon>
  <dile-fontawesome-icon icon="mobile"></dile-fontawesome-icon>
</div>
```

### Rounded Icons

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
  }
</style>
<script type="module">
  import '@dile/iconlib/fontawesome-icons/xbox.js';
  import '@dile/iconlib/fontawesome-icons/airbnb.js';
  import '@dile/iconlib/fontawesome-icons/facebook.js';
</script>
<div style="display: flex; gap: 1rem; align-items: center;">
  <dile-fontawesome-icon-xbox rounded class="roundedstyled"></dile-fontawesome-icon-xbox>
  <dile-fontawesome-icon-airbnb rounded class="roundedstyled2"></dile-fontawesome-icon-airbnb>
  <dile-fontawesome-icon-facebook rounded class="roundedstyled3"></dile-fontawesome-icon-facebook>
</div>
```

## Import Alternatives

### ES Module Import
```javascript
import '@dile/iconlib/fontawesome-icons/xbox.js';
```

### Inline Script Import
```html
<script type="module">
  import '@dile/iconlib/fontawesome-icons/xbox.js';
</script>
```

### CDN Script Import
```html
<script type="module">
  import 'https://unpkg.com/@dile/iconlib/fontawesome-icons/xbox.js';
</script>
<!-- or jsDelivr -->
<script type="module">
  import 'https://cdn.jsdelivr.net/npm/@dile/iconlib/fontawesome-icons@latest/xbox.js';
</script>
```

### CDN Script `src` Attribute
```html
<script type="module" src="https://unpkg.com/@dile/iconlib/fontawesome-icons/xbox.js"></script>
<script type="module" src="https://cdn.jsdelivr.net/npm/@dile/iconlib/fontawesome-icons@latest/xbox.js"></script>
```