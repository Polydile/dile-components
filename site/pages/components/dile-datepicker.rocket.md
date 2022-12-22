```js server
/* START - Rocket auto generated - do not touch */
export const sourceRelativeFilePath = 'components/dile-datepicker.rocket.md';
import { layout } from '../recursive.data.js';
export { layout };
/* END - Rocket auto generated - do not touch */

export const title = 'dile-datepicker';

```

```js script
import { html, css, LitElement } from 'lit'; 
import '@mdjs/mdjs-story/define';
import '@mdjs/mdjs-preview/define';
import '../../../packages/dile-datepicker/dile-datepicker.js'
import "../../../packages/dile-menu-hamburger/dile-menu-hamburger.js";
```

# dile-datepicker

Web Component to create a input date form element with a datepicker, based on the [lion-calendar](https://lion-web.netlify.app/components/calendar/overview/) component and [dile-input](/components/dile-input) element.

> The @lion calendar has more options not implemented yet in this component. However, this component works good for the main use cases. We are accepting contributors ;)

## Installation

```bash
npm i @dile/dile-datepicker
```

## Usage

Import the component.

```javascript
import '@dile/dile-datepicker/dile-datepicker.js';

Use the component.

```html
<dile-datepicker name="date" label="date"></dile-datepicker>
```

## Properties

This component extends [dile-input](/components/dile-input) and has all dile-input properties. 

In addition, the datepicker has this extra properties:

- **firstDayOfWeek**: the first day of the week. 0 is sunday, 1 is monday.
- **horizontalAlign**: the horizontal position of the overlay, default "center" (for other available properties consult the [dile-menu-overlay](/components/dile-menu-overlay) component)
- **verticalAlign**: the horizontal position of the overlay, default "left" (see [dile-menu-overlay](/components/dile-menu-overlay) component)
- **moveTop**: position distance to top (see [dile-menu-overlay](/components/dile-menu-overlay) component)
- **moveLeft**: position distance to left (see [dile-menu-overlay](/components/dile-menu-overlay) component)

## CSS Custom Properties

For dile-datepicker:

Is possible to use the most of the custom properties documented on [dile-input](/components/dile-input) and [dile-menu-overlay](/components/dile-menu-overlay).

Custom property | Description | Default
----------------|-------------|---------
--dile-datepicker-font-size | Font size for the calendar | 0.9rem
--dile-datepicker-trigger-color | Color for the icon | #39c
--dile-datepicker-trigger-size | Size for the icon | 36px
--dile-datepicker-trigger-disabled-color | Color for the icon on disabled state | #ccc
--dile-datepicker-trigger-margin-bottom | Space bottom for the icon | 0.2em
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

## Localization

The component is localized automaticaly to the lang declared on the HTML tag:

```html
<html lang="en">
```

Supports many languages, for example:

```html
<html lang="es">
```

## Datepicker demos

## Styled datepicker appears on bottom

```html preview-story
<dile-datepicker name="datepicker2" id="datepicker2" class="styled" label="Event date" verticalAlign="bottom">Styled datepicker</dile-datepicker>
```

## Monday as first day

```html preview-story
<dile-datepicker firstDayOfWeek="1" name="datepicker2" id="datepicker2" label="Event date">Styled datepicker</dile-datepicker>
```

## Disabled datepicker

```html preview-story
<dile-datepicker label="Date" name="disabelddatepicker" disabled id="disabelddatepicker">Disabled datepicker</dile-datepicker>
```