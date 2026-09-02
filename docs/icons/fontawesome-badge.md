---
layout: layout.html
title: Fontawesome Badge
tags: fontawesome
---

# FontAwesome Badge Web Component

The `dile-fontawesome-badge` Custom Element is a FontAwesome-specific specialization of the generic `dile-icon-badge` component. It keeps the same normalized badge API and CSS variables, but it is limited to FontAwesome icons and a single icon family.

> Use `dile-icon-badge` when you want one markup pattern that can switch between icon libraries; use `dile-fontawesome-badge` when you explicitly want the badge tied to the FontAwesome family.

```html
<dile-fontawesome-badge icon="hourglass">Waiting</dile-fontawesome-badge>
<dile-fontawesome-badge icon="circle-check" variant="success">Completed</dile-fontawesome-badge>
<dile-fontawesome-badge icon="circle-exclamation" variant="danger">Error</dile-fontawesome-badge>
```

Using the tags above will render the following badges:

```html:preview
<script type="module">
  import '@dile/iconlib/fontawesome-icons/hourglass.js';
  import '@dile/iconlib/fontawesome-icons/circle-check.js';
  import '@dile/iconlib/fontawesome-icons/circle-exclamation.js';
  import '@dile/iconlib/dile-fontawesome-icon.js';
  import '@dile/iconlib/dile-fontawesome-badge.js';
</script>
<style>
  dile-fontawesome-badge {
    margin-right: 0.5rem;
    margin-bottom: 0.5rem;
  }
</style>
<div>
  <dile-fontawesome-badge icon="hourglass">Waiting</dile-fontawesome-badge>
  <dile-fontawesome-badge icon="circle-check" variant="success">Completed</dile-fontawesome-badge>
  <dile-fontawesome-badge icon="circle-exclamation" variant="danger">Error</dile-fontawesome-badge>
</div>
```

## Installation

```bash
npm install @dile/iconlib
```

## Usage

Import the `dile-fontawesome-badge` component and the specific FontAwesome icons you need:

```javascript
import '@dile/iconlib/dile-fontawesome-badge.js';
import '@dile/iconlib/fontawesome-icons/hourglass.js';  // Import needed icons
import '@dile/iconlib/fontawesome-icons/circle-check.js';
```

Use the component with an `icon` attribute and text content:

```html
<dile-fontawesome-badge icon="hourglass">Waiting</dile-fontawesome-badge>
<dile-fontawesome-badge icon="circle-check" variant="success">Done</dile-fontawesome-badge>
```

## Attributes

- **icon** (required): String with the name of the imported FontAwesome icon
- **variant** (optional): Style variant. Available options: `primary`, `secondary`, `success`, `warning`, `error`, `danger`, `soft`. Defaults to primary styling.

> To find the specific name of each icon, visit the [FontAwesome documentation page](https://fontawesome.com/icons) and search for the icon you want to integrate.

## Content

The text content of the badge is passed as the element's text content (slot). This allows for flexible content including plain text or additional styling:

```html
<dile-fontawesome-badge icon="star">Favorite</dile-fontawesome-badge>
<dile-fontawesome-badge icon="clock">5 min ago</dile-fontawesome-badge>
<dile-fontawesome-badge icon="user">John Doe</dile-fontawesome-badge>
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
  import '@dile/iconlib/fontawesome-icons/house.js';
  import '@dile/iconlib/fontawesome-icons/star.js';
  import '@dile/iconlib/fontawesome-icons/user.js';
  import '@dile/iconlib/dile-fontawesome-icon.js';
  import '@dile/iconlib/dile-fontawesome-badge.js';
</script>
<style>
  dile-fontawesome-badge {
    margin-right: 0.5rem;
    margin-bottom: 0.5rem;
  }
</style>
<div>
  <dile-fontawesome-badge icon="house">Home</dile-fontawesome-badge>
  <dile-fontawesome-badge icon="star">Favorite</dile-fontawesome-badge>
  <dile-fontawesome-badge icon="user">Profile</dile-fontawesome-badge>
</div>
```

### Variant Examples

```html:preview
<script type="module">
  import '@dile/iconlib/fontawesome-icons/circle-info.js';
  import '@dile/iconlib/fontawesome-icons/circle-check.js';
  import '@dile/iconlib/fontawesome-icons/triangle-exclamation.js';
  import '@dile/iconlib/fontawesome-icons/circle-exclamation.js';
  import '@dile/iconlib/fontawesome-icons/trash.js';
  import '@dile/iconlib/dile-fontawesome-icon.js';
  import '@dile/iconlib/dile-fontawesome-badge.js';
</script>
<style>
  dile-fontawesome-badge {
    margin-right: 0.5rem;
    margin-bottom: 0.5rem;
  }
</style>
<div>
  <dile-fontawesome-badge icon="circle-info" variant="primary">Primary</dile-fontawesome-badge>
  <dile-fontawesome-badge icon="circle-check" variant="success">Success</dile-fontawesome-badge>
  <dile-fontawesome-badge icon="triangle-exclamation" variant="warning">Warning</dile-fontawesome-badge>
  <dile-fontawesome-badge icon="circle-exclamation" variant="error">Error</dile-fontawesome-badge>
  <dile-fontawesome-badge icon="trash" variant="danger">Delete</dile-fontawesome-badge>
  <dile-fontawesome-badge icon="circle-info" variant="soft">Info</dile-fontawesome-badge>
</div>
```

### Size Variations

```html:preview
<script type="module">
  import '@dile/iconlib/fontawesome-icons/clock.js';
  import '@dile/iconlib/dile-fontawesome-icon.js';
  import '@dile/iconlib/dile-fontawesome-badge.js';
</script>
<style>
  .small-badge {
    --dile-fontawesome-badge-font-size: 0.7rem;
    --dile-icon-size: 16px;
    --dile-fontawesome-badge-padding: 0.25rem 0.5rem;
  }
  .large-badge {
    --dile-fontawesome-badge-font-size: 1rem;
    --dile-icon-size: 28px;
    --dile-fontawesome-badge-padding: 0.5rem 1rem;
  }
  dile-fontawesome-badge {
    margin-right: 0.5rem;
    margin-bottom: 0.5rem;
  }
</style>
<div>
  <dile-fontawesome-badge icon="clock" class="small-badge">Small</dile-fontawesome-badge>
  <dile-fontawesome-badge icon="clock">Normal</dile-fontawesome-badge>
  <dile-fontawesome-badge icon="clock" class="large-badge">Large</dile-fontawesome-badge>
</div>
```

### Custom Styling

```html:preview
<script type="module">
  import '@dile/iconlib/fontawesome-icons/star.js';
  import '@dile/iconlib/fontawesome-icons/user.js';
  import '@dile/iconlib/fontawesome-icons/circle-check.js';
  import '@dile/iconlib/dile-fontawesome-icon.js';
  import '@dile/iconlib/dile-fontawesome-badge.js';
</script>
<style>
  .custom-color {
    --dile-fontawesome-badge-primary: #9650e0;
    --dile-fontawesome-badge-on-primary: #ffffff;
  }
  .outlined {
    --dile-fontawesome-badge-border-width: 2px;
    --dile-fontawesome-badge-border-color: #303030;
    --dile-fontawesome-badge-color: transparent;
    --dile-fontawesome-badge-on-color: #303030;
  }
  .rounded-corners {
    --dile-fontawesome-badge-border-radius: 8px;
  }
  .bold-text {
    --dile-fontawesome-badge-font-weight: 700;
  }
  dile-fontawesome-badge {
    margin-right: 0.5rem;
    margin-bottom: 0.5rem;
  }
</style>
<div>
  <dile-fontawesome-badge icon="star" class="custom-color">Custom Color</dile-fontawesome-badge>
  <dile-fontawesome-badge icon="user" class="outlined" variant="primary">Outlined</dile-fontawesome-badge>
  <dile-fontawesome-badge icon="circle-check" class="rounded-corners" variant="success">Rounded</dile-fontawesome-badge>
  <dile-fontawesome-badge icon="circle-check" class="bold-text" variant="success">Bold</dile-fontawesome-badge>
</div>
```

## Import Alternatives

The `dile-fontawesome-badge` component can be imported using different methods, matching the flexibility of FontAwesome icons themselves:

```javascript
// ES Module
import '@dile/iconlib/dile-fontawesome-badge.js';

// CDN
<script type="module">
  import '@dile/iconlib/dile-fontawesome-badge.js';
</script>
```
