---
title: Selector
tags: menu
---

# dile-selector

Web Component to create easily a generic selector interface from one value between several posibilities.

This component is designed to be used in more complex components, specifically to create a navigation interface.

For example, it is possible to use dile-selector with a [dile-pages](/components/dile-pages) component, to change the view when the selected item changes.

## Installation

```bash
npm i @dile/ui
```

## Usage

Import the component.

```javascript
import '@dile/ui/components/selector/selector.js';
import '@dile/ui/components/selector/selector-item.js'; 
```

Use the component.

```html
<dile-selector selected="2">
  <dile-selector-item>One</dile-selector-item>
  <dile-selector-item>Two</dile-selector-item>
  <dile-selector-item>Three</dile-selector-item>
  <dile-selector-item>Four</dile-selector-item>
</dile-selector>
```

## Properties

- **selected**: This property sets the currently selected tab of the interface. By default the selected value need to be an integer, specifying th index of the selected tab (starting at 0 for the first tab, 1 for the second...).
- **attrForSelected**: This property tells the ```<dile-selector>``` component which attribute need to match the ```selected``` property to set the active tab. By default ```atrrForSelected``` is ```undefined```. In that case the ```selected``` property should be an integer and match to the index of the tab. If you set ```atrrForSelected``` with a value, then the ```selected``` property will be matched with the value of the attribute named in ```attrForSelected```.
- **selectorId** (optional): A property to link this component to a dile-pages component and change automaticaly the page when this component updates. The dile-pages component also needs to have a selectorId attribute with the same value.
- **hashSelection**: Boolean property. Connects the tabs component with the URL hash. When the component detects changes in the URL hash, it automatically changes its selected tab. Additionally, when a tab is selected, the component updates the URL hash.

## More complex example

The next example show how to use the attrForSelected property.

```html
<dile-selector selected="posts" attrForSelected="name">
  <dile-selector-item icon="navigate_next" name="users">Users</dile-selector-item>
  <dile-selector-item icon="navigate_next" name="posts">Posts</dile-selector-item>
  <dile-selector-item icon="navigate_next" name="articles">Articles</dile-selector-item>
  <dile-selector-item icon="navigate_next" name="faq">FAQ</dile-selector-item>
  <dile-selector-item icon="navigate_next" name="contact">Contact</dile-selector-item>
</dile-selector>
```

## Custom Events

- **dile-selected-changed**: When ```selected``` property changes by a user interaction inside the ```<dile-selector>``` component, it dispatch the ```dile-selected-changed``` custom event. You will recive the new selected value in the ```detail``` event object property.

## dile-selector-item

This component implements a selection option.

If you like to use it you need to import the component.

```javascript
import '@dile/ui/components/selector/dile-selector-item.js';
```

> The use of this component is not mandatory. If you like to create your own selector element, with a custom UI, we recomend to use the [dile-selector-mixin](/mixins/dile-selector-mixin/)

### Properties

- **selected**: make this option selected
- **icon**: Use an icon, from one of this posible values: "navigate_next", "arrow_forward", "star", "label_important", "add"
- **href**: Optional url to create a link to that url in the selector item

## CSS custom properties

You can customize the selector using the CSS custom properties bellow.

Custom property | Description | Default
----------------|-------------|---------
--dile-selector-padding-y | The padding top and bottom of the selection elements | 0.2rem
--dile-selector-padding-x | The padding left and right of the selection elements | 0.5rem
--dile-selector-background-color | The option background color | Transparent
--dile-selector-text-color | The option text color |  #000
--dile-selector-selected-text-color | The selected option text color | #fff
--dile-selector-selected-background-color | The selected option background color | #039be5;
--dile-selector-selected-font-weight | The selected option text font weight  | normal
--dile-selector-icon-color | Defines the icon color | --dile-selector-primary-color or #039be5
--dile-selector-selected-icon-color | Defines the icon color | --dile-selector-primary-color or #fff
--dile-selector-icon-size | Icon size | 20px
--dile-selector-text-decoration | Only for links when using href | none

## dile-selector demos

### Simple Example 

In this example we are using the selected element index.

```html:preview
<script type="module">
import { LitElement, html, css } from 'lit';

class MyComponent extends LitElement {

  render() {
    return html`
      <dile-selector id="select1">
        <dile-selector-item>One</dile-selector-item>
        <dile-selector-item>Two</dile-selector-item>
        <dile-selector-item>Three</dile-selector-item>
        <dile-selector-item>Four</dile-selector-item>
      </dile-selector>
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
</script>
<my-component></my-component>
```

### Selection by name Example 

In this example we are using the selected name item and one of the optional icons in the dile-selector-item.

```html:preview
<script type="module">
import { LitElement, html, css } from 'lit';

class SecondComponent extends LitElement {

  render() {
    return html`
      <dile-selector id="select2" attrForSelected="name">
        <dile-selector-item icon="navigate_next" name="users">Users</dile-selector-item>
        <dile-selector-item icon="navigate_next" name="posts">Posts</dile-selector-item>
        <dile-selector-item icon="navigate_next" name="articles">Articles</dile-selector-item>
        <dile-selector-item icon="navigate_next" name="faq">FAQ</dile-selector-item>
        <dile-selector-item icon="navigate_next" name="contact">Contact</dile-selector-item>
      </dile-selector>
      <p id="msg1"></p>
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
</script>
<second-component></second-component>
```

### dile-selector with dile-pages demo

Using dile-selector in association with a dile-pages element.

```html:preview
<style>
main.selectionlayout {
  display: flex; 
  column-gap: 1.8rem;
  --dile-selector-selected-background-color: #fc9;
  --dile-selector-selected-text-color: blue;
  --dile-selector-selected-icon-color: orange;
  --dile-selector-icon-color: #aaa;
  --dile-selector-selected-font-weight: bold;
}
main.selectionlayout dile-selector {
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
  <dile-selector id="select2" attrForSelected="name" selectorId="selector" selected="home">
    <dile-selector-item icon="label_important" name="home">Home</dile-selector-item>
    <dile-selector-item icon="label_important" name="about">About</dile-selector-item>
    <dile-selector-item icon="label_important" name="contact">Contact</dile-selector-item>
  </dile-selector>
  <dile-pages attrForSelected="name" selectorId="selector" selected="home">
    <div name="home">
      <h2>Homepage</h2>
      <p>I am the home page</p>
    </div>
    <div name="about">
      <h2>About</h2>
      <p>I am the about page</p>
    </div>
    <div name="contact">
      <h2>Contact</h2>
      <p>I am the contact page</p>
    </div>
  </dile-pages>
</main>
```
