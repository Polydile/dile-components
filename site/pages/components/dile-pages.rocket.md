```js server
/* START - Rocket auto generated - do not touch */
export const sourceRelativeFilePath = 'components/dile-pages.rocket.md';
import { layout } from '../recursive.data.js';
export { layout };
/* END - Rocket auto generated - do not touch */

export const title = 'dile-pages';
```

```js script
import { html, css, LitElement } from 'lit'; 
import '@mdjs/mdjs-story/define';
import '@mdjs/mdjs-preview/define';
import '../../../packages/dile-pages/dile-pages.js'
import '../../../packages/dile-tabs/dile-tabs.js'
import "../../../packages/dile-menu-hamburger/dile-menu-hamburger.js";
import "../../../packages/dile-selector/dile-selector.js";
import "../../../packages/dile-selector/dile-selector-item.js";
```

# dile-pages

This component can be used to display some content or other based on it's property values.

> The original idea comes from the Polymer catalog. If you known themm the short explanation would be "Simple iron-pages adaptation for Lit".

This custom element is used to show one of several "pages". The pages are the direct children elements of the component. In brief, this component only shows one of it's children elements, and is able to interchange the active children with a simple animation.

Note: **Be careful if you are using this component to display the main views of a big application**, because it **is not developed with lazy load in mind**. If you want to use lazy load for the diferent pages, it would be better to look for another solution.

## Installation

```bash
npm i @dile/dile-pages
```

## Usage

Import the component.

```javascript
  import '@dile/dile-pages/dile-pages.js';
```

Use the component.

```html
<dile-pages selected="1">
  <div> View 1</div>
  <div> View 2</div>
</dile-pages>
```

## Properties

You can use this properties to configure the current active page:

- **selected**: A string to select the active page.
- **attrForSelected** (optional): A string with the attribute name in the page elements to match with "selected" property.
- **selectorId** (optional): A property to link this component to a selector interface like [dile-tabs](https://github.com/Polydile/dile-components/tree/master/packages/dile-tabs) or [dile-selector](https://github.com/Polydile/dile-components/tree/master/packages/dile-selector).   The linked selector component also needs to have a selectorId attribute with the same value.
- **showDisplay** (optional): A display value to set to the element that is shown. Default is 'block';

> If you don't provide a value to attrForSelected property, "selected" will be matched to the index of the children element (selected=0 corresponds to the first page, selected=1 to the second... )

## Example

In the example bellow the active page will be the third: the div with the attribute ```name="page3"```.

```html
<dile-pages selected="page3" attrforselected="name">
  <div name="page1">
    <h2>Page 1</h2>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde excepturi atque, et quaerat vero saepe maiores, maxime dolore officiis earum cumque temporibus tenetur, possimus deserunt magni itaque! Reiciendis, assumenda quo?</p>
  </div>
  <div name="page2">
    <h2>Page 2</h2>
    <ul>
      <li>item 1</li>
      <li>item 2</li>
      <li>item 3</li>
    </ul>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde excepturi atque, et quaerat vero saepe maiores, maxime dolore officiis earum cumque temporibus tenetur, possimus deserunt magni itaque! Reiciendis, assumenda quo?</p>
  </div>
  <div name="page3">
    <h2>Page three</h2>
    <p>Just another page</p>
  </div>
</dile-pages>
```

The next example will show the third children, the div element with the H2 heading "Page three". 

```html
<dile-pages selected="2">
  <span>
    <h2>Page 1</h2>
  </span>
  <article>
    <h2>Page 2</h2>
  </article>
  <div>
    <h2>Page three</h2>
  </div>
</dile-pages>
```

Note in the previous code that you can use any tag as page.

## dile-pages demos

### Select pages with regular buttons

```js preview-story
class MyComponent extends LitElement {
  
  render() {
    return html`
      <p>
        <button id="showpage1">Show page 1</button>
        <button id="showpage2">Show page 2</button>
        <button id="showpage3">Show page 3</button>
      </p>
      <dile-pages selected="page1" attrforselected="name">
        <div name="page1">
          <h2>Page 1</h2>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde excepturi atque, et quaerat vero saepe maiores, maxime dolore officiis earum cumque temporibus tenetur, possimus deserunt magni itaque! Reiciendis, assumenda quo?</p>
        </div>
        <div name="page2">
          <h2>Page 2</h2>
          <ul>
            <li>item 1</li>
            <li>item 2</li>
            <li>item 3</li>
          </ul>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde excepturi atque, et quaerat vero saepe maiores, maxime dolore officiis earum cumque temporibus tenetur, possimus deserunt magni itaque! Reiciendis, assumenda quo?</p>
        </div>
        <div name="page3">
          <h2>Page three</h2>
          <p>Just another page</p>
        </div>
      </dile-pages>
    `
  }
  firstUpdated() {
    this.shadowRoot.getElementById('showpage1').addEventListener('click', () => {
      this.shadowRoot.querySelector('dile-pages').selected="page1";
    });
    this.shadowRoot.getElementById('showpage2').addEventListener('click', () => {
      this.shadowRoot.querySelector('dile-pages').selected="page2";
    });
    this.shadowRoot.getElementById('showpage3').addEventListener('click', () => {
      this.shadowRoot.querySelector('dile-pages').selected="page3";
    });
  }
}
customElements.define('my-component', MyComponent);
export const JsStory = () => html`<my-component></my-component>`;
```

### Select pages with tabs

```html preview-story
<dile-tabs selectorId="selector1">
  <dile-tab>One</dile-tab>
  <dile-tab>Two</dile-tab>
</dile-tabs>
<hr>
<dile-pages selectorId="selector1">
  <section name="one">
    <p>
      Page one...
    </p>
    Lorem ipsum...
  </section>
  <section name="two">
    <p>
      Page two...
    </p>
    Other page...
  </section>
</dile-pages>
```