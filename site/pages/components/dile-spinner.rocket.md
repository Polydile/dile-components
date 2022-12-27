```js server
/* START - Rocket auto generated - do not touch */
export const sourceRelativeFilePath = 'components/dile-spinner.rocket.md';
import { layout } from '../recursive.data.js';
export { layout };
/* END - Rocket auto generated - do not touch */

export const title = 'dile-spinner';
```

```js script
import { html, css, LitElement } from 'lit'; 
import '@mdjs/mdjs-story/define';
import '@mdjs/mdjs-preview/define';
import '../../../packages/dile-spinner/dile-spinner.js'
import "../../../packages/dile-menu-hamburger/dile-menu-hamburger.js";
import "../../../packages/dile-selector/dile-selector.js";
import "../../../packages/dile-selector/dile-selector-item.js";
```

# dile-spinner

Web component to implement the tipical "Ajax loading" spinner interface. 

## Installation

```bash
npm i @dile/dile-spinner
```

## Usage

The simpler implementation. Useful to show a inline spinner element, localized in the place where you put the dile-spinner element.

### Usage

Import the component.

```javascript
import '@dile/dile-spinner/dile-spinner.js';
```

Use the component.

```html
<dile-spinner active></dile-spinner>
```

## Properties

- **active**: Boolean. Defines the spinner visibility. The spinner only appears when active is true.

## Styling

Custom property | Description | Default
----------------|-------------|---------
--dile-spinner-color | The ajax loading color | #888
--dile-spinner-dot-size | The size of the dots in the spinner animation | 6px
--dile-spinner-background | Spinner background | transparent

## dile-spinner demos

### Default spinner

```html preview-story
<dile-spinner active></dile-spinner>
```

### Styled spinner

```html preview-story
<style>
  .styled {
    --dile-spinner-color: #fff;
    --dile-spinner-dot-size: 8px;
    --dile-spinner-background: #c64;
  }
</style>
<dile-spinner class="styled" active></dile-spinner>
```

### Interactive demo

```js preview-story
class MyComponent extends LitElement {

  render() {
    return html`
      <style>
      .green {
        --dile-spinner-color: #3a6;
      }
      </style>
      <p>
        <button id="start">Start spinner</button>
        <button id="stop">Stop Spinner</button>
      </p>
      <dile-spinner class="green"></dile-spinner>
    `
  }
  firstUpdated() {
    let spinner = this.shadowRoot.querySelector('dile-spinner');
    this.shadowRoot.getElementById('start').addEventListener('click', (e) => {
      spinner.active = true;
    });
    this.shadowRoot.getElementById('stop').addEventListener('click', (e) => {
      spinner.active = false;
    });
  }
}
customElements.define('my-component', MyComponent);
export const JsStory = () => html`<my-component></my-component>`;
```