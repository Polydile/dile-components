```js server
/* START - Rocket auto generated - do not touch */
export const sourceRelativeFilePath = 'components/dile-input-search.rocket.md';
import { layout } from '../recursive.data.js';
export { layout };
/* END - Rocket auto generated - do not touch */

export const title = 'dile-input-search';
```

```js script
import { html, css, LitElement } from 'lit'; 
import '@mdjs/mdjs-story/define';
import '@mdjs/mdjs-preview/define';
import '@dile/dile-input-search/dile-input-search.js'
import "@dile/dile-menu-hamburger/dile-menu-hamburger.js";
import "@dile/dile-selector/dile-selector.js";
import "@dile/dile-selector/dile-selector-item.js";
```

# dile-input-search

Web Component to create a **customized search input** with the tipical search icon and a clear search functionality. Also it provides a "delay" property to wait when a keystroke occurs and when a search is emitted.

This component **does not search anything by itself**. It's only a search user interface you may use to create a search functionality as you need. Instead of making a search **the component emits events** with a keyword to tell others that the user want to perform a search action.

## Installation

```bash
npm i @dile/dile-input-search
```

## Usage

Import the component.

```javascript
import '@dile/dile-input-search/dile-input-search.js';
```

Use the component.

```html
<dile-input-search></dile-input-search>
```

## Properties

- **delay**: Miliseconds the component waits between when a keystroke occurs and when a search keyword is emitted.
- **placeholder**: Placeholder text
- **keyword**: the text typed into the input search component
- **disabled**: The component is disabled

## Custom events

- **dile-input-search**: A search is performed with a new keyword. The event detail is an object like this:

```javascript
{
  keyword: "the text searched"
}
```

## CSS Custom Properties

You can customize it using CSS Custom Properties.

Custom property | Description | Default
----------------|-------------|---------
--dile-icon-color | Icon color | 0.5rem
--dile-icon-size | Icon size | 24px
--dile-input-width | Input element width | 100%
--dile-input-border-width | Input element border width | 1px
--dile-input-border-color | Input element border color | #888
--dile-input-border-radius | Input element border radius | 5px
--dile-input-font-size | Input element font size | 1em
--dile-input-line-height | Input element line height | 1.5em
--dile-input-color | Input text color | #303030
--dile-input-background-color | Color for the background input element | #fff
--dile-input-padding | Padding for the input text | 5px
--dile-input-placeholder-color | Placeholder color | #ccc
--dile-input-focus-border-color | Border color on focus state | #6af

## dile-input-search demos

### Default search input

```js preview-story
class MyComponent extends LitElement {
  static get styles() {
    return css`
      
    `
  }

  render() {
    return html`
      <dile-input-search id="search1"></dile-input-search>
      <p>
        <button id="clear">Clear</button>
      </p>
      <div id="message1">Message...</div>
    `
  }
  firstUpdated() {
    this.shadowRoot.getElementById('search1').addEventListener('dile-input-search', (e) => {
      let keyword = e.detail.keyword;
      keyword = keyword ? 'Search is performed. Keyword is: ' + keyword : 'The keyword is cleared';
      this.shadowRoot.getElementById('message1').innerText = keyword;
    });
    this.shadowRoot.getElementById('clear').addEventListener('click', () => {
      this.shadowRoot.getElementById('search1').clear();
    })
  }
}
customElements.define('my-component', MyComponent);
export const JsStory = () => html`<my-component></my-component>`;
```

### Styled search interface

```html preview-story
<style>
  .styled {
    --dile-input-border-radius: 0;
    --dile-input-border-color: #e553e3;
    --dile-input-border-width: 4px;
    --dile-input-line-height: 2.5rem;
    --dile-input-background-color: #333;
    --dile-input-placeholder-color: #999;
    --dile-input-color: #fff;
    --dile-input-width: 300px;
    --dile-icon-size: 32px;
    --dile-icon-color: #c923c6;
  }
</style>
<dile-input-search 
  id="search2"
  class="styled" 
  placeholder="Search..."
></dile-input-search>
```