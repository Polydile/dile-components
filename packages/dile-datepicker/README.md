# @dile/dile-datepicker

Web Component to create a input date form element with a datepicker, based on the lion-calendar component and dile-input element.

This is a work in progress. The @lion calendar has more options not implemented yet.

## Installation
```bash
npm i @dile/dile-datepicker
```

## Usage
```html
<script type="module">
  import '@dile/dile-datepicker/dile-datepicker.js';
</script>

<dile-datepicker name="date" label="date"></dile-datepicker>
```

## Properties

All the dile-input properties. In addition:

- **firstDayOfWeek**: the first day of the week. 0 is sunday, 1 is monday.
- **horizontalAlign**: the horizontal position of the overlay, default "center" (see dile-menu-overlay component)
- **verticalAlign**: the horizontal position of the overlay, default "left" (see dile-menu-overlay component)

## CSS Custom Properties

For dile-datepicker:

Is possible to use the most of the custom properties documented on dile-input, dile-menu-overlay.

Custom property | Description | Default
----------------|-------------|---------
--dile-datepicker-font-size | Font size for the calendar | 0.9rem
--dile-datepicker-trigger-color | Color for the icon | #39c
--dile-datepicker-trigger-size | Size for the icon | 36px
--dile-datepicker-trigger-disabled-color | Color for the icon on disabled state | #ccc
--dile-datepicker-trigger-margin-bottom | Space bottom for the icon | 0.2em

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

## Localization

The component is localized automaticaly to the lang declared on the HTML tag:

```html
<html lang="en">
```

Supports many languages, for example:

```html
<html lang="es">
```
