```js server
/* START - Rocket auto generated - do not touch */
export const sourceRelativeFilePath = 'components/dile-social-icon.rocket.md';
import { layout } from '../recursive.data.js';
export { layout };
/* END - Rocket auto generated - do not touch */

export const title = 'dile-social-icon';
```

```js script
import { html, css, LitElement } from 'lit'; 
import '@mdjs/mdjs-story/define';
import '@mdjs/mdjs-preview/define';
import "@dile/dile-menu-hamburger/dile-menu-hamburger.js";
import "@dile/dile-selector/dile-selector.js";
import "@dile/dile-selector/dile-selector-item.js";
```

# dile-social-icon

Web component to display icons from the main social networks and communities, based on Lit.

## Installation

1) Install the npm package

```bash
npm i @dile/dile-social-icon
```

## Usage

Import the component

```javascript
import '@dile/dile-social-icon/dile-social-icon.js';
```

Use the web component

```html
<dile-social-icon icon="facebook"></dile-social-icon>
```

The icon property is used to set the icon you want to show. There are icons from the main social networks and services. 

## Icons available

The icon property accepts the social icons listed bellow:

- facebook
- google
- twitter
- pinterest
- linkedin
- youtube
- whatsapp
- instagram
- gmail
- snapchat
- github

![Available icons](/images/social-icons.png "Available icons")

> Note that the name of the icons is always in lowercase.


## Custom styles

You can customize the icon styles using CSS Custom Styles.

Custom property | Description | Default
----------------|-------------|---------
--dile-social-icon-color | Icon color | #888
--dile-social-icon-size | Icon size (this sets width & height to the same value) | 24px




