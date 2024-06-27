---
title: Input Number Mask
tags: forms
---

# dile-input-number-mask

Web Component to create a customized input text in order to input numbers with a display format introuced by a mask.

```html
<dile-input-number-mask label="The label" placeholder="Type your telephone number" mask="00 000-00-00"></dile-input-number-mask>
```

## Install

```bash
npm install @dile/ui
```

## Usage

Import the component.

```javascript
import '@dile/ui/components/input/input-number-mask.js';
```

## Use the component

```html
<dile-input-number-mask
  name="Telephone"
  label="Text to the label"
  mask="00 000-00-00"
></dile-input-number-mask>
```

## Properties

- **mask**: The mask. The mask is provided in a format where all "0" chars are the numbers that the user should introduce. The other chars provided are the mask. 
- **maskedValue**: The value displayed in the input text. It will be the value introduced by the user with all mask characters.
- **value**: The value without the mask. If the number of charaters introduced in the value property is greater than the number of characters allowed by the mask, the value will be clipped.

## Mask examples:

- With the mask "00 000-00-00" and introducing the value "121234567", the maskedValue property will be "12 123-45-67".
- With the mask "0000 0000 0000 0000" and introducing the value '1111222233334444' the maskedValue will be '1111 2222 3333 4444'
- With the mask "*" and introducing any value the maskedValue will be "*"

This component inherits all the properties, events and styles from @dile/dile-input component. So, you can find more properties in the [dile-input](/components/dile-input) component and also many CSS custom properties to customize the component style.

The main diference between dile-input and dile-input-number-mask is that the text input always displays a number with the applied mask.

## dile-input-number-mask demos

### Telephone mask

```html:preview
<dile-input-number-mask 
  label="Telephone" 
  placeholder="Write your telephone" 
  mask="00 000-00-00"
></dile-input-number-mask>
```

### Bank account mask

```html:preview
<dile-input-number-mask 
  class="account" 
  label="Bank account" 
  placeholder="Write your bank account number" 
  mask="0000 0000 0000 0000"
></dile-input-number-mask>
```

### Input with a value preloaded

```html:preview
<dile-input-number-mask label="Value pre-loaded" 
  value="123456789"
  mask="0*00*0"
></dile-input-number-mask>
```