---
layout: layout.html
title: Icon Badge
tags: 'universal icons'
---

# Universal Icon Badge Web Component

The `dile-icon-badge` Custom Element provides a single badge component for any supported icon library. It follows the same idea as `dile-iconlib`: a single tag, one `icon` string in the `family.name` format, and a shared styling API across libraries.

```html
<dile-icon-badge icon="lucide.house">Lucide</dile-icon-badge>
<dile-icon-badge icon="material.check-circle" variant="success">Material</dile-icon-badge>
<dile-icon-badge icon="fontawesome.award" variant="warning">FontAwesome</dile-icon-badge>
<dile-icon-badge icon="phosphor.check-circle" variant="danger">Phosphor</dile-icon-badge>
<dile-icon-badge icon="tabler.heart-filled" variant="soft">Tabler</dile-icon-badge>
<dile-icon-badge icon="remixicon.heart-line" variant="primary">Remix Icon</dile-icon-badge>
```

```html:preview
<script type="module">
  import '@dile/iconlib/lucide-icons/house.js';
  import '@dile/iconlib/material-icons/check-circle.js';
  import '@dile/iconlib/fontawesome-icons/award.js';
  import '@dile/iconlib/phosphor-icons/check-circle.js';
  import '@dile/iconlib/tabler-icons/heart-filled.js';
  import '@dile/iconlib/remixicon-icons/heart-line.js';
  import '@dile/iconlib/dile-icon-badge.js';
</script>
<div style="display:flex; flex-wrap:wrap; gap:0.75rem; align-items:center;">
  <dile-icon-badge icon="lucide.house">Lucide</dile-icon-badge>
  <dile-icon-badge icon="material.check-circle" variant="success">Material</dile-icon-badge>
  <dile-icon-badge icon="fontawesome.award" variant="warning">FontAwesome</dile-icon-badge>
  <dile-icon-badge icon="phosphor.check-circle" variant="danger">Phosphor</dile-icon-badge>
  <dile-icon-badge icon="tabler.heart-filled" variant="soft">Tabler</dile-icon-badge>
  <dile-icon-badge icon="remixicon.heart-line" variant="primary">Remix Icon</dile-icon-badge>
</div>
```

## Installation

```bash
npm install @dile/iconlib
```

## Usage

```javascript
import '@dile/iconlib/dile-icon-badge.js';
import '@dile/iconlib/lucide-icons/house.js';
import '@dile/iconlib/material-icons/check-circle.js';
```

```html
<dile-icon-badge icon="lucide.house">Home</dile-icon-badge>
<dile-icon-badge icon="material.check-circle" variant="success">Ready</dile-icon-badge>
```

## Attributes

- **icon**: String using the `family.name` format, for example `lucide.house`, `material.check-circle`, `fontawesome.award`, `phosphor.check-circle`, `tabler.heart-filled` or `remixicon.heart-line`.
- **variant**: Optional state: `primary`, `secondary`, `success`, `warning`, `error`, `danger`, `soft`.

The component accepts any supported family from the icon libraries in this package and resolves the matching internal custom element dynamically.

## Unified CSS variables

All badge families share the same normalized CSS custom properties.

| Custom property | Description | Default |
|---|---|---|
| `--dile-badge-color` | Base badge background | `--dile-primary-color` / `#f3f3ae` |
| `--dile-badge-on-color` | Base text and icon color | `--dile-on-primary-color` / `#303030` |
| `--dile-badge-font-size` | Font size | `0.8rem` |
| `--dile-badge-font-weight` | Font weight | `500` |
| `--dile-badge-gap` | Icon/text spacing | `0.5rem` |
| `--dile-badge-padding` | Inner padding | `0.375rem 0.75rem` |
| `--dile-badge-border-radius` | Border radius | `9999px` |
| `--dile-badge-border-width` | Border width | `0px` |
| `--dile-badge-border-color` | Border color | `transparent` |
| `--dile-badge-transition-duration` | Transition duration | `0.3s` |
| `--dile-badge-icon-size` | Icon size | `18px` |
| `--dile-badge-primary` | Primary variant background | `--dile-primary-color` |
| `--dile-badge-on-primary` | Primary variant text/icon color | `--dile-on-primary-color` |
| `--dile-badge-secondary` | Secondary variant background | `--dile-secondary-color` |
| `--dile-badge-on-secondary` | Secondary text/icon color | `--dile-on-secondary-color` |
| `--dile-badge-success` | Success variant background | `--dile-alert-success-color` |
| `--dile-badge-on-success` | Success text/icon color | `--dile-on-alert-color` |
| `--dile-badge-warning` | Warning variant background | `--dile-alert-warning-color` |
| `--dile-badge-on-warning` | Warning text/icon color | `--dile-on-alert-color` |
| `--dile-badge-error` | Error variant background | `--dile-alert-error-color` |
| `--dile-badge-on-error` | Error text/icon color | `--dile-on-alert-color` |
| `--dile-badge-danger` | Danger variant background | `--dile-danger-color` |
| `--dile-badge-on-danger` | Danger text/icon color | `--dile-on-danger-color` |
| `--dile-badge-soft` | Soft variant background | `#2a7a9f` |
| `--dile-badge-on-soft` | Soft text/icon color | `#ffffff` |

```html:preview
<script type="module">
  import '@dile/iconlib/lucide-icons/house.js';
  import '@dile/iconlib/dile-icon-badge.js';
</script>
<style>
  dile-icon-badge.custom {
    --dile-badge-color: transparent;
    --dile-badge-on-color: #1f6feb;
    --dile-badge-border-width: 2px;
    --dile-badge-border-color: #1f6feb;
    --dile-badge-font-size: 0.85rem;
    --dile-badge-padding: 0.4rem 0.8rem;
  }
</style>
<dile-icon-badge icon="lucide.house" class="custom">Custom</dile-icon-badge>
```

## Family-specific components

The family-specific tags remain available as wrappers, but they all use the same normalized badge API and the same standard set of CSS variables:

- `dile-lucide-badge`
- `dile-material-badge`
- `dile-fontawesome-badge`
- `dile-phosphor-badge`
- `dile-tabler-badge`
- `dile-remixicon-badge`

This makes it easier to share styles across libraries without duplicating a separate stylesheet for each one.
