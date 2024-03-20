```js server
/* START - Rocket auto generated - do not touch */
export const sourceRelativeFilePath = 'components/dile-inline-feedback.rocket.md';
import { layout } from '../recursive.data.js';
export { layout };
/* END - Rocket auto generated - do not touch */

export const title = 'dile-inline-feedback';
```

```js script
import { html, css, LitElement } from 'lit'; 
import '@mdjs/mdjs-story/define';
import '@mdjs/mdjs-preview/define';
import '@dile/dile-inline-feedback/dile-inline-feedback.js'
import "@dile/dile-menu-hamburger/dile-menu-hamburger.js";
import "@dile/dile-selector/dile-selector.js";
import "@dile/dile-selector/dile-selector-item.js";
```

# dile-inline-feedback

Web component to show feedback messages to the user. 

## Installation

```bash
npm i @dile/dile-inline-feedback
```

## Usage

Import the component.

```javascript
import '@dile/dile-inline-feedback/dile-inline-feedback.js';
```

Use the component.

```html
<dile-inline-feedback></dile-inline-feedback>
```

## Methods

- **positiveFeedback(msg)**: Send a positive message to the user 
- **negativeFeedback(msg)**: Send a negative message to the user 
- **neutralFeedback(msg)**: Send a neutral message to the user 

## dile-inline-feedback demo

```js preview-story
class MyComponent extends LitElement {

  render() {
    return html`
     
      <p>
        <button id="positive">Positive feedback</button>
        <button id="negative">Negative feedback</button>
        <button id="clear">Clear feedback</button>
      </p>
      <dile-inline-feedback></dile-inline-feedback>
    `
  }
  firstUpdated() {
    let feedback = this.shadowRoot.querySelector('dile-inline-feedback');
    this.shadowRoot.getElementById('positive').addEventListener('click', (e) => {
      feedback.positiveFeedback('This is a positive feedback');
    });
    this.shadowRoot.getElementById('negative').addEventListener('click', (e) => {
      feedback.negativeFeedback('Oh no!!! this is a negative feedback');
    });
    this.shadowRoot.getElementById('clear').addEventListener('click', (e) => {
      feedback.clear();
    });
  }
}
customElements.define('my-component', MyComponent);
export const JsStory = () => html`<my-component></my-component>`;
```