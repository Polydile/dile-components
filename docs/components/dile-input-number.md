---
title: Input Number
package: '@dile/ui'
element: '&lt;dile-input-number&gt;'
status: stable
summary: Numeric input component with decimal separator normalization. Supports min, max, step, and decimal positioning configuration.
tags: input
---

# dile-input-number

This component extends from [dile-input](/components/dile-input).

This component is customized to introduce numeric values while normalizing decimal separators. You can choose which separator you want to use and if the user types the alternative one, the component transforms it automatically.

`value` is always stored in canonical format using `.` as decimal separator. The `decimalSeparator` property only affects what users see in the input field.

## Install

```bash
npm install @dile/ui
```

## Usage

Import the component.

```javascript
import '@dile/ui/components/input/input-number';
```

Use the component

```html
<dile-input-number
  name="amount"
  label="Amount"
></dile-input-number>
```

## Properties

The same as [dile-input](/components/dile-input) and:

- **decimalSeparator**: introduces the decimal separator character to display and keep in the input value. Default ".".
- **allowNegative**: when true allows the minus sign at the beginning of the value. Default true.
- **min**: optional minimum value accepted by the component.
- **max**: optional maximum value accepted by the component.
- **step**: optional jump size to round values on blur. Default "any".
- **decimals**: optional number of decimal positions to keep on blur.
- **normalizeOn**: accepted values are "input" and "blur". "input" normalizes decimal separators while typing, and "blur" normalizes only when the input loses focus. Default "input". Any other value automatically falls back to "input".

## Custom style

By default, this input component aligns the input text to the right. If you want to align to the left you may use `--dile-input-number-text-align` CSS custom property.

## dile-input-number demos

### Regular number input

```html:preview
<dile-input-number name="amount" label="Amount" placeholder="12.75"></dile-input-number>
```

### Decimal separator ","

```html:preview
<dile-input-number decimalSeparator="," name="amount_eu" label="Importe" placeholder="12,75"></dile-input-number>
```

### Constraints with min, max, step and decimals

```html:preview
<dile-input-number min="1" max="10" step="0.25" decimals="2" name="range_amount" label="Range amount" placeholder="1.00 - 10.00"></dile-input-number>
```

### Normalize separator on blur

```html:preview
<dile-input-number decimalSeparator="," normalizeOn="blur" name="lazy_amount" label="Amount" placeholder="Write 12.75"></dile-input-number>
```