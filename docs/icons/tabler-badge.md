---
layout: layout.html
title: Tabler Badge
tags: tabler
---

# Tabler Badge Web Component

The `dile-tabler-badge` Custom Element is a Tabler-specific specialization of the generic `dile-icon-badge` component. It keeps the same normalized badge API and CSS variables, but it is limited to Tabler icons and a single icon family.

> Use `dile-icon-badge` when you want one markup pattern that can switch between icon libraries; use `dile-tabler-badge` when you explicitly want the badge tied to the Tabler family.

```html
<dile-tabler-badge icon="hourglass">Waiting</dile-tabler-badge>
<dile-tabler-badge icon="circle-check" variant="success">Completed</dile-tabler-badge>
<dile-tabler-badge icon="alert-circle" variant="danger">Error</dile-tabler-badge>
```

Using the tags above will render the following badges:

```html:preview
<script type="module">
  import '@dile/iconlib/tabler-icons/hourglass.js';
  import '@dile/iconlib/tabler-icons/circle-check.js';
  import '@dile/iconlib/tabler-icons/alert-circle.js';
  import '@dile/iconlib/dile-tabler-icon.js';
  import '@dile/iconlib/dile-tabler-badge.js';
</script>
<style>
  dile-tabler-badge {
    margin-right: 0.5rem;
    margin-bottom: 0.5rem;
  }
</style>
<div>
  <dile-tabler-badge icon="hourglass">Waiting</dile-tabler-badge>
  <dile-tabler-badge icon="circle-check" variant="success">Completed</dile-tabler-badge>
  <dile-tabler-badge icon="alert-circle" variant="danger">Error</dile-tabler-badge>
</div>
```

## Installation

```bash
npm install @dile/iconlib
```

## Usage

Import the `dile-tabler-badge` component and the specific Tabler icons you need:

```javascript
import '@dile/iconlib/dile-tabler-badge.js';
import '@dile/iconlib/tabler-icons/hourglass.js';  // Import needed icons
import '@dile/iconlib/tabler-icons/circle-check.js';
```

Use the component with an `icon` attribute and text content:

```html
<dile-tabler-badge icon="hourglass">Waiting</dile-tabler-badge>
<dile-tabler-badge icon="circle-check" variant="success">Done</dile-tabler-badge>
```

## Attributes

- **icon** (required): String with the name of the imported Tabler icon, including the `-filled` suffix when using the filled variant
- **variant** (optional): Style variant. Available options: `primary`, `secondary`, `success`, `warning`, `error`, `danger`, `soft`. Defaults to primary styling.

> To find the specific name of each icon, visit the [Tabler Icons documentation page](https://tabler.io/icons) or search it in the [Icon Catalog](../icon-catalog/).

## Content

The text content of the badge is passed as the element's text content (slot). This allows for flexible content including plain text or additional styling:

```html
<dile-tabler-badge icon="star">Favorite</dile-tabler-badge>
<dile-tabler-badge icon="clock">5 min ago</dile-tabler-badge>
<dile-tabler-badge icon="user">John Doe</dile-tabler-badge>
```

## CSS Custom Properties

The badge API has been normalized to a single set of CSS custom properties. The family-specific variables used previously are no longer the active contract.

Custom property | Description | Default
----------------|-------------|---------
--dile-badge-color | Badge background color | --dile-primary-color or #f3f3ae
--dile-badge-on-color | Text and icon color | --dile-on-primary-color or #303030
--dile-badge-font-size | Text size | 0.8rem
--dile-badge-font-weight | Text weight | 500
--dile-badge-gap | Space between icon and text | 0.5rem
--dile-badge-padding | Inner spacing | 0.375rem 0.75rem
--dile-badge-border-radius | Border radius (pill shape) | 9999px
--dile-badge-border-width | Border thickness | 0px
--dile-badge-border-color | Border color | transparent
--dile-badge-transition-duration | Animation duration | 0.3s
--dile-badge-icon-size | Icon size | 18px

### Variant-Specific Properties

Custom property | Description | Default
----------------|-------------|---------
--dile-badge-primary | Primary variant background | --dile-primary-color
--dile-badge-on-primary | Primary variant text/icon color | --dile-on-primary-color
--dile-badge-secondary | Secondary variant background | --dile-secondary-color
--dile-badge-on-secondary | Secondary variant text/icon color | --dile-on-secondary-color
--dile-badge-success | Success variant background | --dile-alert-success-color
--dile-badge-on-success | Success variant text/icon color | --dile-on-alert-color
--dile-badge-warning | Warning variant background | --dile-alert-warning-color
--dile-badge-on-warning | Warning variant text/icon color | --dile-on-alert-color
--dile-badge-error | Error variant background | --dile-alert-error-color
--dile-badge-on-error | Error variant text/icon color | --dile-on-alert-color
--dile-badge-danger | Danger variant background | --dile-danger-color
--dile-badge-on-danger | Danger variant text/icon color | --dile-on-danger-color
--dile-badge-soft | Soft variant background | #2a7a9f
--dile-badge-on-soft | Soft variant text/icon color | #ffffff

## Examples

### Basic Badges

```html:preview
<script type="module">
  import '@dile/iconlib/tabler-icons/home.js';
  import '@dile/iconlib/tabler-icons/star.js';
  import '@dile/iconlib/tabler-icons/user.js';
  import '@dile/iconlib/dile-tabler-icon.js';
  import '@dile/iconlib/dile-tabler-badge.js';
</script>
<style>
  dile-tabler-badge {
    margin-right: 0.5rem;
    margin-bottom: 0.5rem;
  }
</style>
<div>
  <dile-tabler-badge icon="home">Home</dile-tabler-badge>
  <dile-tabler-badge icon="star">Favorite</dile-tabler-badge>
  <dile-tabler-badge icon="user">Profile</dile-tabler-badge>
</div>
```

### Variant Examples

```html:preview
<script type="module">
  import '@dile/iconlib/tabler-icons/info-circle.js';
  import '@dile/iconlib/tabler-icons/circle-check.js';
  import '@dile/iconlib/tabler-icons/alert-triangle.js';
  import '@dile/iconlib/tabler-icons/exclamation-circle.js';
  import '@dile/iconlib/tabler-icons/trash.js';
  import '@dile/iconlib/dile-tabler-icon.js';
  import '@dile/iconlib/dile-tabler-badge.js';
</script>
<style>
  dile-tabler-badge {
    margin-right: 0.5rem;
    margin-bottom: 0.5rem;
  }
</style>
<div>
  <dile-tabler-badge icon="info-circle" variant="primary">Primary</dile-tabler-badge>
  <dile-tabler-badge icon="circle-check" variant="success">Success</dile-tabler-badge>
  <dile-tabler-badge icon="alert-triangle" variant="warning">Warning</dile-tabler-badge>
  <dile-tabler-badge icon="exclamation-circle" variant="error">Error</dile-tabler-badge>
  <dile-tabler-badge icon="trash" variant="danger">Delete</dile-tabler-badge>
  <dile-tabler-badge icon="info-circle" variant="soft">Info</dile-tabler-badge>
</div>
```

### Size Variations

```html:preview
<script type="module">
  import '@dile/iconlib/tabler-icons/clock.js';
  import '@dile/iconlib/dile-tabler-icon.js';
  import '@dile/iconlib/dile-tabler-badge.js';
</script>
<style>
  .small-badge {
    --dile-tabler-badge-font-size: 0.7rem;
    --dile-icon-size: 16px;
    --dile-tabler-badge-padding: 0.25rem 0.5rem;
  }
  .large-badge {
    --dile-tabler-badge-font-size: 1rem;
    --dile-icon-size: 28px;
    --dile-tabler-badge-padding: 0.5rem 1rem;
  }
  dile-tabler-badge {
    margin-right: 0.5rem;
    margin-bottom: 0.5rem;
  }
</style>
<div>
  <dile-tabler-badge icon="clock" class="small-badge">Small</dile-tabler-badge>
  <dile-tabler-badge icon="clock">Normal</dile-tabler-badge>
  <dile-tabler-badge icon="clock" class="large-badge">Large</dile-tabler-badge>
</div>
```

### Custom Styling

```html:preview
<script type="module">
  import '@dile/iconlib/tabler-icons/star.js';
  import '@dile/iconlib/tabler-icons/user.js';
  import '@dile/iconlib/tabler-icons/circle-check.js';
  import '@dile/iconlib/dile-tabler-icon.js';
  import '@dile/iconlib/dile-tabler-badge.js';
</script>
<style>
  .custom-color {
    --dile-tabler-badge-primary: #9650e0;
    --dile-tabler-badge-on-primary: #ffffff;
  }
  .outlined {
    --dile-tabler-badge-border-width: 2px;
    --dile-tabler-badge-border-color: #303030;
    --dile-tabler-badge-color: transparent;
    --dile-tabler-badge-on-color: #303030;
  }
  .rounded-corners {
    --dile-tabler-badge-border-radius: 8px;
  }
  .bold-text {
    --dile-tabler-badge-font-weight: 700;
  }
  dile-tabler-badge {
    margin-right: 0.5rem;
    margin-bottom: 0.5rem;
  }
</style>
<div>
  <dile-tabler-badge icon="star" class="custom-color">Custom Color</dile-tabler-badge>
  <dile-tabler-badge icon="user" class="outlined" variant="primary">Outlined</dile-tabler-badge>
  <dile-tabler-badge icon="circle-check" class="rounded-corners" variant="success">Rounded</dile-tabler-badge>
  <dile-tabler-badge icon="circle-check" class="bold-text" variant="success">Bold</dile-tabler-badge>
</div>
```

## Import Alternatives

The `dile-tabler-badge` component can be imported using different methods, matching the flexibility of Tabler icons themselves:

```javascript
// ES Module
import '@dile/iconlib/dile-tabler-badge.js';

// CDN
<script type="module">
  import '@dile/iconlib/dile-tabler-badge.js';
</script>
```
