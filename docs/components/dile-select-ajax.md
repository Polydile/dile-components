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

- **selectDefaultPlaceholder**: String, allows setting the text for the default option, which represents an empty option after the component has fetched some data.
- **endpoint**: String, the URL of the API endpoint where the data will be fetched for the select options.
- **label**: String, the label text for the select field.
- **value**: String, the value selected by the user in the select field.
- **name**: String, the name attribute for the select field, used in form submissions.
- **disabled**: Boolean, disables the select field when set to `true`, preventing user interaction.
- **errored**: Boolean, indicates if the field has an error state, changing the appearance of the select field to indicate an error.
- **data**: Array, the array of data options that populate the select field. You should not use this property as the component can fetch the data using the endpoint.
- **placeholder**: String, the placeholder text shown when no option is selected and the user has not searched for anything.
- **emptyMessage**: String, the message displayed when there are no available options in the select field, usually because a search on the endpoint has returned no results.
- **selectedText**: String, the text shown when an option is selected. You should not use this property because it is assigned automatically when the user selects an option.
- **ajaxErrorMessage**: String, the message displayed when an error occurs during an AJAX request to fetch data.
- **ajaxError**: Boolean, indicates if there was an error in the AJAX request, typically used to show an error message or state.
- **queryStringVariable**: String, the name of the query string variable used when sending a request to the endpoint.
- **resultDataProperty**: String, specifies which property in the JSON response contains the data for the select options. Leave blank if the JSON result directly contains the data array.
- **displayProperty**: String, the property in each data object used to display the option text in the select field.
- **idProperty**: String, the property in each data object used as the unique identifier for the options.
- **delay**: Number, the delay in milliseconds before making the request to the API endpoint, often used for search or filtering.
- **opened**: Boolean, state property that indicates whether the select dropdown is open.
- **keyword**: String, state property that holds the current search keyword entered by the user.
- **loading**: Boolean, state property that indicates whether the component is currently loading data from the endpoint.
- **isSelected**: Boolean, a property that indicates whether an option has been selected.
- **static**: Boolean, when set to `true`, disables the search functionality and displays all options when the select is initialized.
- **message**: A custom message to display.
- **hideErrorOnInput**: Hide error messages and error state if the user interacts with this component.
- **additionalQueryString**: Object with additional query string data to be placed in the request url.

## Methods

Not documented yet

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
