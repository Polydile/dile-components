---
title: Range
tags: forms
---

# dile-range

Web Component to create a customized range input.

## Installation

```bash
npm i @dile/ui
```

## Usage

Import the dile-range component.

Work in progress, not documented...

```javascript
import '@dile/ui/components/range/range.js';
```

Use the component.

```html
<dile-range></dile-range>
```

### Properties

- **max**
- **min**
- **value**
- **step**
- **name**: The name of the range

### CSS Custom Properties

You can customize it using CSS Custom Properties.

Custom property | Description | Default
----------------|-------------|---------
To do documentation | |

## Events

- **input**: This element is base on a native input element. So, you can listen the native `input` event.

```javascript
rangeField.addEventListener('input', (e) => {
  console.log('input event named ', e.target.name, ' has value: ', e.target.value);
});
```

- **element-changed**: As other input elements in dile-components, dile-range emmits ```element-changed``` event is when value on the input changes. In the event detail will provide the element ```name``` and ```value```properties.

## dile-range demos

### Regular range

```html:preview
<script type="module">
  import '@dile/ui/components/range/range.js';
</script>
<dile-range></dile-range>
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
<dile-range class="styled"></dile-range>
```
