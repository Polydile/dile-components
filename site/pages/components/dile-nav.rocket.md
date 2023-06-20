```js server
/* START - Rocket auto generated - do not touch */
export const sourceRelativeFilePath = 'components/dile-nav.rocket.md';
import { layout } from '../recursive.data.js';
export { layout };
/* END - Rocket auto generated - do not touch */

export const title = 'dile-nav';
```

```js script
import { html, css, LitElement } from 'lit'; 
import '@mdjs/mdjs-story/define';
import '@mdjs/mdjs-preview/define';
import '@dile/dile-nav/dile-nav.js'
import "@dile/dile-menu-hamburger/dile-menu-hamburger.js";
import "@dile/dile-selector/dile-selector.js";
import "@dile/dile-selector/dile-selector-item.js";
import "@dile/dile-hamburger/dile-hamburger.js";
```

# dile-nav

Web Component to create a nav bar

## Installation
```bash
npm i @dile/dile-nav
```

## Usage

Import the component.

```javascript
import '@dile/dile-nav/dile-nav.js';
```

Use the component

```html
<dile-nav>
  <span slot="title">Hi from Polydile!!</span>
</dile-nav>
```

The dile-nav component has 3 slots of content: "title", "menu" and "actions". It is not necessary to use all of them. 

There is am example in a more complex implementation.

```html
<dile-nav>
  <h2 slot="title">Nav title</h2>
  <span slot="menu">[x]</span>
  <span slot="actions">Create</span>
</dile-nav>
```

## Properties
  - menu: position of the menu, between "left" and "right"

## Style customization

You can customize the navigation bar by using the CSS custom properties bellow.

Custom property | Description | Default
----------------|-------------|---------
--dile-nav-color | Nav text color | #fff
--dile-nav-background-color | Nav background color | #666
--dile-nav-align-items | Nav align items (display grid property) | center
--dile-nav-column-gap | Nav column gap (display grid property)| 1rem
--dile-nav-padding-x | Nav padding horizontal | 0.6rem
--dile-nav-padding-y | Nav padding vertical | 0.8rem

## dile-nav demos

### Default nav

```html preview-story
<style>
  h2 {
    margin: 0;
  }
  dile-nav.demo {
    color: #fff;
  }
  .hamburger {
    position: relative;
    top: -2px;
    --dile-hamburger-padding-x: 0;
    --dile-hamburger-color: #fff;
  }
</style>
<dile-nav class="demo">
  <h2 slot="title">Nav title</h2>
  <span slot="menu"><dile-hamburger class="hamburger"></dile-hamburger></span>
  <span slot="actions">Action</span>
</dile-nav>
```

### Styled nav

```html preview-story
<style>
  h2 {
    margin: 0;
  }
  .hamburger2 {
    position: relative;
    top: -2px;
    --dile-hamburger-padding-x: 0;
    --dile-hamburger-color: #369;
  }
  .styled {
    --dile-nav-background-color: #bbdefb;
    --dile-nav-color: #303030;
    --dile-nav-padding-y: 1rem;
    --dile-nav-padding-x: 1rem;
    color: #666;
  }
</style>
<dile-nav class="styled" menu="right">
  <h2 slot="title">Nav title</h2>
  <span slot="menu"><dile-hamburger class="hamburger2"></dile-hamburger></span>
  <span slot="actions">Action</span>
</dile-nav>
```

