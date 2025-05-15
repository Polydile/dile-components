---
title: Datetime Picker
tags: forms
---

# dile-datetimepicker

Extension of [`dile-datepicker`](/components/dile-datepicker/) that adds time selection (hours, minutes, and seconds) to the date picker. Allows selecting both date and time in a single component.

## Installation

```bash
npm i @dile/utils
```

## Usage

Import the component:

```javascript
import '@dile/utils/components/datepicker/datetimepicker.js';
```

Use the component:

```html
<dile-datetimepicker label="Select date and time"></dile-datetimepicker>
```

## Properties

This component inherits all properties from [`dile-datepicker`](/components/dile-datepicker/).
In addition, the selected value will have the format `"YYYY-MM-DD HH:mm:ss"`.

## Methods

Inherits all methods from [`dile-datepicker`](/components/dile-datepicker/).

## Events

Inherits all events from [`dile-datepicker`](/components/dile-datepicker/).

## CSS Custom Properties

In addition to all CSS Custom Properties from [`dile-datepicker`](/components/dile-datepicker/), you can customize the following new aspects specific to `dile-datetimepicker`:

| Custom property                                    | Description                                 | Default                            |
| -------------------------------------------------- | ------------------------------------------- | ---------------------------------- |
| --dile-datetimepicker-accept-icon-size             | Size of the accept icon                     | 24px                               |
| --dile-datetimepicker-accept-icon-color            | Color of the accept icon                    | var(--dile-on-primary-color, #888) |
| --dile-datetimepicker-accept-icon-background-color | Background color of the rounded accept icon | var(--dile-primary-color, #f4f4f4) |

## Examples

### Regular datetimepicker

```html:preview
<script type="module">
  import '@dile/utils/components/datepicker/datetimepicker.js';
</script>
<dile-datetimepicker 
  name="datetimepicker1" 
  id="datetimepicker1" 
  label="Date"
></dile-datetimepicker>
```

### Styled datetimepicker appears at the bottom

```html:preview
<style>
  .styled {
    --dile-input-label-color: #6d3d6c;
    --dile-input-label-font-weight: bold;
    --dile-input-border-radius: 0;
    --dile-input-border-color: #6d3d6c;
    --dile-input-border-width: 2px;
    --dile-input-label-margin-bottom: 0.5rem;
    --dile-input-line-height: 2.5rem;
    --dile-input-background-color: #ffc;
    --dile-input-color: #963;
    --dile-menu-overlay-background-color: rgb(143, 143, 34);
    --dile-menu-overlay-color: #fff;
    --dile-datepicker-trigger-color: #6d3d6c; 
    --dile-calendar-day-background-color: rgb(130, 79, 12);
    --dile-calendar-today-background-color: rgb(233, 47, 223);
    --dile-calendar-day-text-color: #fff;
    --dile-calendar-day-border-radius: 7px;
    --dile-calendar-nav-buttons-color: #fff;
    --dile-datepicker-trigger-margin-bottom: 0.1em;
    --dile-datepicker-trigger-size: 50px;
    --dile-number-picker-icon-color: #fff;
  }
</style>
<dile-datetimepicker 
  name="datetimepicker2" 
  id="datetimepicker2" 
  class="styled" 
  label="Event date" 
  verticalAlign="bottom"
>Styled datetimepicker</dile-datetimepicker>
```

### Datetimepicker with Monday as first day of week

```html:preview
<dile-datetimepicker 
  firstDayOfWeek="1" 
  name="datetimepicker3" 
  id="datetimepicker3" 
  label="Event date"
></dile-datetimepicker>
```

### Disabled datetimepicker

```html:preview
<dile-datetimepicker 
  name="disabelddatetimepicker" 
  disabled 
  id="disabelddatetimepicker"
>Disabled datetimepicker</dile-datetimepicker>
```