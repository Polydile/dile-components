```js server
/* START - Rocket auto generated - do not touch */
export const sourceRelativeFilePath = 'components/dile-media-query.rocket.md';
import { layout } from '../recursive.data.js';
export { layout };
/* END - Rocket auto generated - do not touch */

export const title = 'dile-media-query';

```

```js script
import { html, css, LitElement } from 'lit'; 
import '@mdjs/mdjs-story/define';
import '@mdjs/mdjs-preview/define';
import '@dile/dile-media-query/dile-media-query.js'
import "@dile/dile-menu-hamburger/dile-menu-hamburger.js";
import "@dile/dile-selector/dile-selector.js";
import "@dile/dile-selector/dile-selector-item.js";
```

# dile-media-query

Web Component to make media queries and recive events when its state changes.

## Installation

```bash
npm i @dile/dile-media-query
```

## Usage

Import the component.

```javascript
  import '@dile/dile-media-query/dile-media-query.js';
```

Use the component.

```html
<dile-media-query query="(max-width: 1000px)"></dile-media-query>
```

### Properties

- **query**: Media query to check if is matched.

### Events

- **dile-media-query-changed**: te component dile-media-query dispatchs this event when the media query match changes between states. This event is dispatched also when the ```query``` property is set.

# dile-media-query demos

```js preview-story
class MyComponent extends LitElement {
  static get styles() {
    return css`
      
    `
  }

  render() {
    return html`
      <dile-media-query id="mediaq" query="(min-width: 460px)"></dile-media-query>
      <div id="message"></div>
    `
  }
  firstUpdated() {
    let mediaq = this.shadowRoot.getElementById("mediaq");
    let message = this.shadowRoot.getElementById("message");
    mediaq.addEventListener('dile-media-query-changed', function(e) {
        message.innerHTML = 
          "The media query (min-width: 460px) state is <b>" + (e.detail.value ? 'matched' : 'not matched') + "</b>"
      });
  }
}
customElements.define('my-component', MyComponent);
export const JsStory = () => html`<my-component></my-component>`;
```

## Credits

This component is based on an abandoned project from Victor Bernabé: <https://github.com/Victor-Bernabe/lit-media-query>. We have updated the component to use Lit instead of Lit-Element and a refactoring to take advantage of the component lifecycle methods.
