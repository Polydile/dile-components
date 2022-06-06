# dile-select & dile-select-ajax

This component uses the native ```<select>``` element to create a dropdown select interface.

The diferences between the native ```<select>``` are:

- Accept a binding on value property
- Dispatch a "change" event on changes witch has "bubbles" and "compose" configuration
- Has some styles and can be styled with custom properties
- It is possible to create a label

## Installation

```bash
npm i @dile/dile-select
```

## dile-select Usage

Import the component.

```javascript
import '@dile/dile-select/dile-select.js';
```

Use the component.

```html
<dile-select id="select1">
  <select slot="select">
    <option value="1">Option 1</option>
    <option value="2">Option 2</option>
    <option value="3">Option 3</option>
  </select>
</dile-select>
```

### Properties

- **disabled**: To disable the select element
- **errored**: to mark the select element with a error border color
- **label**: A label
- **name**: the name of the element.
- **value**: the value of the option selected

## Events

### element-changed:

This event is dispatched when the value property changes. In the detail object the event emmits the name of the element an its value.

## CSS custom properties

You can customize the selector using the CSS custom properties bellow.

Custom property | Description | Default
----------------|-------------|---------
--dile-input-label-font-size | Font size for the label | 1em
--dile-input-label-color | Color for the label text | #59e
--dile-input-label-font-weight | Label text font weight | normal
--dile-input-label-margin-bottom | Label marging bottom | 4px
--dile-input-width | Select element width | 100%
--dile-input-border-width | Select element border width | 1px
--dile-input-border-color | Select element border color | #888
--dile-input-border-radius | Select element border radius | 5px
--dile-input-padding | Padding for the select | 5px
--dile-input-color | Input text color | #303030
--dile-input-font-size | Select element font size | 1em
--dile-input-background-color | Color for the background select element | #fff
--dile-input-focus-border-color | Input element border on focus | #6af
--dile-input-error-border-color | Input element border on errored property = true | #c00
--dile-input-disabled-border-color | Input element border when disabled | #eee

When ```--dile-input-background-color``` is configured to a dark color the component has the posibility to put a "dark" class in the ```<select>``` tag to create a drop icon with suficient contrast.

```html
<dile-select label="Select one option" class="styled">
  <select slot="select" class="dark">
    <option value="1">Option 1</option>
    <option value="2" disabled>Option 2</option>
    <option value="3">Option 3</option>
  </select>
</dile-select>
```

## dile-select-ajax usage

This component has the hability to search in a configurable JSON API resource to show select options of that resource.

Make server calls using Ajax tho the endpoint configured by attribute.

```html
<dile-select-ajax 
  name="post_id"
  label="Post"
  displayProperty="title" 
  endpoint="https://jsonplaceholder.typicode.com/posts"
  delay="500"
></dile-select-ajax>
```

This component is not documented yet.