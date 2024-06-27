---
title: Rating
tags: feedback
---

# dile-rating

Web Component to create a rating user interface with stars.

## Installation

```bash
npm i @dile/ui
```

This component can display an interface to rating products, making ratings from 1 to 5 stars.

## Usage

Import the component.

```javascript
import '@dile/ui/components/rating/rating.js';
```

Use the component.

```html
<dile-rating value="5"></dile-rating>
```

## Properties

- **value**: Number from 0 to 5 to initialize rating interface. The default is 0, wich means an undefined rating. The component allows float values and rounds the value to the nearest posibility, between empty stars, half stars or complete stars.
- **disableChanges**: Boolean value to allow or not allow changing the rating value

## Events

- **dile-rating-selected**: the dile-rating-selected custom event occurs when the user selects a rating. The event detail has a "value" property to inform the new value.

## CSS Custom Properties

You can customize it using the same dile-button CSS Custom Properties but also:

Custom property | Description | Default
----------------|-------------|---------
--dile-rating-gap | Space between the stars | 0
--dile-star-color | Star color | #FFA41C
--dile-star-size | Star size | 32px
--dile-rating-undefined-color | Star color on undefined rating | #ddd

## dile-rating demos

### Default rating user interface

```html:preview
<script type="module">
import { LitElement, html, css } from 'lit';
import '@dile/ui/components/rating/rating.js';

class MyComponent extends LitElement {

  render() {
    return html`
      <dile-rating id="rating1"></dile-rating>
      <p id="msg1"></p>
    `
  }
  firstUpdated() {
    let textElement = this.shadowRoot.getElementById('msg1');
    let rating = this.shadowRoot.getElementById("rating1");
    textElement.textContent = "The rating is " + rating.value;
    rating.addEventListener('dile-rating-selected', function(e) {
      textElement.textContent = "The rating is " + e.detail.value;
    });
  }
}
customElements.define('my-component', MyComponent);
</script>
<my-component></my-component>
```

## Disable changes implementation

```html:preview
<dile-rating id="rating2"  value="3" disableChanges></dile-rating>
```

## Styled rating

```html:preview
<style>
  .styled {
    --dile-star-color: #36c;
    --dile-star-size: 18px;
  }
</style>
<dile-rating id="rating2"  value="3" class="styled"></dile-rating>
```