```js server
/* START - Rocket auto generated - do not touch */
export const sourceRelativeFilePath = 'components/dile-breadcrumbs.rocket.md';
import { layout } from '../recursive.data.js';
export { layout };
/* END - Rocket auto generated - do not touch */
```

```js script
import { html } from 'lit'; 
import '@mdjs/mdjs-story/define';
import '@mdjs/mdjs-preview/define';
import '../../../packages/dile-breadcrumbs/dile-breadcrumbs.js'
import "../../../packages/dile-menu-hamburger/dile-menu-hamburger.js";
```
# dile-breadcrumbs

Web Component to create a customized breadcrumbs interface.

## Installation

```bash
npm i @dile/dile-breadcrumbs
```

## Usage

Import the component.

```html
<script type="module">
  import '@dile/dile-breadcrumbs/dile-breadcrumbs.js';
</script>
```

You can use the component in two ways:

### 1) Use breadcrumbs providing a items array

```html
<dile-breadcrumbs items='[{"text": "Home", "href": "index.html"},{"text": "News", "href": "news.html"}]'></dile-breadcrumbs>
```

### 2) Use breadcrumbs providing a simple HTML markdown

```html
<dile-breadcrumbs>
  <dile-breadcrumbs-item href="/">Home</dile-breadcrumbs-item>
  <dile-breadcrumbs-item href="/news">News</dile-breadcrumbs-item>
  <dile-breadcrumbs-item>Lit course launched</dile-breadcrumbs-item>
</dile-breadcrumbs>
```

## Properties

### dile-breadcrumbs

- **separator**: The character or string that separate each item
- **items**: object array, where each item define the 'href' and the 'text' if you are using the ```items``` array, then the markup of the component with ```<dile-breadcrumbs-item>``` is ignored.

### dile-breadcrumbs-item

- **href**: Optional href for the links
- **name**: Optional name for the item. When the name property is used, the item dispays as a link, then, instead of navigate to the href location, the element dispatchs the custom event `dile-breadcrumbs-click`.

### Events

- **dile-breadcrumbs-click**: Custom event dispatched when the user click on a breadcrumb item that has a defined `name` property. You would use this event when you want to handle the click event on the breadcrumb item to do a custom navigation procedure, diferent to a regular link item.

## CSS Custom Properties

You can customize it using CSS Custom Properties.

Custom property | Description | Default
----------------|-------------|---------
--dile-breadcrumbs-separator-width | Space between the separator and the text |  0.5rem 
--dile-breadcrumbs-text-decoration | Text decoration for the links | none
--dile-breadcrumbs-text-color | Text color for the separator and items that hasn't got links |  #303030
--dile-breadcrumbs-font-size | Checked color for check control | 1rem
--dile-breadcrumbs-link-color | Color for the links | #39c

## Breadcrumbs demo

### Regular breadcrumbs created with markdown

```html preview-story
<dile-breadcrumbs>
  <dile-breadcrumbs-item href="/">Home</dile-breadcrumbs-item>
  <dile-breadcrumbs-item href="/components/">Components</dile-breadcrumbs-item>
  <dile-breadcrumbs-item>dile-breadcrumbs</dile-breadcrumbs-item>
</dile-breadcrumbs>
```

### Regular breadcrumbs created with JSON

```html preview-story
<dile-breadcrumbs items='[{"text": "Home", "href": "/"},{"text": "How to use", "href": "/how-to-use"}]'></dile-breadcrumbs>
```

### Styled breadcrumbs and custom separator

```html preview-story
<style>
  .styled {
    --dile-breadcrumbs-separator-width: 1rem; 
    --dile-breadcrumbs-text-decoration: underline;
    --dile-breadcrumbs-link-color:  #cc5099;
    --dile-breadcrumbs-font-size: 1.3rem;
  }
</style>
<dile-breadcrumbs
  items='[
    {"text": "Home EscuelaIT", "href": "https://escuela.it"},
    {"text": "Courses", "href": "https://escuela.it/cursos"},
    {"text": "Lit Course"}
  ]'
  separator="»"
  class="styled"
></dile-breadcrumbs>
```

### Breadcrumbs without href created with JSON

Is also posible to create breadcrumbs without href attribute. In this case you can name the breadcrumbs sections you want and listen to ```dile-breadcrumbs-click``` events to receibe the name of the item clicked.

```js preview-story
import { LitElement } from 'lit';

class MyComponent extends LitElement {
  render() {
    return html`
      <dile-breadcrumbs id="named" items='[{"text": "Home", "name": "home"},{"text": "Articles", "name": "articles"},{"text": "Not named"}]'></dile-breadcrumbs>
      <p style="margin-bottom: 0">
        Click on any breadcrumb section
      </p>
    `;
  }
  firstUpdated() {
    this.shadowRoot.getElementById('named').addEventListener(
      'dile-breadcrumbs-click', 
      (e) => this.shadowRoot.querySelector('p').innerText = 'You have clicked on ' + e.detail.name
    )
  }
}
customElements.define('my-component', MyComponent);
export const JsStory = () => html`<my-component></my-component>`;
```