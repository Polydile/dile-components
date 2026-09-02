---
layout: layout.html
title: Phosphor Badge
tags: phosphor
---

# Phosphor Badge Web Component

The `dile-phosphor-badge` Custom Element is a Phosphor-specific specialization of the generic `dile-icon-badge` component. It keeps the same normalized badge API and CSS variables, but it is limited to Phosphor icons and a single icon family.

> Use `dile-icon-badge` when you want one markup pattern that can switch between icon libraries; use `dile-phosphor-badge` when you explicitly want the badge tied to the Phosphor family.

```html
<dile-phosphor-badge icon="hourglass">Waiting</dile-phosphor-badge>
<dile-phosphor-badge icon="check-circle" variant="success">Completed</dile-phosphor-badge>
<dile-phosphor-badge icon="warning-circle" variant="danger">Error</dile-phosphor-badge>
```

Using the tags above will render the following badges:

```html:preview
<script type="module">
  import '@dile/iconlib/phosphor-icons/hourglass.js';
  import '@dile/iconlib/phosphor-icons/check-circle.js';
  import '@dile/iconlib/phosphor-icons/warning-circle.js';
  import '@dile/iconlib/dile-phosphor-icon.js';
  import '@dile/iconlib/dile-phosphor-badge.js';
</script>
<style>
  dile-phosphor-badge {
    margin-right: 0.5rem;
    margin-bottom: 0.5rem;
  }
</style>
<div>
  <dile-phosphor-badge icon="hourglass">Waiting</dile-phosphor-badge>
  <dile-phosphor-badge icon="check-circle" variant="success">Completed</dile-phosphor-badge>
  <dile-phosphor-badge icon="warning-circle" variant="danger">Error</dile-phosphor-badge>
</div>
```

## Installation

```bash
npm install @dile/iconlib
```

## Usage

Import the `dile-phosphor-badge` component and the specific Phosphor icons you need:

```javascript
import '@dile/iconlib/dile-phosphor-badge.js';
import '@dile/iconlib/phosphor-icons/hourglass.js';  // Import needed icons
import '@dile/iconlib/phosphor-icons/check-circle.js';
```

Use the component with an `icon` attribute and text content:

```html
<dile-phosphor-badge icon="hourglass">Waiting</dile-phosphor-badge>
<dile-phosphor-badge icon="check-circle" variant="success">Done</dile-phosphor-badge>
```

## Attributes

- **icon** (required): String with the name of the imported Phosphor icon, including the weight suffix when it's not `regular`
- **variant** (optional): Style variant. Available options: `primary`, `secondary`, `success`, `warning`, `error`, `danger`, `soft`. Defaults to primary styling.

> To find the specific name of each icon, visit the [Phosphor Icons documentation page](https://phosphoricons.com/) or search it in the [Icon Catalog](../icon-catalog/).

## Content

The text content of the badge is passed as the element's text content (slot). This allows for flexible content including plain text or additional styling:

```html
<dile-phosphor-badge icon="star">Favorite</dile-phosphor-badge>
<dile-phosphor-badge icon="clock">5 min ago</dile-phosphor-badge>
<dile-phosphor-badge icon="user">John Doe</dile-phosphor-badge>
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
  import '@dile/iconlib/phosphor-icons/house.js';
  import '@dile/iconlib/phosphor-icons/star.js';
  import '@dile/iconlib/phosphor-icons/user.js';
  import '@dile/iconlib/dile-phosphor-icon.js';
  import '@dile/iconlib/dile-phosphor-badge.js';
</script>
<style>
  dile-phosphor-badge {
    margin-right: 0.5rem;
    margin-bottom: 0.5rem;
  }
</style>
<div>
  <dile-phosphor-badge icon="house">Home</dile-phosphor-badge>
  <dile-phosphor-badge icon="star">Favorite</dile-phosphor-badge>
  <dile-phosphor-badge icon="user">Profile</dile-phosphor-badge>
</div>
```

### Variant Examples

```html:preview
<script type="module">
  import '@dile/iconlib/phosphor-icons/info.js';
  import '@dile/iconlib/phosphor-icons/check-circle.js';
  import '@dile/iconlib/phosphor-icons/warning-circle.js';
  import '@dile/iconlib/phosphor-icons/warning.js';
  import '@dile/iconlib/phosphor-icons/trash.js';
  import '@dile/iconlib/dile-phosphor-icon.js';
  import '@dile/iconlib/dile-phosphor-badge.js';
</script>
<style>
  dile-phosphor-badge {
    margin-right: 0.5rem;
    margin-bottom: 0.5rem;
  }
</style>
<div>
  <dile-phosphor-badge icon="info" variant="primary">Primary</dile-phosphor-badge>
  <dile-phosphor-badge icon="check-circle" variant="success">Success</dile-phosphor-badge>
  <dile-phosphor-badge icon="warning" variant="warning">Warning</dile-phosphor-badge>
  <dile-phosphor-badge icon="warning-circle" variant="error">Error</dile-phosphor-badge>
  <dile-phosphor-badge icon="trash" variant="danger">Delete</dile-phosphor-badge>
  <dile-phosphor-badge icon="info" variant="soft">Info</dile-phosphor-badge>
</div>
```

### Size Variations

```html:preview
<script type="module">
  import '@dile/iconlib/phosphor-icons/clock.js';
  import '@dile/iconlib/dile-phosphor-icon.js';
  import '@dile/iconlib/dile-phosphor-badge.js';
</script>
<style>
  .small-badge {
    --dile-phosphor-badge-font-size: 0.7rem;
    --dile-icon-size: 16px;
    --dile-phosphor-badge-padding: 0.25rem 0.5rem;
  }
  .large-badge {
    --dile-phosphor-badge-font-size: 1rem;
    --dile-icon-size: 28px;
    --dile-phosphor-badge-padding: 0.5rem 1rem;
  }
  dile-phosphor-badge {
    margin-right: 0.5rem;
    margin-bottom: 0.5rem;
  }
</style>
<div>
  <dile-phosphor-badge icon="clock" class="small-badge">Small</dile-phosphor-badge>
  <dile-phosphor-badge icon="clock">Normal</dile-phosphor-badge>
  <dile-phosphor-badge icon="clock" class="large-badge">Large</dile-phosphor-badge>
</div>
```

### Custom Styling

```html:preview
<script type="module">
  import '@dile/iconlib/phosphor-icons/star.js';
  import '@dile/iconlib/phosphor-icons/user.js';
  import '@dile/iconlib/phosphor-icons/check-circle.js';
  import '@dile/iconlib/dile-phosphor-icon.js';
  import '@dile/iconlib/dile-phosphor-badge.js';
</script>
<style>
  .custom-color {
    --dile-phosphor-badge-primary: #9650e0;
    --dile-phosphor-badge-on-primary: #ffffff;
  }
  .outlined {
    --dile-phosphor-badge-border-width: 2px;
    --dile-phosphor-badge-border-color: #303030;
    --dile-phosphor-badge-color: transparent;
    --dile-phosphor-badge-on-color: #303030;
  }
  .rounded-corners {
    --dile-phosphor-badge-border-radius: 8px;
  }
  .bold-text {
    --dile-phosphor-badge-font-weight: 700;
  }
  dile-phosphor-badge {
    margin-right: 0.5rem;
    margin-bottom: 0.5rem;
  }
</style>
<div>
  <dile-phosphor-badge icon="star" class="custom-color">Custom Color</dile-phosphor-badge>
  <dile-phosphor-badge icon="user" class="outlined" variant="primary">Outlined</dile-phosphor-badge>
  <dile-phosphor-badge icon="check-circle" class="rounded-corners" variant="success">Rounded</dile-phosphor-badge>
  <dile-phosphor-badge icon="check-circle" class="bold-text" variant="success">Bold</dile-phosphor-badge>
</div>
```

## Import Alternatives

The `dile-phosphor-badge` component can be imported using different methods, matching the flexibility of Phosphor icons themselves:

```javascript
// ES Module
import '@dile/iconlib/dile-phosphor-badge.js';

// CDN
<script type="module">
  import '@dile/iconlib/dile-phosphor-badge.js';
</script>
```
