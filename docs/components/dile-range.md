---
title: Range
tags: forms
---

# dile-range

Web Component to create a customizable range input slider.

The dile-range component is essentially an input `type="range"` element that allows you to add features such as custom styles, labels, messages, error states, and more. This ensures it can be used consistently alongside other form components in the Dile Components catalog.

## Installation

```bash
npm i @dile/ui
```

## Usage

Import the dile-range component.

```javascript
import '@dile/ui/components/range/range.js';
```

Use the component.

```html
<dile-range name="myrange"></dile-range>
```

### Properties

- **max**: Number, maximum value of the range input (default: 10).
- **min**: Number, minimum value of the range input (default: 0).
- **step**: Number, the step value for the range slider increments (default: 1).
- **value**: Number, the current value of the range input (default: 1).
- **name**: String, the name attribute for the range input.
- **label**: String, a label for the range input.
- **message**: String, a message to be displayed below the range input, typically used for help messages or errors.
- **errored**: Boolean, indicates if the input is in an error state. When true, the input will display an error status.
- **hideErrorOnInput**: Boolean, if true, the error state and message will be cleared when the input value changes.

### CSS Custom Properties

You can customize it using CSS Custom Properties.

Custom property | Description | Default
----------------|-------------|---------
--dile-range-line-color | Color of the slider track | --dile-primary-color or #7BB93D
--dile-range-line-height | Height of the slider track | 0.5rem
--dile-range-thumb-color | Color of the slider thumb | #303030
--dile-range-thumb-border-radius | Border radius of the slider thumb | 2rem
--dile-range-thumb-height | Height of the slider thumb | 1.5rem
--dile-range-thumb-width | Width of the slider thumb | 1.5rem
--dile-range-thumb-margin-top | Top margin of the slider thumb to align it with the track | -8px

## Events

- **input**: This element is base on a native input element. So, you can listen the native `input` event.

```javascript
rangeField.addEventListener('input', (e) => {
  console.log('input event named ', e.target.name, ' has value: ', e.target.value);
});
```

- **element-changed**: As other input elements in dile-components, `dile-range` emmits ```element-changed``` event is when value on the input changes. In the event detail will provide the element ```name``` and ```value```properties.

## dile-range demos

### Regular range

```html:preview
<script type="module">
  import '@dile/ui/components/range/range.js';
</script>
<dile-range name="myrange"></dile-range>
```

### Styled range

```html:preview
<style>
  .styled {
    --dile-range-thumb-color: rgb(243, 133, 55);
    --dile-range-thumb-height: 3rem;
    --dile-range-line-height: 1.5rem;
    --dile-range-thumb-width: 1rem;
    --dile-range-thumb-border-radius: 0.5rem;
    --dile-range-line-color: rgb(157, 122, 151);
    --dile-range-thumb-margin-top: -12px;
  }
</style>
<dile-range class="styled" name="otherrange"></dile-range>
```

### Dile range with label and error status

```html:preview
<dile-range 
  errored 
  hideErrorOnInput 
  message="Satisfaction incorrect" 
  label="Enter your satisfaction grade" 
  name="satisfaction"
></dile-range>
```