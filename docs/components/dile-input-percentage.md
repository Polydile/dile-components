---
title: Input Percentage
tags: forms
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

The same as [dile-input](/components/dile-input) and:

- **decimalSeparator**: introduces the decimal separator character. Default ".".

## dile-input-percentage demos

### Regular input

```html:preview
<dile-input-percentage name="tax_withholding" label="Tax withholding" placeholder="Tax withholding"></dile-input-percentage>
```

### Decimal separator ","

```html:preview
<dile-input-percentage decimalSeparator="," name="discount" label="Discount" placeholder="Discount"></dile-input-percentage>
```
