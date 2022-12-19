# @dile/dile-rating

Web Component to create a rating interface with stars.

## Installation
```bash
npm i @dile/dile-rating
```

This component can display an interface to rating products, making ratings from 1 to 5 stars.

## Usage

Import the component.

```html
<script type="module">
  import '@dile/dile-rating/dile-rating.js';
</script>

Use the component.

```html
html`<dile-rating value="5"></dile-rating>`
```

### Properties

- **value**: Number from 0 to 5 to initialize rating interface. The default is 0, wich means an undefined rating. The component allows float values and rounds the value to the nearest posibility, between empty stars, half stars or complete stars.
- **disableChanges**: Boolean value to allow or not allow changing the rating value

### Events

- **dile-rating-selected**: the dile-rating-selected custom event occurs when the user selects a rating. The event detail has a "value" property to inform the new value.

### CSS Custom Properties

You can customize it using the same dile-button CSS Custom Properties but also:

Custom property | Description | Default
----------------|-------------|---------
--dile-rating-gap | Space between the stars | 0
--dile-star-color | Star color | #FFA41C
--dile-star-size | Star size | 32px
--dile-rating-undefined-color | Star color on undefined rating | #ddd
