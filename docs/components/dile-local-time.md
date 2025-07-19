---
title: Local Time
tags: utils
---

# dile-local-time

Web Component to display local time based on a date in ISO 8601 format. Allows customizing the output format: 12h or 24h clock, show seconds, timezone, etc.

## Installation

```bash
npm i @dile/utils
```

## Usage

Import the component in your JavaScript module:

```js
import '@dile/utils/components/local-time/local-time.js';
```

And use it in your HTML:

```html
<dile-local-time isoDatetime="2025-07-19T14:30:00+02:00"></dile-local-time>
```

## Properties

* **isoDatetime**: *(string)* Date in ISO 8601 format. Example: `"2025-07-19T14:30:00+02:00"`
* **withoutTwoDigit**: *(boolean)* If present, shows digits as `numeric` instead of `2-digit`. E.g. `4:5` instead of `04:05`.
* **showSeconds**: *(boolean)* Shows seconds.
* **hour12**: *(boolean)* Displays time in 12-hour format with AM/PM.
* **showTimezone**: *(boolean)* Shows the local timezone name.
* **timeZoneLong**: *(boolean)* If `showTimezone` is enabled, controls whether to show the timezone name in long form (e.g. `Central European Summer Time`) or short form (`GMT+2`).

## Examples

### Default format

```html:preview
<script type="module">
  import '@dile/utils/components/local-time/local-time.js';
</script>
<dile-local-time isoDatetime="2025-09-19T11:30:00+01:00"></dile-local-time>
```

### Time with seconds and long timezone name

```html:preview
<dile-local-time 
  isoDatetime="2025-01-19T00:00:00+06:00"
  showSeconds
  showTimezone
  timeZoneLong
></dile-local-time>
```

### Time in 12-hour format with AM/PM

```html:preview
<dile-local-time 
  isoDatetime="2025-07-19T14:30:00+02:00"
  hour12
></dile-local-time>
```