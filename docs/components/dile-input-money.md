---
title: Input Money
package: '@dile/ui'
element: '&lt;dile-input-money&gt;'
status: stable
summary: Currency input component extending dile-input. Validates and formats monetary values with customizable decimal separator support.
tags: input
---

# dile-input-money

This component extends from [dile-input](/components/dile-input).

This component is customized to allow only to introduce money values, with cents. So, when the user introduces a value it is validated and formated.

## Install

```bash
npm install @dile/ui
```

## Usage

Import the component.

```javascript
import '@dile/ui/components/input/input-money';
```

Use the component

```html
<dile-input-money
  name="Price"
  label="Price"
></dile-input-money>
```

> **Note:** like every `dile-input` derivative, it supports `accessibleLabel` to give the input an accessible name when there is no visible `label`. See [Labels in table-like forms](/components/dile-input/#labels-in-table-like-forms).

## Properties

The same as [dile-input](/components/dile-input) and:

- **decimalSeparator**: introduces the decimal separator character. Default ".".

## Custom style

By default, this input component aligns the input text to the right. if you want to align to the left you may use ```--dile-input-text-align``` CSS custom property.

## dile-input-money demos

### Regular input

```html:preview
<dile-input-money name="price" label="Price" placeholder="Price"></dile-input-money>
```

### Decimal separator ","

```html:preview
<dile-input-money decimalSeparator="," name="price" label="Importe" placeholder="Introduce el importe" disableAutocomplete></dile-input-money>
```