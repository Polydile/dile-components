---
title: Time Duration
package: '@dile/utils'
element: '&lt;dile-time-duration&gt;'
status: stable
summary: Human-readable duration display component. Converts seconds into readable format like "1h 20m", with support for extended format, multiple languages, and customizable precision.
tags: utils
---

# dile-time-duration

Web Component to display durations in a human-readable format. Converts seconds into compact or extended format (e.g., "1h 20m" or "1 hour and 20 minutes"), with support for multiple languages, precision levels, and custom icons.

## Installation

```bash
npm i @dile/utils
```

## Usage

Import the component in your JavaScript module:

```js
import '@dile/utils/components/time-duration/time-duration.js';
```

And use it in your HTML:

```html
<dile-time-duration seconds="3665"></dile-time-duration>
```

## Properties

* **seconds**: *(number)* Duration in seconds (default: 0). Example: `80`, `3665`
* **precision**: *(string)* Precision level: `"seconds"`, `"minutes"`, `"hours"`, or `"days"` (default: `"seconds"`). Controls which units are included in the output.
* **extended**: *(boolean)* If present, shows verbose format (e.g., "1 hour and 20 minutes") instead of compact format (e.g., "1h 20m").
* **language**: *(string)* Language for display: `"en"` (English) or `"es"` (Spanish). Default: `"en"`
* **icon**: *(string)* Icon to display in dile-iconlib format (e.g., `"lucide.timer"`, `"material.timer"`). Default: `"lucide.timer"`. The component will automatically import the default lucide.timer icon. For other icons, the developer must import the corresponding icon component (e.g., `import '@dile/iconlib/material-icons/timer.js';`). Leave empty to hide the icon.

## CSS custom properties

You can customize the component using the CSS custom properties below.

Custom property | Description | Default
----------------|-------------|---------
--dile-time-duration-gap | The gap between the icon and the text | 0.25rem
--dile-time-duration-font-size | The text font size | 0.875rem
--dile-time-duration-color | The text color | var(--dile-on-background-color) fallback to #303030
--dile-time-duration-font-weight | The text font weight | normal
--dile-time-duration-font-family | The text font family | inherit
--dile-time-duration-letter-spacing | The text letter spacing | 0
--dile-time-duration-icon-size | The icon size | 20px
--dile-primary-color | The icon color | #888

## Examples

### Basic usage - compact format

```html:preview
<script type="module">
  import '@dile/utils/components/time-duration/time-duration.js';
</script>
<dile-time-duration seconds="80"></dile-time-duration>
```

### 1 hour and 1 minute

```html:preview
<dile-time-duration seconds="3665"></dile-time-duration>
```

### Multiple days

```html:preview
<dile-time-duration seconds="90061"></dile-time-duration>
```

### Extended format (verbose)

```html:preview
<dile-time-duration seconds="3665" extended></dile-time-duration>
```

### Extended format in Spanish

```html:preview
<dile-time-duration seconds="3665" extended language="es"></dile-time-duration>
```

### Different precision levels

Precision: seconds (shows day, hour, minute, second)
```html:preview
<dile-time-duration seconds="3665" precision="seconds"></dile-time-duration>
```

Precision: minutes (shows day, hour, minute)
```html:preview
<dile-time-duration seconds="3665" precision="minutes"></dile-time-duration>
```

Precision: hours (shows day, hour)
```html:preview
<dile-time-duration seconds="3665" precision="hours"></dile-time-duration>
```

Precision: days (shows only days)
```html:preview
<dile-time-duration seconds="90061" precision="days"></dile-time-duration>
```

### Custom icon

```html:preview
<dile-time-duration seconds="3665" icon="material.timer"></dile-time-duration>
```

### Without icon

```html:preview
<dile-time-duration seconds="3665" icon=""></dile-time-duration>
```

### Custom styling

```html:preview
<style>
  .custom-duration {
    --dile-time-duration-font-size: 1.25rem;
    --dile-time-duration-color: #0066cc;
    --dile-time-duration-font-weight: bold;
    --dile-time-duration-icon-size: 24px;
    --dile-primary-color: #ff6b6b;
  }
</style>
<dile-time-duration class="custom-duration" seconds="3665"></dile-time-duration>
```

## Behavior

The component always displays **two time units** to keep the output concise:

* 80 seconds → `1m 20s`
* 3665 seconds → `1h 1m`
* 90061 seconds → `1d 1h`
* 172861 seconds → `2d 0h`

The precision attribute controls which units are available for display:

* `precision="seconds"` (default): Days, hours, minutes, seconds
* `precision="minutes"`: Days, hours, minutes
* `precision="hours"`: Days, hours
* `precision="days"`: Days only

When extended format is enabled, the output is more verbose:

* 80 seconds → `1 minute and 20 seconds`
* 3665 seconds → `1 hour and 1 minute`

Language support:

* `language="en"` (default): English labels
* `language="es"`: Spanish labels (e.g., "1 hora y 1 minuto")
