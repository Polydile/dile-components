---
layout: layout.html
title: Lucide Badge
tags: lucide
---

# Lucide Badge Web Component

The `dile-lucide-badge` Custom Element displays an icon combined with text inside a pill-shaped badge container. It's perfect for status indicators, labels, and other badge-like UI elements.

```html
<dile-lucide-badge icon="hourglass">Waiting</dile-lucide-badge>
<dile-lucide-badge icon="circle-check" variant="success">Completed</dile-lucide-badge>
<dile-lucide-badge icon="circle-alert" variant="danger">Error</dile-lucide-badge>
```

Using the tags above will render the following badges:

```html:preview
<script type="module">
  import '@dile/iconlib/lucide-icons/hourglass.js';
  import '@dile/iconlib/lucide-icons/circle-check.js';
  import '@dile/iconlib/lucide-icons/circle-alert.js';
  import '@dile/iconlib/dile-lucide-icon.js';
  import '@dile/iconlib/dile-lucide-badge.js';
</script>
<style>
  dile-lucide-badge {
    margin-right: 0.5rem;
    margin-bottom: 0.5rem;
  }
</style>
<div>
  <dile-lucide-badge icon="hourglass">Waiting</dile-lucide-badge>
  <dile-lucide-badge icon="circle-check" variant="success">Completed</dile-lucide-badge>
  <dile-lucide-badge icon="circle-alert" variant="danger">Error</dile-lucide-badge>
</div>
```

## Installation

```bash
npm install @dile/iconlib
```

## Usage

Import the `dile-lucide-badge` component and the specific Lucide icons you need:

```javascript
import '@dile/iconlib/dile-lucide-badge.js';
import '@dile/iconlib/lucide-icons/hourglass.js';  // Import needed icons
import '@dile/iconlib/lucide-icons/circle-check.js';
```

Use the component with an `icon` attribute and text content:

```html
<dile-lucide-badge icon="hourglass">Waiting</dile-lucide-badge>
<dile-lucide-badge icon="circle-check" variant="success">Done</dile-lucide-badge>
```

## Attributes

- **icon** (required): String with the name of the imported Lucide icon
- **icon-label** (optional): Accessibility label for the icon. If not provided, the icon name is used. Used for screen readers to describe the icon's purpose.
- **variant** (optional): Style variant. Available options: `primary`, `secondary`, `success`, `warning`, `error`, `danger`, `soft`. Defaults to primary styling.

> To find the specific name of each icon, visit the [Lucide Icons documentation page](https://lucide.dev/icons/) and search for the icon you want to integrate.

## Content

The text content of the badge is passed as the element's text content (slot). This allows for flexible content including plain text or additional styling:

```html
<dile-lucide-badge icon="star">Favorite</dile-lucide-badge>
<dile-lucide-badge icon="clock">5 min ago</dile-lucide-badge>
<dile-lucide-badge icon="user">John Doe</dile-lucide-badge>
```

## CSS Custom Properties

You can customize it using CSS Custom Properties.

Custom property | Description | Default
----------------|-------------|---------
--dile-lucide-badge-color | Badge background color | --dile-primary-color or #f3f3ae
--dile-lucide-badge-on-color | Text and icon color | --dile-on-primary-color or #303030
--dile-lucide-badge-font-size | Text size | 0.8rem
--dile-lucide-badge-font-weight | Text weight | 500
--dile-lucide-badge-gap | Space between icon and text | 0.5rem
--dile-lucide-badge-padding | Inner spacing | 0.375rem 0.75rem
--dile-lucide-badge-border-radius | Border radius (pill shape) | 9999px
--dile-lucide-badge-border-width | Border thickness | 0px
--dile-lucide-badge-border-color | Border color | transparent
--dile-lucide-badge-transition-duration | Animation duration | 0.3s
--dile-lucide-badge-icon-size | Icon size | 18px

### Variant-Specific Properties

Custom property | Description | Default
----------------|-------------|---------
--dile-lucide-badge-primary | Primary variant background | --dile-primary-color
--dile-lucide-badge-on-primary | Primary variant text/icon color | --dile-on-primary-color
--dile-lucide-badge-secondary | Secondary variant background | --dile-secondary-color
--dile-lucide-badge-on-secondary | Secondary variant text/icon color | --dile-on-secondary-color
--dile-lucide-badge-success | Success variant background | --dile-alert-success-color
--dile-lucide-badge-on-success | Success variant text/icon color | --dile-on-alert-color
--dile-lucide-badge-warning | Warning variant background | --dile-alert-warning-color
--dile-lucide-badge-on-warning | Warning variant text/icon color | --dile-on-alert-color
--dile-lucide-badge-error | Error variant background | --dile-alert-error-color
--dile-lucide-badge-on-error | Error variant text/icon color | --dile-on-alert-color
--dile-lucide-badge-danger | Danger variant background | --dile-danger-color
--dile-lucide-badge-on-danger | Danger variant text/icon color | --dile-on-danger-color
--dile-lucide-badge-soft | Soft variant background | #2a7a9f
--dile-lucide-badge-on-soft | Soft variant text/icon color | #ffffff

## Examples

### Basic Badges

```html:preview
<script type="module">
  import '@dile/iconlib/lucide-icons/house.js';
  import '@dile/iconlib/lucide-icons/star.js';
  import '@dile/iconlib/lucide-icons/user.js';
  import '@dile/iconlib/dile-lucide-icon.js';
  import '@dile/iconlib/dile-lucide-badge.js';
</script>
<style>
  dile-lucide-badge {
    margin-right: 0.5rem;
    margin-bottom: 0.5rem;
  }
</style>
<div>
  <dile-lucide-badge icon="house">Home</dile-lucide-badge>
  <dile-lucide-badge icon="star">Favorite</dile-lucide-badge>
  <dile-lucide-badge icon="user">Profile</dile-lucide-badge>
</div>
```

### Variant Examples

```html:preview
<script type="module">
  import '@dile/iconlib/lucide-icons/info.js';
  import '@dile/iconlib/lucide-icons/circle-check.js';
  import '@dile/iconlib/lucide-icons/circle-alert.js';
  import '@dile/iconlib/lucide-icons/triangle-alert.js';
  import '@dile/iconlib/lucide-icons/trash-2.js';
  import '@dile/iconlib/dile-lucide-icon.js';
  import '@dile/iconlib/dile-lucide-badge.js';
</script>
<style>
  dile-lucide-badge {
    margin-right: 0.5rem;
    margin-bottom: 0.5rem;
  }
</style>
<div>
  <dile-lucide-badge icon="info" variant="primary">Primary</dile-lucide-badge>
  <dile-lucide-badge icon="circle-check" variant="success">Success</dile-lucide-badge>
  <dile-lucide-badge icon="triangle-alert" variant="warning">Warning</dile-lucide-badge>
  <dile-lucide-badge icon="circle-alert" variant="error">Error</dile-lucide-badge>
  <dile-lucide-badge icon="trash-2" variant="danger">Delete</dile-lucide-badge>
  <dile-lucide-badge icon="info" variant="soft">Info</dile-lucide-badge>
</div>
```

### Size Variations

```html:preview
<script type="module">
  import '@dile/iconlib/lucide-icons/clock.js';
  import '@dile/iconlib/dile-lucide-icon.js';
  import '@dile/iconlib/dile-lucide-badge.js';
</script>
<style>
  .small-badge {
    --dile-lucide-badge-font-size: 0.7rem;
    --dile-icon-size: 16px;
    --dile-lucide-badge-padding: 0.25rem 0.5rem;
  }
  .large-badge {
    --dile-lucide-badge-font-size: 1rem;
    --dile-icon-size: 28px;
    --dile-lucide-badge-padding: 0.5rem 1rem;
  }
  dile-lucide-badge {
    margin-right: 0.5rem;
    margin-bottom: 0.5rem;
  }
</style>
<div>
  <dile-lucide-badge icon="clock" class="small-badge">Small</dile-lucide-badge>
  <dile-lucide-badge icon="clock">Normal</dile-lucide-badge>
  <dile-lucide-badge icon="clock" class="large-badge">Large</dile-lucide-badge>
</div>
```

### Custom Styling

```html:preview
<script type="module">
  import '@dile/iconlib/lucide-icons/star.js';
  import '@dile/iconlib/lucide-icons/user.js';
  import '@dile/iconlib/lucide-icons/circle-check.js';
  import '@dile/iconlib/dile-lucide-icon.js';
  import '@dile/iconlib/dile-lucide-badge.js';
</script>
<style>
  .custom-color {
    --dile-lucide-badge-primary: #9650e0;
    --dile-lucide-badge-on-primary: #ffffff;
  }
  .outlined {
    --dile-lucide-badge-border-width: 2px;
    --dile-lucide-badge-border-color: #303030;
    --dile-lucide-badge-color: transparent;
    --dile-lucide-badge-on-color: #303030;
  }
  .rounded-corners {
    --dile-lucide-badge-border-radius: 8px;
  }
  .bold-text {
    --dile-lucide-badge-font-weight: 700;
  }
  dile-lucide-badge {
    margin-right: 0.5rem;
    margin-bottom: 0.5rem;
  }
</style>
<div>
  <dile-lucide-badge icon="star" class="custom-color">Custom Color</dile-lucide-badge>
  <dile-lucide-badge icon="user" class="outlined" variant="primary">Outlined</dile-lucide-badge>
  <dile-lucide-badge icon="circle-check" class="rounded-corners" variant="success">Rounded</dile-lucide-badge>
  <dile-lucide-badge icon="circle-check" class="bold-text" variant="success">Bold</dile-lucide-badge>
</div>
```

## Accessibility

The badge component includes built-in accessibility features:

- **Icon label**: The icon wrapper includes `role="img"` with an `aria-label` for screen readers
- **Default behavior**: By default, the aria-label uses the icon name (e.g., "circle-check")
- **Custom labels**: Use the `icon-label` attribute to provide a more descriptive accessibility label

### Examples

```html
<!-- Default: icon name used as aria-label -->
<dile-lucide-badge icon="circle-check" variant="success">Completed</dile-lucide-badge>
<!-- Screen reader announces: "circle-check, Completed" -->

<!-- Custom icon label for better accessibility -->
<dile-lucide-badge icon="circle-check" icon-label="Task completed successfully" variant="success">Completed</dile-lucide-badge>
<!-- Screen reader announces: "Task completed successfully, Completed" -->

<!-- Status badges with descriptive labels -->
<dile-lucide-badge icon="circle-alert" icon-label="Warning" variant="warning">Pending Review</dile-lucide-badge>
<dile-lucide-badge icon="circle-alert" icon-label="Error" variant="error">Failed</dile-lucide-badge>
```

## Import Alternatives

The `dile-lucide-badge` component can be imported using different methods, matching the flexibility of Lucide icons themselves:

```javascript
// ES Module
import '@dile/iconlib/dile-lucide-badge.js';

// CDN
<script type="module">
  import '@dile/iconlib/dile-lucide-badge.js';
</script>
```
