---
title: Select Ajax
tags: forms
---

# dile-select-ajax

This component has the hability to search in a configurable JSON API resource to show the options returned by that resource on the ```<select>``` element.

The component make automatic server calls using Ajax to the URL configured by the ```endpoint``` attribute.

## Installation

To install dile-select-ajax component you have to install @dile/dile-select package.

```bash
npm i @dile/ui
```

## dile-select Usage

Import the component.

```javascript
import '@dile/ui/components/select/select-ajax.js';
```

Use the component.

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

## Properties

This component is not documented yet.

## Methods

Not documented

## Events

- **element-changed**: This component implements [DileEmmitChangeMixin](https://dile-components.polydile.com/mixins/dile-emmit-change-mixin/), so element-changed is fired when the value property of the component changes.

## dile-select-ajax demo

```html:preview
<script type="module">
import { LitElement, html, css } from 'lit';
import '@dile/ui/components/select/select-ajax.js';

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
        name="country_id"
        label="Country"
        displayProperty="name" 
        endpoint="https://timer.escuelait.com/api/countries"
        delay="500"
        queryStringVariable="keyword"
        resultDataProperty="data"
      ></dile-select-ajax>

      <p id="msg1">Select a value</p>
      <p style="font-size: 0.875rem;">Note that the API only has 30 countries, so the query results may be shorter than actual list of countries.</p>
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
</script>
<my-component></my-component>
```
