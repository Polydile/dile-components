---
title: Input Integer
tags: forms
---

# dile-input-integer

This component extends from [dile-input](/components/dile-input).

The main diference is that the ```dile-input-integer``` only allow to introduce integer values. So, when the user put the focus out the input, there is performed a validation and eventually the input changes it's contents to ensure has an integer value.

## Install

```bash
npm install @dile/ui
```

## Usage

Import the component.

```javascript
import '@dile/ui/components/input/input-integer';
```

Use the component

```html
<dile-input-integer
  name="units"
  label="Units"
></dile-input-integer>
```

## Custom style

By default, this input component aligns the input text to the right. if you want to align to the left you may use ```--dile-input-text-align``` CSS custom property.

## Further informations

All the properties, events, methods, custom properties, are the same. Please check [dile-input](/components/dile-input) for more information.

## dile-input-integer demo

### Regular integer input

```html:preview
<dile-input-integer name="quantity" label="Quantity" placeholder="Quantity"></dile-input-integer>
```

### Text align to the left

```html:preview
<style>
.alignleft {
  --dile-input-text-align: left;
}
</style>

<dile-input-integer class="alignleft" name="quantity" label="Quantity" placeholder="Quantity"></dile-input-integer>
```