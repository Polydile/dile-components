---
title: Datetime Picker
package: '@dile/utils'
element: '&lt;dile-datetimepicker&gt;'
status: stable
summary: Date and time selection component extending dile-datepicker. Adds hours and minutes (and optionally seconds) wheels, with the combined YYYY-MM-DD HH:mm:ss format.
tags: forms
---

# dile-datetimepicker

Extension of [`dile-datepicker`](/components/dile-datepicker/) that adds time selection to the date picker. Allows selecting both date and time in a single component.

The calendar also lets you choose the month and year with scrolling columns, and supports the `minYear`, `maxYear`, `minDate`, `maxDate`, `disableDates`, `weekdayHeaderNotation`, `locale`, `validateDate` and `validationMessages` properties, as described in the [`dile-datepicker` month and year section](/components/dile-datepicker/#choosing-month-and-year).

## How it works

- Under the calendar there is a button with the selected time. Click it to show the hours and minutes wheels (built with [`dile-wheel-picker`](/components/dile-wheel-picker/)) over the calendar. Click the button again, the check button of the layer, or press <kbd>Enter</kbd> or <kbd>Escape</kbd> to go back to the calendar.
- Clicking a day only marks it: you can choose the day and the time in any order. The accept button writes both in the field and closes the picker.
- If no day is marked, the accept button uses the day focused in the calendar, which is always an enabled date (today, or the nearest date allowed by `minDate`, `maxDate` and `disableDates`).
- When the picker opens, the calendar shows the date of the current value and the time button shows its time. If the field is empty (or the value has no valid time), the calendar shows today and the time is the current time, with the seconds at `00` and the minutes rounded down to `minuteStep`.
- The seconds wheel is hidden by default. Without it, the seconds of the current value are kept, or `00` for a new time.
- ISO 8601 values such as `2024-03-15T10:30:00Z` or `2024-03-15T10:30:00+02:00` are converted to local time in the `YYYY-MM-DD HH:mm:ss` format.

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

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| `acceptLabel` | `String` | `'Accept date and time'` | Accessible label (`aria-label` and `title`) for the confirmation button |
| `showSeconds` | `Boolean` | `false` | Shows the seconds wheel and the seconds in the time button |
| `minuteStep` | `Number` | `1` | Step between the values of the minutes wheel (1 to 59). A minute of the value out of the step is also listed |
| `secondStep` | `Number` | `1` | Step between the values of the seconds wheel (1 to 59) |
| `timeLabel` | `String` | `'Time'` | Accessible label and title of the time button and the time layer |
| `timeAcceptLabel` | `String` | `'OK'` | Accessible label of the check button that closes the time layer |

The wheels are labelled with the names of the hour, minute and second fields in the `locale` language (or the page language).

## Methods

Inherits all methods from [`dile-datepicker`](/components/dile-datepicker/). In addition:

| Method | Description |
| --- | --- |
| `acceptTime()` | Writes the marked day (or the focused day) and the selected time in the field and closes the picker |
| `openTimePicker()` | Shows the time wheels over the calendar |
| `closeTimePicker()` | Hides the time wheels |

The read-only `selectedTime` getter returns the selected time as `"HH:mm:ss"`, and `timePickerOpened` says whether the time wheels are visible.

## Events

Inherits all events from [`dile-datepicker`](/components/dile-datepicker/).

## CSS Custom Properties

In addition to all CSS Custom Properties from [`dile-datepicker`](/components/dile-datepicker/), you can customize the following new aspects specific to `dile-datetimepicker`:

| Custom property                                    | Description                                 | Default                            |
| -------------------------------------------------- | ------------------------------------------- | ---------------------------------- |
| --dile-datetimepicker-accept-icon-size             | Size of the accept icon                     | 24px                               |
| --dile-datetimepicker-accept-icon-color            | Color of the accept icon                    | var(--dile-on-primary-color, #888) |
| --dile-datetimepicker-accept-icon-background-color | Background color of the rounded accept icon | var(--dile-primary-color, #f4f4f4) |
| --dile-datetimepicker-accept-focus-ring-color      | Focus outline color for the accept button   | var(--dile-primary-color, #2563eb) |
| --dile-datetimepicker-time-color                   | Text color of the time button               | var(--dile-calendar-day-text-color, #303030) |
| --dile-datetimepicker-time-font-size               | Font size of the time button                | 1.1rem                             |
| --dile-datetimepicker-wheel-width                  | Width of each time wheel                    | 4.5rem                             |

The time wheels use the same `--dile-calendar-wheel-*` custom properties as the month and year columns of the calendar (see [`dile-datepicker`](/components/dile-datepicker/)).

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

### Datetimepicker with seconds and steps

```html:preview
<dile-datetimepicker 
  name="datetimepicker4" 
  label="Meeting"
  showSeconds
  minuteStep="15"
  secondStep="10"
></dile-datetimepicker>
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
