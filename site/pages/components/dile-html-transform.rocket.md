```js server
/* START - Rocket auto generated - do not touch */
export const sourceRelativeFilePath = 'components/dile-html-transform.rocket.md';
import { layout } from '../recursive.data.js';
export { layout };
/* END - Rocket auto generated - do not touch */

export const title = 'dile-html-transform';
```

```js script
import { html, css, LitElement } from 'lit'; 
import '@mdjs/mdjs-story/define';
import '@mdjs/mdjs-preview/define';
import '../../../packages/dile-html-transform/dile-html-transform.js'
import "../../../packages/dile-menu-hamburger/dile-menu-hamburger.js";
import "../../../packages/dile-selector/dile-selector.js";
import "../../../packages/dile-selector/dile-selector-item.js";
```

# dile-html-transform

A web component to transform plain text into HTML applying breaklines and transform URLs into links.

## Install

```bash
npm install @dile/dile-html-transform
```

## Usage

Import the component.

```javascript
import '@dile/dile-html-transform/dile-html-transform';
```

## Use the component

You can assign the text to transform in the "text" property of the component. Then, the ```<dile-html-transform>``` component will show the transformed text, to display break lines and links on the URLs. 

Transformations available:
- Transform newlines in ```<br>``` tags 
- Transform urls in HTML links (```<a href="...">text</a>```)

> **Cross-Site Scripting note**: This component will not parse strings with HTML. It uses [Linkify-string](https://linkify.js.org/docs/linkify-string.html) to convert URLs into HTML links. So, any HTML entities in the input strings will be converted to encoded characters. Later we use the lit unsafeHTML directive, to display the link on the document. Although, it is always important to validate the input to prevent xss attacks.

```html
<dile-html-transform text="Hi! from DesarrolloWeb.com. Why not to follow us on twitter.com?" convertLines convertLinks></dile-html-transform>
```

In order to make the desired conversions you need to provide the following attributes:

- **text**: The text that will be transformed 
- **convertLines**: should be true to convert new lines to ```<br>``` 
- **convertLinks**: should be true to convert the URLs in the text into links, including email addresses

## This component depends on Linkify.js

This component load [Linkify.js](https://linkify.js.org/) library by it-self, to convert the URLs in the text into links. You don't need to load this library manually.

## dile-html-transform demos

### Simple demo

```html preview-story
<dile-html-transform text="I found Escuela.it a interesting site. Contact them at contacto@escuela.it" convertLines convertLinks></dile-html-transform>
```

### Interactive demo

```js preview-story
class MyComponent extends LitElement {
  render() {
    return html`
      <p>
      <dile-html-transform id="transform" convertLines convertLinks></dile-html-transform>
    </p>
    <button id="links">Toggle links</button> <button id="lines">Toggle breaklines</button>
    `;
  }

  firstUpdated() {
      let transformElement = this.shadowRoot.getElementById('transform');
      document.addEventListener('DOMContentLoaded', function() {
         transformElement.text = `Hi!
The main search engine is google.com.
...but I think bing.com is also a great option.`
      });
      this.shadowRoot.getElementById('links').addEventListener('click', function() {
        transformElement.convertLinks = !transformElement.convertLinks;
      });
      this.shadowRoot.getElementById('lines').addEventListener('click', function () {
        transformElement.convertLines = !transformElement.convertLines;
      });
  }
  
}
customElements.define('my-component', MyComponent);
export const JsStory = () => html`<my-component></my-component>`;
```