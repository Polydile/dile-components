---
title: Number Picker
tags: forms
---

# dile-number-picker

Web Component for selecting integer numbers.
Provides an input with buttons to increment/decrement the value and allows configuration for step, min, max, leading zeros formatting and digits display.

```html
<dile-number-picker></dile-number-picker>
```

> This component is based on another component called `dile-number-picker-element`, which is not currently documented. However, it might be useful if you need a more minimalistic input without labels or messages, for example, when integrating it as a data entry interface within other components.

## Installation

```bash
npm i @dile/ui
```

## Usage

Import the component.

```javascript
import '@dile/ui/components/number-picker/number-picker.js';
```

Use the component.

```html
<dile-number-picker
  value="10"
  step="5"
  min="0"
  max="100"
  digits="3"
  leadingZeros
></dile-number-picker>
```

## Properties

* **value**: The current value of the input.
* **step**: Defines the increment/decrement step. Default is `1`.
* **min**: Minimum allowed value. If no value is provided for this property, no minimum value will be enforced.
* **max**: Maximum allowed value. If no value is provided for this property, no maximum value will be enforced.
* **digits**: Number of digits to display (used with `leadingZeros`).
* **leadingZeros**: If true, the value will be formatted with leading zeros up to the defined digits.
* **disabled**: Disables the component and prevents user interaction.
* **focusOnStart**: When true, the input will get focus automatically after rendering.
* **name**: Name for the input to use in the form submits.
* **label**: Label displayed.
* **message**: Message displayed.
* **errored**: When `errored` is set to true the component shows an error state.
* **hideErrorOnInput**: Removes error state when the user interacts with the element changing it's value.


## Methods

* **focus()**: Focuses the input element.
* **clear()**: Clears the value and sets to `0`.
* **clearError()**: Clears the errored state.

## Events

- **dile-number-picker-value-changed**: Dispatched when the value changes.
  The event detail contains the new value (`Number`).

```javascript
numberPicker.addEventListener('dile-number-picker-value-changed', (e) => {
  console.log('New value:', e.detail);
});
```

- **element-changed**:  The ```element-changed``` event is dispatched when value on the input changes. In the event detail will emmit the element ```name``` and ```value```properties.


## Styling

| Custom property                            | Description                              | Default |
| ------------------------------------------ | ---------------------------------------- | ------- |
--dile-input-label-font-size | Font size for the label | 1em
--dile-input-label-color | Color for the label text | #59e
--dile-input-label-font-weight | Label text font weight | normal
--dile-input-label-margin-bottom | Label marging bottom | 4px
--dile-input-message-padding-top | Space from input to message | 4px
--dile-input-message-font-size | Message font size | 0.875rem
--dile-input-message-color | Message text color | #888
--dile-input-message-error-color | Message text color on errored state | #c00
--dile-number-picker-icon-size     | Size of the increment/decrement icons       | 16px           
--dile-number-picker-icon-color    | Color of the icons                          | #888           
--dile-number-picker-padding       | Padding inside the input                    | 0.15rem 0.25rem
--dile-number-picker-width         | Width of the input field                    | 48px           
--dile-input-border-radius         | Border radius of the input                  | 5px            
--dile-input-border-width          | Border width of the input                   | 1px            
--dile-input-border-color          | Border color of the input                   | #888           
--dile-input-font-size             | Font size of the input text                 | 1em            
--dile-input-background-color      | Background color of the input               | #fff           
--dile-input-color                 | Color of the input text                     | #303030        
--dile-input-error-border-color    | Border color when `errored` state is active | #c00           
--dile-input-disabled-border-color | Border color when the input is disabled     | #eee           


## dile-number-picker demos

### Regular component

```html:preview
<script type="module">
  import '@dile/ui/components/number-picker/number-picker.js';
</script>
<dile-number-picker></dile-number-picker>
```

### Disabled component

```html:preview
<dile-number-picker disabled></dile-number-picker>
```

### Leading zeros

```html:preview
<dile-number-picker leadingZeros value="6"></dile-number-picker>
```

### 3 digits with leading zeros and step 10

```html:preview
<dile-number-picker digits="3" leadingZeros step="10"></dile-number-picker>
```

### 3 digits with step 50 and focus on start

```html:preview
<dile-number-picker focusOnStart digits="3" step="50"></dile-number-picker>
```

### Min 3 max 6

```html:preview
<dile-number-picker min="3" max="6"></dile-number-picker>
```

### Min 0 max 24 with leading zeros and step 5

```html:preview
<dile-number-picker min="0" max="24" leadingZeros step="5" digits="2"></dile-number-picker>
```