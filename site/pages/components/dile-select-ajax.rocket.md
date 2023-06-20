```js server
/* START - Rocket auto generated - do not touch */
export const sourceRelativeFilePath = 'components/dile-select-ajax.rocket.md';
import { layout } from '../recursive.data.js';
export { layout };
/* END - Rocket auto generated - do not touch */

export const title = 'dile-select-ajax';
```

```js script
import { html, css, LitElement } from 'lit'; 
import '@mdjs/mdjs-story/define';
import '@mdjs/mdjs-preview/define';
import '@dile/dile-select/dile-select-ajax.js'
import "@dile/dile-menu-hamburger/dile-menu-hamburger.js";
import "@dile/dile-selector/dile-selector.js";
import "@dile/dile-selector/dile-selector-item.js";
```

# dile-select-ajax

This component has the hability to search in a configurable JSON API resource to show the options returned by that resource on the ```<select>``` element.

The component make automatic server calls using Ajax to the URL configured by the ```endpoint``` attribute.

```html
<dile-select-ajax 
  id="select1"
  name="post_id"
  label="Post"
  displayProperty="title" 
  endpoint="https://jsonplaceholder.typicode.com/posts"
  delay="500"
></dile-select-ajax>
```

This component is not documented yet.

## dile-select-ajax demo

```js preview-story
class MyComponent extends LitElement {
  static get styles() {
    return css`
      :host {
        position: relative;
      }
      dile-select-ajax {
        z-index: 1;
      }
    `
  }

  render() {
    return html`
      <dile-select-ajax 
        id="select1"
        name="post_id"
        label="Post"
        displayProperty="title" 
        endpoint="https://jsonplaceholder.typicode.com/posts"
        delay="500"
      ></dile-select-ajax>

      <p id="msg1">Select a value</p>
      <p style="font-size: 0.875rem;">Note that the API we are use in this example (jsonplaceholder) does not accept filtering on like operator, so you will always recive all dataset on searches.</p>
    `
  }
  firstUpdated() {
    this.shadowRoot.getElementById('select1').addEventListener('element-changed', (e) => {
      let textElement = this.shadowRoot.getElementById('msg1');
      textElement.innerText = "The value selected is: " + e.detail.value;
    });
  }
}
customElements.define('my-component', MyComponent);
export const JsStory = () => html`<my-component></my-component>`;
```
