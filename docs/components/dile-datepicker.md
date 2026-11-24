---
title: Datepicker
package: '@dile/utils'
element: '&lt;dile-datepicker&gt;'
status: stable
summary: Localized date input with an integrated calendar, touch-friendly month and year wheels, and keyboard-accessible navigation.
tags: forms
---

# dile-datepicker

Web Component to create an input date form element with a datepicker, based on the [lion-calendar](https://lion-web.netlify.app/components/calendar/overview/) component and [dile-input-icon](/components/dile-input-icon) element.

## Installation

```bash
npm i @dile/utils
```

## Usage

Import the component.

```javascript
import '@dile/utils/components/datepicker/datepicker.js';
```

Use the component.

```html
<dile-datepicker name="date" label="date"></dile-datepicker>
```

## Localization

The component is localized automaticaly to the lang declared on the HTML tag:

```html
<html lang="en">
```

Supports many languages, for example:

```html
<html lang="es">
```

To use another language in a single datepicker, set its `locale` property. It changes the calendar (month and weekday names) and the format of the text value: with `locale="es-ES"` the value is written and read as `DD/MM/YYYY`.

```html
<dile-datepicker label="Fecha" locale="es-ES"></dile-datepicker>
```

## Limiting the selectable dates

Use `minDate` and `maxDate` to set the first and last dates that can be selected in the calendar. Days outside the range are disabled, the navigation arrows stop at the limits, the calendar opens on an allowed month, and the month and year columns only offer allowed values.

```html
<dile-datepicker label="Booking date" minDate="2026-01-01" maxDate="2026-12-31"></dile-datepicker>
```

To disable other dates, assign a function to `disableDates` from JavaScript. It receives each `Date` and returns `true` when that day can't be selected:

```javascript
// No weekends
datepicker.disableDates = (date) => date.getDay() === 0 || date.getDay() === 6;
```

> **Note:** these limits apply to the calendar. To also check the dates typed by hand, enable `validateDate` (see the next section).

## Validating typed dates

Add the `validateDate` attribute to check the text written by hand when the input loses the focus:

```html
<dile-datepicker label="Booking date" validateDate minDate="2026-01-01" maxDate="2026-12-31"></dile-datepicker>
```

- The text must be a date in the format of the locale (or `YYYY-MM-DD`), and it must respect `minDate`, `maxDate` and `disableDates`.
- An invalid value shows an error message (in English, Spanish, Catalan, French or German, depending on `locale` or the page language) and marks the field as invalid for native forms (`checkValidity()` returns `false`). Any previous `message` is restored when the value becomes valid.
- A valid value is rewritten in the format of the locale, for example `5/3/2024` becomes `05/03/2024`. The `dile-datetimepicker` validates the date of its value but doesn't rewrite it.
- An empty value is valid: make the field required with your form validation.

Customize the texts with `validationMessages`. `{date}` is replaced by the limit date and `{example}` by an example date:

```javascript
datepicker.validationMessages = {
  invalid: 'Use the format {example}',
  beforeMin: 'Choose {date} or a later date',
  afterMax: 'Choose {date} or an earlier date',
  disabled: 'We are closed that day',
};
```

## Choosing month and year

Select the month or the year shown in the calendar header to replace the days with two scrolling columns, one for the month and one for the year, built with [dile-wheel-picker](/components/dile-wheel-picker/). The value that stays in the central band is applied to the calendar as you scroll, so it is easy to jump to dates far in the past, like dates of birth, also on touch devices.

Select the small check button below the columns, select the header again, or press **Enter** or **Escape**, to go back to the days. Escape only closes the month and year columns; the calendar stays open. The previous/next arrows keep working while the columns are shown.

The year column shows 100 years before and after the current year by default. Use `minYear` and `maxYear` to change that range. It is always limited by `minDate` / `maxDate` and always includes the year being displayed.

## Properties

This component extends [dile-input-icon](/components/dile-input-icon) and has all dile-input-icon / dile-input properties. 

In addition, the datepicker has this extra properties:

- **firstDayOfWeek**: the first day of the week. 0 is sunday, 1 is monday.
- **horizontalAlign**: the horizontal position of the overlay, default "under_right" (for other available properties consult the [dile-menu-overlay](/components/dile-menu-overlay) component)
- **verticalAlign**: the vertical position of the overlay, default "center" (see [dile-menu-overlay](/components/dile-menu-overlay) component)
- **moveTop**: position distance to top (see [dile-menu-overlay](/components/dile-menu-overlay) component)
- **moveLeft**: position distance to left (see [dile-menu-overlay](/components/dile-menu-overlay) component)
- **minYear**: first year of the year column in the month and year selection. Default: current year - 100.
- **maxYear**: last year of the year column in the month and year selection. Default: current year + 100.
- **weekdayHeaderNotation**: notation of the weekday names in the calendar header: `"long"` (Thursday), `"short"` (Thu) or `"narrow"` (T). `"narrow"` is useful on narrow screens. Default: `"short"`.
- **locale**: language of this datepicker (for example `"es-ES"`), used by the calendar and to write and read the text value. Default: the language of the page (`<html lang>`).
- **minDate**: first selectable date. Accepts a `Date` object or a `"YYYY-MM-DD"` string (read as a local date). Default: no limit (internally January 1 of year 100).
- **maxDate**: last selectable date. Same formats as `minDate`. Default: no limit.
- **validateDate**: when present, validates the typed date on blur, shows an error message and rewrites valid dates in the format of the locale. Default: `false`.
- **validationMessages**: object to override the validation texts (`invalid`, `beforeMin`, `afterMax`, `disabled`). Default: `{}`.
- **disableDates**: function `(date) => boolean` that returns `true` for the days that can't be selected. Only settable from JavaScript.

The inner `dile-calendar` also has a **monthYearAcceptLabel** property (default `"OK"`) with the accessible label of the check button that closes the month and year columns.

## Methods

- **openDatepicker()**: Opens the datepicker overlay programmatically.
- **closeDatepicker()**: Closes the datepicker overlay programmatically.
- **close()**: Closes the datepicker overlay. Also used internally when pressing the Esc key.
- **validate()**: validates the current value, showing or removing the error message. Returns `true` when the value is valid.
- **getDateValidation(value)**: checks a value (the current one by default) without changing the component. Returns `{ valid, reason, date }`, where `reason` is `invalid`, `beforeMin`, `afterMax` or `disabled`.
- **syncCalendarWithValue()**: Marks the date of the current value in the calendar and shows its month (today when the value is empty or invalid). It runs automatically every time the calendar opens.

The inner `dile-calendar` also offers **openMonthYearPicker(column)** (`'month'` or `'year'`), **closeMonthYearPicker()** and **goToDate(date)**, which shows the month of a date or of the nearest enabled date.

## Opening the calendar

When the calendar opens, it shows the month of the current value and marks that day as selected. The value can be a date in the format of the current locale (the one the datepicker writes) or a `YYYY-MM-DD` string. With an empty or invalid value, the calendar shows today, or the nearest date allowed by `minDate`, `maxDate` and `disableDates`.

## Keyboard Support

When the calendar opens, the focus moves to the selected day (or today), so the days can be navigated right away: the arrow keys move by day and week, Page Up / Page Down change the month (with **Alt**, the year), and **Enter** or **Space** selects the day. When the calendar closes with the focus inside it, the focus returns to the element that had it before opening, or to the calendar button.

The datepicker automatically closes when the user presses the **Esc** key while the calendar overlay is open. When the month and year columns are shown, the first **Esc** only goes back to the days.

In the month and year columns, use the arrow keys, Page Up / Page Down and Home / End to change the value, and **Enter** to go back to the days.

## CSS Custom Properties

For dile-datepicker:

Is possible to use the most of the custom properties documented on [dile-input-icon](/components/dile-input-icon) and [dile-menu-overlay](/components/dile-menu-overlay).

Custom property | Description | Default
----------------|-------------|---------
--dile-datepicker-font-size | Font size for the calendar | 0.9rem
--dile-datepicker-trigger-color | Color for the icon | #303030
--dile-datepicker-trigger-size | Size for the icon | 20px
--dile-datepicker-trigger-background-color | Background color for the trigger button | transparent
--dile-datepicker-trigger-hover-background-color | Hover background color for the trigger button | rgba(0, 0, 0, 0.05)
--dile-datepicker-trigger-disabled-color | Color for the icon on disabled state | #ccc
--dile-datepicker-width | calendar width | Depends on the window size (responsive) from 280px to 350px

For dile-datepicker and dile-calendar component: 

Custom property | Description | Default
----------------|-------------|---------
--dile-calendar-day-background-color | Common days background | rgba(90, 90, 90, 0.08)
--dile-calendar-day-text-color | Common days text color | #303030
--dile-calendar-day-border-radius | Days border radius | 2px
--dile-calendar-today-background-color | Color customization for today | rgba(90, 90, 90, 0.20)
--dile-calendar-out-day-text-color | Color customization for days that aren't in the current month | #777
--dile-calendar-nav-buttons-color | Color for the links to previous/next month and year | #303030
--dile-calendar-day-size | Size of the calendar day square | Depends on the window size (responsive) from 28px to 36px 
--dile-calendar-navigation-justify-content | Alignment of the year and month navigation groups | space-between
--dile-calendar-navigation-text-size | Year and month navigation font size when window size is more than 400px | 1.1rem
--dile-calendar-wheel-item-height | Row height of the month and year columns | 36px
--dile-calendar-wheel-font-size | Font size of the month and year columns | 1.1rem
--dile-calendar-month-year-accept-color | Color of the check button below the month and year columns | --dile-calendar-nav-buttons-color or #303030
--dile-calendar-month-year-accept-border-color | Border color of that check button | The button color at 35% opacity
--dile-calendar-wheel-text-color | Color of the not selected values in the month and year columns | --dile-calendar-day-text-color at 60% opacity
--dile-calendar-wheel-selected-text-color | Color of the selected values in the month and year columns | --dile-calendar-day-text-color or #303030
--dile-calendar-wheel-band-background-color | Background of the selection band in the month and year columns | --dile-calendar-day-background-color or rgba(90, 90, 90, 0.08)

## Datepicker demos

## Datepicker with custom trigger background & hover

```html:preview
<script type="module">
  import '@dile/utils/components/datepicker/datepicker.js';
</script>
<style>
  .custom-trigger-bg {
    --dile-datepicker-trigger-color: #4338ca;
    --dile-datepicker-trigger-background-color: #e0e7ff;
    --dile-datepicker-trigger-hover-background-color: #c7d2fe;
    --dile-input-icon-border-radius: 8px;
  }
</style>
<dile-datepicker name="datepicker_custom_bg" id="datepicker_custom_bg" class="custom-trigger-bg" label="Booking Date"></dile-datepicker>
```

## Styled datepicker appears on bottom

```html:preview
<dile-datepicker name="datepicker2" id="datepicker2" class="styled" label="Event date" verticalAlign="bottom">Styled datepicker</dile-datepicker>
```

## Monday as first day

```html:preview
<dile-datepicker firstDayOfWeek="1" name="datepicker3" id="datepicker3" label="Event date">Styled datepicker</dile-datepicker>
```

## Limited dates

Only the dates of 2026 can be selected, and weekends are disabled. With `validateDate`, a date typed by hand outside these limits shows an error when leaving the field.

```html:preview
<script type="module">
  const datepicker = document.getElementById('limitedDatepicker');
  datepicker.disableDates = (date) => date.getDay() === 0 || date.getDay() === 6;
</script>
<dile-datepicker id="limitedDatepicker" label="Working day of 2026" minDate="2026-01-01" maxDate="2026-12-31" validateDate></dile-datepicker>
```

## Another language and narrow weekdays

```html:preview
<dile-datepicker label="Fecha de nacimiento" locale="es-ES" firstDayOfWeek="1" weekdayHeaderNotation="narrow"></dile-datepicker>
```

## Date of birth

Click the year in the calendar header and scroll the year column to the desired year. This example limits the year column from 1900 to 2026.

```html:preview
<dile-datepicker name="birthdate" label="Date of birth" minYear="1900" maxYear="2026"></dile-datepicker>
```

## Validation of typed dates

This field has `validateDate` and only accepts dates between 01/01/2000 and 12/31/2030. Type a date and leave the field to validate it: try `abc`, `12/31/1999`, `01/01/2031` or `3/5/2024` (valid, rewritten as `03/05/2024`). The format depends on the page language.

```html:preview
<dile-datepicker
  label="Validated date"
  message="Type a date and leave the field (Tab)"
  minDate="2000-01-01"
  maxDate="2030-12-31"
  validateDate
></dile-datepicker>
```

## Disabled datepicker

```html:preview
<dile-datepicker label="Date" name="disabelddatepicker" disabled id="disabelddatepicker">Disabled datepicker</dile-datepicker>
```
