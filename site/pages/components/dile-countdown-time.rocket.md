```js server
/* START - Rocket auto generated - do not touch */
export const sourceRelativeFilePath = 'components/dile-countdown-time.rocket.md';
import { layout } from '../recursive.data.js';
export { layout };
/* END - Rocket auto generated - do not touch */

export const title = 'dile-countdown-time';
```

```js script
import { html } from 'lit'; 
import '@mdjs/mdjs-story/define';
import '@mdjs/mdjs-preview/define';
import '../../../packages/dile-countdown-time/dile-countdown-time.js'
import "../../../packages/dile-menu-hamburger/dile-menu-hamburger.js";
import "../../../packages/dile-selector/dile-selector.js";
import "../../../packages/dile-selector/dile-selector-item.js";
```

# dile-countdown-time

Web component to make a countdown of days, hours, minutes and seconds to a date-time.

## Instalation

```bash
npm install @dile/dile-countdown-time
```

**Important:** this component depends on [MomentJS](https://momentjs.com/). The component by itself does not install the Moment library. You need to install it in your preferred way.

## Usage

Import the component.

```javascript
import '@dile/dile-countdown-time/dile-countdown-time.js';
```

Use the component.

```html
<dile-countdown-time dateString="31-12-2020 10:00" language="es"></dile-countdown-time>
```

## Properties

- **dateString**: The dateString property works with the date in "DD-MM-YYYY HH:mm" format.
- **language**: The language property accepts the languages "en" (default) or "es".
- **shape**: The shape property accepts the shapes "square" (default) or "circle".

## Styling

The following custom properties and mixins are available for styling:

Custom property | Description | Default
----------------|-------------|---------
--dile-countdown-time-shape-color | shape color | #212121
--dile-countdown-time-number-color | number color | #f5f5f5
--dile-countdown-time-word-color | word color | #212121