---
title: Input Percentage
package: '@dile/ui'
element: '&lt;dile-input-percentage&gt;'
status: stable
summary: Percentage value input component extending dile-input. Validates and formats values with percentage symbol display.
tags: input
---

# dile-input-percentage

This component extends from [dile-input](/components/dile-input).

This component is customized to allow only to introduce integer or float percentage values. When the user introduces a value it is validated to suit this requirement. Also the component add a label to the right with a percentage symbol.

## Install

```bash
npm install @dile/ui
```

## Usage

Import the component.

```javascript
import '@dile/ui/components/input/input-percentage';
```

Use the component

```html
<dile-input-percentage
  name="discount"
  label="Discount"
></dile-input-percentage>
```

## Properties

The same as [dile-input](/components/dile-input) (including `accessibleLabel`) and:

- **decimalSeparator**: introduces the decimal separator character. Default ".".

## Value and events

The value is normalized to a number when the input loses focus, or by calling `doFormat()`. The `value` property is always a string using `.` as decimal separator (`"12.5"`), while the field shows `decimalSeparator`.

`element-changed` is dispatched once for each value change: while typing and, only if the normalization changes the value, once more on blur.

## Methods

- **doFormat()**: normalizes the current value. Non numeric values become `"0"`.

## dile-input-percentage demos

### Regular input

```html:preview
<dile-input-percentage name="tax_withholding" label="Tax withholding" placeholder="Tax withholding"></dile-input-percentage>
```

### Decimal separator ","

```html:preview
<dile-input-percentage decimalSeparator="," name="discount" label="Discount" placeholder="Discount"></dile-input-percentage>
```
