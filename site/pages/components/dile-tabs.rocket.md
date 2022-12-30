```js server
/* START - Rocket auto generated - do not touch */
export const sourceRelativeFilePath = 'components/dile-tabs.rocket.md';
import { layout } from '../recursive.data.js';
export { layout };
/* END - Rocket auto generated - do not touch */

export const title = 'dile-tabs';
```

```js script
import { html, css, LitElement } from 'lit'; 
import '@mdjs/mdjs-story/define';
import '@mdjs/mdjs-preview/define';
import "../../../packages/dile-menu-hamburger/dile-menu-hamburger.js";
import '../../../packages/dile-tabs/dile-tabs.js'
import "../../../packages/dile-tabs/dile-tab.js";
import "../../../packages/dile-pages/dile-pages.js";
import "../../../packages/dile-selector/dile-selector.js";
import "../../../packages/dile-selector/dile-selector-item.js";
```

# dile-tabs

Web Component to create easily a generic tabs interface.

In this package there are two components, to implement a singular tab item and a complete group of tabs. You could use this component with more complex component to create a navigation between several options. 

It is possible, for example, to use dile-tabs with a [dile-pages](/components), to change the view of the component when one tab is selected.

## Installation

```bash
npm i @dile/dile-tabs
```

## Usage

Import the component.

```javascript
<script type="module">
  import '@dile/dile-tabs/dile-tabs.js';
</script>
```

Use the component

```html
<dile-tabs selected="2">
  <dile-tab>One</dile-tab>
  <dile-tab>Two</dile-tab>
  <dile-tab>Three</dile-tab>
  <dile-tab>Four</dile-tab>
</dile-tabs>
```

## Properties

- **selected**: This property sets the currently selected tab of the interface. By default the selected value need to be an integer, specifying th index of the selected tab (starting at 0 for the first tab, 1 for the second...).
- **attrForSelected**: This property tells the ```<dile-tabs>``` component which attribute need to match the ```selected``` property to set the active tab. By default ```atrrForSelected``` is ```undefined```. In that case the ```selected``` property should be an integer and match to the index of the tab. If you set ```atrrForSelected``` with a value, then the ```selected``` property will be matched with the value of the attribute named in ```attrForSelected```.
- **selectorId** (optional): A property to link this component to a dile-pages component and change automaticaly the page when this component updates. The dile-pages component also needs to have a selectorId attribute with the same value.

## More complex example

The next example show how to use the attrForSelected property.

```html
<dile-tabs selected="posts" attrForSelected="name">
  <dile-tab name="users">Users</dile-tab>
  <dile-tab name="posts">Posts</dile-tab>
  <dile-tab name="articles">Articles</dile-tab>
  <dile-tab name="faq">FAQ</dile-tab>
  <dile-tab name="contact">Contact</dile-tab>
</dile-tabs>
```

## Events

### dile-selected-changed:

When ```selected``` property changes by a user interaction inside the ```<dile-tabs>``` component, it dispatch the ```dile-selected-changed``` custom event. You will recive the new selected value in the ```detail``` event object property.

## CSS custom properties

You can customize the tabs using the CSS custom properties bellow.

Custom property | Description | Default
----------------|-------------|---------
--dile-tab-text-color | The tab text color | #666
--dile-tab-background-color | The tab background color | Transparent
--dile-tab-selected-text-color | The tab text color | #fff
--dile-tab-selected-background-color | The tab background color | #039be5;
--dile-label-padding | Content padding of the tab | 8px 12px 6px 12px
--dile-tab-selected-line-height | Defines selected tab line height | 5px
--dile-tab-selected-line-color | Defines selected tab line color | #0070c0
--dile-tab-border-radius | Tab top-left & top-right border radius | 4px
--dile-tab-border | Unselected tab border | none
--dile-tab-selected-border | Selected tab border | none
--dile-tab-font-weight | Tab font weight | normal
--dile-tab-font-size | Tab font size | 1rem
--dile-tab-text-transform | Tab text transform | uppercase

## dile-tabs demo

### Simple Example 

In this example we are using the selected element index.

```js preview-story
class MyComponent extends LitElement {

  render() {
    return html`
      <dile-tabs id="select1">
        <dile-tab>One</dile-tab>
        <dile-tab>Two</dile-tab>
        <dile-tab>Three</dile-tab>
        <dile-tab>Four</dile-tab>
      </dile-tabs>
      <p id="msg1"></p>
    `
  }
  firstUpdated() {
    this.shadowRoot.getElementById('select1').addEventListener('dile-selected-changed', (e) => {
      let textElement = this.shadowRoot.getElementById('msg1');
      textElement.innerText = "The value selected is: " + e.detail.selected;
    });
  }
}
customElements.define('my-component', MyComponent);
export const JsStory = () => html`<my-component></my-component>`;
```

### Selection by name Example 

In this example we are using the selected ```name``` attribute in the dile-tab.

```js preview-story
class SecondComponent extends LitElement {

  static get styles() {
    return css`
      :host {
        --dile-tab-text-color: #ccc;
        --dile-tab-background-color: transparent;
        --dile-tab-selected-text-color: #396;
        --dile-tab-selected-background-color: transparent;
        --dile-tab-selected-line-color: #396;
      }
    `
  }

  render() {
    return html`
      <dile-tabs id="select2" attrForSelected="name" selected="users">
        <dile-tab name="users">Users</dile-tab>
        <dile-tab name="posts">Posts</dile-tab>
        <dile-tab name="articles">Articles</dile-tab>
      </dile-tabs>
      <p id="msg1">The value selected is: users</p>
    `
  }
  firstUpdated() {
    this.shadowRoot.getElementById('select2').addEventListener('dile-selected-changed', (e) => {
      let textElement = this.shadowRoot.getElementById('msg1');
      textElement.innerText = "The value selected is: " + e.detail.selected;
    });
  }
}
customElements.define('second-component', SecondComponent);
export const JsStory2 = () => html`<second-component></second-component>`;
```

### dile-tabs with dile-pages demo

Using dile-tabs in association with a dile-pages element.

```html preview-story
<style>
main.selectionlayout {
  display: flex; 
  flex-direction: column;
  row-gap: 1.8rem;
  --dile-tab-selected-background-color: #333;
  --dile-tab-background-color: #ddd;
  --dile-tab-border-radius: 0;
  --dile-tab-selected-line-color: orange;
  --dile-tab-selected-line-height: 3px;
  --dile-tab-selected-text-color: orange;
  --dile-tab-text-transform: none;
}
main.selectionlayout dile-tabs {
  margin-top: 0.4rem;
  width: 150px
}
main.selectionlayout dile-pages div {
  margin: 0;
  padding: 0;
}
main.selectionlayout dile-pages h2 {
  margin-top: 0;
}
</style>
<main class="selectionlayout">
  <dile-tabs id="select2" attrForSelected="name" selectorId="selector" selected="home">
    <dile-tab icon="label_important" name="home">Home</dile-tab>
    <dile-tab icon="label_important" name="about">About</dile-tab>
    <dile-tab icon="label_important" name="contact">Contact</dile-tab>
  </dile-tabs>
  <dile-pages attrForSelected="name" selectorId="selector" selected="home">
    <div name="home">
      <h2>Homepage</h2>
      <p>I am the home page content...</p>
    </div>
    <div name="about">
      <h2>About</h2>
      <p>I am the about page content...</p>
    </div>
    <div name="contact">
      <h2>Contact</h2>
      <p>I am the contact page content...</p>
    </div>
  </dile-pages>
</main>
```
