---
layout: layout.html
title: Remix Icon Badge
tags: remixicon
---

# Remix Icon Badge Web Component

The `dile-remixicon-badge` Custom Element is a Remix Icon-specific specialization of the generic `dile-icon-badge` component. It keeps the same normalized badge API and CSS variables, but it is limited to Remix Icon assets and a single icon family.

> Use `dile-icon-badge` when you want one markup pattern that can switch between icon libraries; use `dile-remixicon-badge` when you explicitly want the badge tied to the Remix Icon family.

```html
<dile-remixicon-badge icon="time-line">Waiting</dile-remixicon-badge>
<dile-remixicon-badge icon="checkbox-circle-line" variant="success">Completed</dile-remixicon-badge>
<dile-remixicon-badge icon="error-warning-line" variant="danger">Error</dile-remixicon-badge>
```

Using the tags above will render the following badges:

```html:preview
<script type="module">
  import '@dile/iconlib/remixicon-icons/time-line.js';
  import '@dile/iconlib/remixicon-icons/checkbox-circle-line.js';
  import '@dile/iconlib/remixicon-icons/error-warning-line.js';
  import '@dile/iconlib/dile-remixicon-icon.js';
  import '@dile/iconlib/dile-remixicon-badge.js';
</script>
<style>
  dile-remixicon-badge {
    margin-right: 0.5rem;
    margin-bottom: 0.5rem;
  }
</style>
<div>
  <dile-remixicon-badge icon="time-line">Waiting</dile-remixicon-badge>
  <dile-remixicon-badge icon="checkbox-circle-line" variant="success">Completed</dile-remixicon-badge>
  <dile-remixicon-badge icon="error-warning-line" variant="danger">Error</dile-remixicon-badge>
</div>
```

## Installation

```bash
npm install @dile/iconlib
```

## Usage

Import the `dile-remixicon-badge` component and the specific Remix Icon modules you need:

```javascript
import '@dile/iconlib/dile-remixicon-badge.js';
import '@dile/iconlib/remixicon-icons/time-line.js';  // Import needed icons
import '@dile/iconlib/remixicon-icons/checkbox-circle-line.js';
```

Use the component with an `icon` attribute and text content:

```html
<dile-remixicon-badge icon="time-line">Waiting</dile-remixicon-badge>
<dile-remixicon-badge icon="checkbox-circle-line" variant="success">Done</dile-remixicon-badge>
```

## Attributes

- **icon** (required): String with the name of the imported Remix Icon, including the `-line`/`-fill` suffix when it applies
- **variant** (optional): Style variant. Available options: `primary`, `secondary`, `success`, `warning`, `error`, `danger`, `soft`. Defaults to primary styling.

> To find the specific name of each icon, visit the [Remix Icon documentation page](https://remixicon.com/) or search it in the [Icon Catalog](../icon-catalog/).

## Content

The text content of the badge is passed as the element's text content (slot). This allows for flexible content including plain text or additional styling:

```html
<dile-remixicon-badge icon="star-line">Favorite</dile-remixicon-badge>
<dile-remixicon-badge icon="time-line">5 min ago</dile-remixicon-badge>
<dile-remixicon-badge icon="user-line">John Doe</dile-remixicon-badge>
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
  import '@dile/iconlib/remixicon-icons/home-line.js';
  import '@dile/iconlib/remixicon-icons/star-line.js';
  import '@dile/iconlib/remixicon-icons/user-line.js';
  import '@dile/iconlib/dile-remixicon-icon.js';
  import '@dile/iconlib/dile-remixicon-badge.js';
</script>
<style>
  dile-remixicon-badge {
    margin-right: 0.5rem;
    margin-bottom: 0.5rem;
  }
</style>
<div>
  <dile-remixicon-badge icon="home-line">Home</dile-remixicon-badge>
  <dile-remixicon-badge icon="star-line">Favorite</dile-remixicon-badge>
  <dile-remixicon-badge icon="user-line">Profile</dile-remixicon-badge>
</div>
```

### Variant Examples

```html:preview
<script type="module">
  import '@dile/iconlib/remixicon-icons/information-line.js';
  import '@dile/iconlib/remixicon-icons/checkbox-circle-line.js';
  import '@dile/iconlib/remixicon-icons/alert-line.js';
  import '@dile/iconlib/remixicon-icons/error-warning-line.js';
  import '@dile/iconlib/remixicon-icons/delete-bin-line.js';
  import '@dile/iconlib/dile-remixicon-icon.js';
  import '@dile/iconlib/dile-remixicon-badge.js';
</script>
<style>
  dile-remixicon-badge {
    margin-right: 0.5rem;
    margin-bottom: 0.5rem;
  }
</style>
<div>
  <dile-remixicon-badge icon="information-line" variant="primary">Primary</dile-remixicon-badge>
  <dile-remixicon-badge icon="checkbox-circle-line" variant="success">Success</dile-remixicon-badge>
  <dile-remixicon-badge icon="alert-line" variant="warning">Warning</dile-remixicon-badge>
  <dile-remixicon-badge icon="error-warning-line" variant="error">Error</dile-remixicon-badge>
  <dile-remixicon-badge icon="delete-bin-line" variant="danger">Delete</dile-remixicon-badge>
  <dile-remixicon-badge icon="information-line" variant="soft">Info</dile-remixicon-badge>
</div>
```

### Size Variations

```html:preview
<script type="module">
  import '@dile/iconlib/remixicon-icons/timer-line.js';
  import '@dile/iconlib/dile-remixicon-icon.js';
  import '@dile/iconlib/dile-remixicon-badge.js';
</script>
<style>
  .small-badge {
    --dile-remixicon-badge-font-size: 0.7rem;
    --dile-icon-size: 16px;
    --dile-remixicon-badge-padding: 0.25rem 0.5rem;
  }
  .large-badge {
    --dile-remixicon-badge-font-size: 1rem;
    --dile-icon-size: 28px;
    --dile-remixicon-badge-padding: 0.5rem 1rem;
  }
  dile-remixicon-badge {
    margin-right: 0.5rem;
    margin-bottom: 0.5rem;
  }
</style>
<div>
  <dile-remixicon-badge icon="timer-line" class="small-badge">Small</dile-remixicon-badge>
  <dile-remixicon-badge icon="timer-line">Normal</dile-remixicon-badge>
  <dile-remixicon-badge icon="timer-line" class="large-badge">Large</dile-remixicon-badge>
</div>
```

### Custom Styling

```html:preview
<script type="module">
  import '@dile/iconlib/remixicon-icons/star-line.js';
  import '@dile/iconlib/remixicon-icons/user-line.js';
  import '@dile/iconlib/remixicon-icons/checkbox-circle-line.js';
  import '@dile/iconlib/dile-remixicon-icon.js';
  import '@dile/iconlib/dile-remixicon-badge.js';
</script>
<style>
  .custom-color {
    --dile-remixicon-badge-primary: #9650e0;
    --dile-remixicon-badge-on-primary: #ffffff;
  }
  .outlined {
    --dile-remixicon-badge-border-width: 2px;
    --dile-remixicon-badge-border-color: #303030;
    --dile-remixicon-badge-color: transparent;
    --dile-remixicon-badge-on-color: #303030;
  }
  .rounded-corners {
    --dile-remixicon-badge-border-radius: 8px;
  }
  .bold-text {
    --dile-remixicon-badge-font-weight: 700;
  }
  dile-remixicon-badge {
    margin-right: 0.5rem;
    margin-bottom: 0.5rem;
  }
</style>
<div>
  <dile-remixicon-badge icon="star-line" class="custom-color">Custom Color</dile-remixicon-badge>
  <dile-remixicon-badge icon="user-line" class="outlined" variant="primary">Outlined</dile-remixicon-badge>
  <dile-remixicon-badge icon="checkbox-circle-line" class="rounded-corners" variant="success">Rounded</dile-remixicon-badge>
  <dile-remixicon-badge icon="checkbox-circle-line" class="bold-text" variant="success">Bold</dile-remixicon-badge>
</div>
```

## Import Alternatives

The `dile-remixicon-badge` component can be imported using different methods, matching the flexibility of Remix Icon icons themselves:

```javascript
// ES Module
import '@dile/iconlib/dile-remixicon-badge.js';

// CDN
<script type="module">
  import '@dile/iconlib/dile-remixicon-badge.js';
</script>
```
