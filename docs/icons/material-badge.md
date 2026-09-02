---
layout: layout.html
title: Material Badge
tags: material
---

# Material Badge Web Component

The `dile-material-badge` Custom Element is a Material-specific specialization of the generic `dile-icon-badge` component. It keeps the same normalized badge API and CSS variables, but it is limited to Material icons and a single icon family.

> Use `dile-icon-badge` when you want one markup pattern that can switch between icon libraries; use `dile-material-badge` when you explicitly want the badge tied to the Material family.

```html
<dile-material-badge icon="hourglass-empty">Waiting</dile-material-badge>
<dile-material-badge icon="check-circle" variant="success">Completed</dile-material-badge>
<dile-material-badge icon="error" variant="danger">Error</dile-material-badge>
```

Using the tags above will render the following badges:

```html:preview
<script type="module">
  import '@dile/iconlib/material-icons/hourglass-empty.js';
  import '@dile/iconlib/material-icons/check-circle.js';
  import '@dile/iconlib/material-icons/error.js';
  import '@dile/iconlib/dile-material-icon.js';
  import '@dile/iconlib/dile-material-badge.js';
</script>
<style>
  dile-material-badge {
    margin-right: 0.5rem;
    margin-bottom: 0.5rem;
  }
</style>
<div>
  <dile-material-badge icon="hourglass-empty">Waiting</dile-material-badge>
  <dile-material-badge icon="check-circle" variant="success">Completed</dile-material-badge>
  <dile-material-badge icon="error" variant="danger">Error</dile-material-badge>
</div>
```

## Installation

```bash
npm install @dile/iconlib
```

## Usage

Import the `dile-material-badge` component and the specific Material icons you need:

```javascript
import '@dile/iconlib/dile-material-badge.js';
import '@dile/iconlib/material-icons/hourglass-empty.js';  // Import needed icons
import '@dile/iconlib/material-icons/check-circle.js';
```

Use the component with an `icon` attribute and text content:

```html
<dile-material-badge icon="hourglass-empty">Waiting</dile-material-badge>
<dile-material-badge icon="check-circle" variant="success">Done</dile-material-badge>
```

## Attributes

- **icon** (required): String with the name of the imported Material icon
- **variant** (optional): Style variant. Available options: `primary`, `secondary`, `success`, `warning`, `error`, `danger`, `soft`. Defaults to primary styling.

> To find the specific name of each icon, visit the [Material Icons documentation page](https://fonts.google.com/icons) and search for the icon you want to integrate. Only the filled ("Material Icons") style is included; use the icon name as shown there, replacing spaces and underscores with dashes.

## Content

The text content of the badge is passed as the element's text content (slot). This allows for flexible content including plain text or additional styling:

```html
<dile-material-badge icon="star">Favorite</dile-material-badge>
<dile-material-badge icon="schedule">5 min ago</dile-material-badge>
<dile-material-badge icon="person">John Doe</dile-material-badge>
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
  import '@dile/iconlib/material-icons/home.js';
  import '@dile/iconlib/material-icons/star.js';
  import '@dile/iconlib/material-icons/person.js';
  import '@dile/iconlib/dile-material-icon.js';
  import '@dile/iconlib/dile-material-badge.js';
</script>
<style>
  dile-material-badge {
    margin-right: 0.5rem;
    margin-bottom: 0.5rem;
  }
</style>
<div>
  <dile-material-badge icon="home">Home</dile-material-badge>
  <dile-material-badge icon="star">Favorite</dile-material-badge>
  <dile-material-badge icon="person">Profile</dile-material-badge>
</div>
```

### Variant Examples

```html:preview
<script type="module">
  import '@dile/iconlib/material-icons/info.js';
  import '@dile/iconlib/material-icons/check-circle.js';
  import '@dile/iconlib/material-icons/warning.js';
  import '@dile/iconlib/material-icons/error.js';
  import '@dile/iconlib/material-icons/delete.js';
  import '@dile/iconlib/dile-material-icon.js';
  import '@dile/iconlib/dile-material-badge.js';
</script>
<style>
  dile-material-badge {
    margin-right: 0.5rem;
    margin-bottom: 0.5rem;
  }
</style>
<div>
  <dile-material-badge icon="info" variant="primary">Primary</dile-material-badge>
  <dile-material-badge icon="check-circle" variant="success">Success</dile-material-badge>
  <dile-material-badge icon="warning" variant="warning">Warning</dile-material-badge>
  <dile-material-badge icon="error" variant="error">Error</dile-material-badge>
  <dile-material-badge icon="delete" variant="danger">Delete</dile-material-badge>
  <dile-material-badge icon="info" variant="soft">Info</dile-material-badge>
</div>
```

### Size Variations

```html:preview
<script type="module">
  import '@dile/iconlib/material-icons/schedule.js';
  import '@dile/iconlib/dile-material-icon.js';
  import '@dile/iconlib/dile-material-badge.js';
</script>
<style>
  .small-badge {
    --dile-material-badge-font-size: 0.7rem;
    --dile-icon-size: 16px;
    --dile-material-badge-padding: 0.25rem 0.5rem;
  }
  .large-badge {
    --dile-material-badge-font-size: 1rem;
    --dile-icon-size: 28px;
    --dile-material-badge-padding: 0.5rem 1rem;
  }
  dile-material-badge {
    margin-right: 0.5rem;
    margin-bottom: 0.5rem;
  }
</style>
<div>
  <dile-material-badge icon="schedule" class="small-badge">Small</dile-material-badge>
  <dile-material-badge icon="schedule">Normal</dile-material-badge>
  <dile-material-badge icon="schedule" class="large-badge">Large</dile-material-badge>
</div>
```

### Custom Styling

```html:preview
<script type="module">
  import '@dile/iconlib/material-icons/star.js';
  import '@dile/iconlib/material-icons/person.js';
  import '@dile/iconlib/material-icons/check-circle.js';
  import '@dile/iconlib/dile-material-icon.js';
  import '@dile/iconlib/dile-material-badge.js';
</script>
<style>
  .custom-color {
    --dile-material-badge-primary: #9650e0;
    --dile-material-badge-on-primary: #ffffff;
  }
  .outlined {
    --dile-material-badge-border-width: 2px;
    --dile-material-badge-border-color: #303030;
    --dile-material-badge-color: transparent;
    --dile-material-badge-on-color: #303030;
  }
  .rounded-corners {
    --dile-material-badge-border-radius: 8px;
  }
  .bold-text {
    --dile-material-badge-font-weight: 700;
  }
  dile-material-badge {
    margin-right: 0.5rem;
    margin-bottom: 0.5rem;
  }
</style>
<div>
  <dile-material-badge icon="star" class="custom-color">Custom Color</dile-material-badge>
  <dile-material-badge icon="person" class="outlined" variant="primary">Outlined</dile-material-badge>
  <dile-material-badge icon="check-circle" class="rounded-corners" variant="success">Rounded</dile-material-badge>
  <dile-material-badge icon="check-circle" class="bold-text" variant="success">Bold</dile-material-badge>
</div>
```

## Import Alternatives

The `dile-material-badge` component can be imported using different methods, matching the flexibility of Material icons themselves:

```javascript
// ES Module
import '@dile/iconlib/dile-material-badge.js';

// CDN
<script type="module">
  import '@dile/iconlib/dile-material-badge.js';
</script>
```
