---
title: Datepicker
package: '@dile/utils'
element: '&lt;dile-datepicker&gt;'
status: stable
summary: Date input component with integrated calendar picker. Based on lion-calendar with automatic localization and calendar navigation.
tags: forms
---

# dile-datepicker

Web Component to create a input date form element with a datepicker, based on the [lion-calendar](https://lion-web.netlify.app/components/calendar/overview/) component and [dile-input-icon](/components/dile-input-icon) element.

> The @lion calendar has more options not implemented yet in this component. However, this component works good for the main use cases. We are accepting contributors ;)

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

## Properties

This component extends [dile-input-icon](/components/dile-input-icon) and has all dile-input-icon / dile-input properties. 

In addition, the datepicker has this extra properties:

- **firstDayOfWeek**: the first day of the week. 0 is sunday, 1 is monday.
- **horizontalAlign**: the horizontal position of the overlay, default "under_right" (for other available properties consult the [dile-menu-overlay](/components/dile-menu-overlay) component)
- **verticalAlign**: the vertical position of the overlay, default "center" (see [dile-menu-overlay](/components/dile-menu-overlay) component)
- **moveTop**: position distance to top (see [dile-menu-overlay](/components/dile-menu-overlay) component)
- **moveLeft**: position distance to left (see [dile-menu-overlay](/components/dile-menu-overlay) component)

## Methods

- **openDatepicker()**: Opens the datepicker overlay programmatically.
- **closeDatepicker()**: Closes the datepicker overlay programmatically.
- **close()**: Closes the datepicker overlay. Also used internally when pressing the Esc key.

## Keyboard Support

The datepicker automatically closes when the user presses the **Esc** key while the calendar overlay is open.

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
--dile-calendar-navigation-justify-content | Year and month navigation justify content on a flex container | space-between
--dile-calendar-navigation-text-size | Year and month navigation font size when window size is more than 400px | 1.1rem

## Datepicker demos

## Datepicker with custom trigger background & hover

```html:preview
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

## Disabled datepicker

```html:preview
<dile-datepicker label="Date" name="disabelddatepicker" disabled id="disabelddatepicker">Disabled datepicker</dile-datepicker>
```
