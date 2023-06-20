```js server
/* START - Rocket auto generated - do not touch */
export const sourceRelativeFilePath = 'components/dile-smooth-scroll.rocket.md';
import { layout } from '../recursive.data.js';
export { layout };
/* END - Rocket auto generated - do not touch */

export const title = 'dile-smooth-scroll';
```

```js script
import { html, css, LitElement } from 'lit'; 
import '@mdjs/mdjs-story/define';
import '@mdjs/mdjs-preview/define';
import '@dile/dile-smooth-scroll/dile-smooth-scroll.js'
import "@dile/dile-menu-hamburger/dile-menu-hamburger.js";
import "@dile/dile-selector/dile-selector.js";
import "@dile/dile-selector/dile-selector-item.js";
```

# dile-smooth-scroll

Web Component to create smooth scrolls on the page document or in a element scrolling section.

This package also provides a mixin to implement scrollin API functions to any component you create.

## Installation

```bash
npm i @dile/dile-smooth-scroll
```

## Usage

Import the component.

```javascript
import '@dile/dile-smooth-scroll/dile-smooth-scroll.js';
```

Use the component

```html
<dile-smooth-scroll id="scrollComponent"></dile-smooth-scroll>
```

This component is not representational, actually provides a simple scroll API. So, you can call it's methods to create smooth scrolls in various ways. 

For example:

```javascript
// This method do a smooth scroll to the bottom of the document.
document.getElementById('scrollComponent').smoothScrollToBottom();

// This method do a smooth scroll to the top of the document.
document.getElementById('scrollComponent').smoothScrollToTop();
```

> It is important to note that the component uses the Javascript native scroll API. If you need to run this component in browsers that do not support it, you will need to use a polyfill. You can find the information about [compatibility of the scroll API in Caniuse](https://caniuse.com/#feat=element-scroll-methods).

## API methods

- **smoothScrollToTop()**: Scrolls the entire document to the top.
- **smoothScrollToBottom()**: Scrolls the entire document to the bottom.
- **smoothScroll(top, left)**: Scrolls the entire document to top & left position.
- **smoothScrollBy(top, left)**: Scrolls the entire document by top & left values.
- **smoothScrollElementIntoView(element)**: Scrolls the entire document to the position of the element passed by argument.
- **smoothElementScrollTop(element)**: Scrolls a section with it's own scrolling area to the top.
- **smoothElementScrollBottom(element)**: Scrolls a section with it's own scrolling area to the bottom.
- **smoothElementScroll(element, top, left)**: Scrolls a section with it's own scrolling area to the top & left position.
- **smoothElementScrollBy(element, top, left)**: Scrolls a section with it's own scrolling area by top & left values.

## properties

- **scrollToElementOnInit**: when the scrollToElementOnInit property is set with an element ID, during the initialization progress of the component the page will scroll to the position of the element ID configured.
 
## Mixins

In this package you will find two mixins to implement the scrolling API into any component. We separate the scrolling API into two mixins because usually you only need one or other.

- [DileSmoothScrollMixin](/mixins/dile-smooth-scroll-mixin)
- [DileSmoothScrollElementMixin](/mixins/dile-smooth-scroll-element-mixin))

## dile-smooth-scroll demos

### Scroll to top example

```js preview-story
class MyComponent extends LitElement {

  render() {
    return html`
      <dile-smooth-scroll></dile-smooth-scroll>
      <button id="scrolltotop">Scroll to top</button>
    `
  }
  firstUpdated() {
    this.shadowRoot.getElementById('scrolltotop').addEventListener('click', (e) => {
      this.shadowRoot.querySelector('dile-smooth-scroll').smoothScrollToTop();
    });
  }
}
customElements.define('my-component', MyComponent);
export const JsStory = () => html`<my-component></my-component>`;
```

### Section scroll demo

```js preview-story
class SecondComponent extends LitElement {
  static get styles() {
    return css`
      #withScroll {
        background-color: #efefef;
        border-radius: 4px;
        margin: 20px 0 0;
        max-width: 300px;
        max-height: 200px;
        overflow: scroll;
        padding: 30px 50px;
      }
      #withScroll h2 {
        margin-top: 0;
      }
    `
  }
  render() {
    return html`
      <dile-smooth-scroll></dile-smooth-scroll>

      <div id="withScroll">
        <h2>Block with it's own scroll</h2>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Similique praesentium nisi eius vitae architecto dolor
          nesciunt ipsam delectus sint laboriosam ut sunt ex ipsa reprehenderit quod labore, earum a veritatis.</p>
        <p>Incidunt natus mollitia commodi? Asperiores voluptatum laborum nesciunt, minima cum qui aspernatur fugiat natus
          recusandae quisquam quo a omnis praesentium, magnam repudiandae quis, ipsam consectetur est porro sapiente aperiam
          odit.</p>
      </div>

      <p>
        <button id="scrollDownSection"> Scroll section 120px down</button>
        <button id="scrollUpSection"> Scroll section 120px up</button>
      </p>
    `
  }
  firstUpdated() {
    let element = this.shadowRoot.getElementById('withScroll');
    this.shadowRoot.getElementById('scrollDownSection').addEventListener('click', (e) => {
      this.shadowRoot.querySelector('dile-smooth-scroll').smoothElementScrollBy(element, 120, 0);
    });
    this.shadowRoot.getElementById('scrollUpSection').addEventListener('click', (e) => {
      this.shadowRoot.querySelector('dile-smooth-scroll').smoothElementScrollBy(element, -120, 0);
    });
  }
}
customElements.define('second-component', SecondComponent);
export const JsStory2 = () => html`<second-component></second-component>`;
```