---
title: Country Select
tags: forms
---

# dile-country-select

Web Component for selecting countries with support for multiple languages, based on [dile-select](/components/dile-select) element.

Provides a pre-configured country list in Spanish and English with the ability to set priority countries at the top of the list for quick access.

## Installation

```bash
npm i @dile/utils
```

## Usage

Import the component.

```javascript
import '@dile/utils/components/country-select/country-select.js';
```

Use the component.

```html
<dile-country-select name="country" language="es"></dile-country-select>
```

## Localization

The component supports multiple languages through the `language` property:

```html
<!-- Spanish -->
<dile-country-select language="es"></dile-country-select>

<!-- English (default) -->
<dile-country-select language="en"></dile-country-select>
```

The language property controls:
- The label text (País / Country)
- The placeholder text (Selecciona un país / Select a country)
- The country names displayed in the list

## Properties

- **value**: The ISO code of the selected country
- **name**: The name attribute of the select element
- **label**: Custom label for the field. If not provided, uses default based on language
- **language**: Language code ('es' or 'en'). Defaults to 'en'
- **errored**: Boolean to indicate error state
- **message**: Error message to display
- **quietOnStart**: Suppress validation on load. Defaults to false
- **hideErrorOnInput**: Hide error message when user starts typing. Defaults to false
- **priorityCountries**: ISO codes of countries to show first, separated by `|`. Example: 'ES|US|FR'

## Events

- **country-changed**: Fired when the country selection changes
  - `event.detail.value`: The ISO code of the selected country

## CSS Custom Properties

This component inherits most custom properties from [dile-select](/components/dile-select). You can customize the styling using standard dile-select CSS custom properties.

## Examples

### Basic usage (English)

```html:preview
<script type="module">
  import '@dile/utils/components/country-select/country-select.js';
</script>
<dile-country-select name="country" language="en"></dile-country-select>
```

### Spanish version

```html:preview
<dile-country-select name="country" language="es"></dile-country-select>
```

### With custom label

```html:preview
<dile-country-select 
  name="country" 
  language="en"
  label="Choose your location">
</dile-country-select>
```

### With priority countries

```html:preview
<dile-country-select 
  name="country"
  language="en"
  priority-countries="US|GB|FR">
</dile-country-select>
```

In this example, United States (US), United Kingdom (GB), and France (FR) appear at the top of the list in that order, followed by a separator and the remaining countries.

### With default value

```html:preview
<dile-country-select 
  name="country"
  language="en"
  value="US">
</dile-country-select>
```

### With error state

```html:preview
<dile-country-select 
  name="country"
  language="en"
  errored
  message="Please select a country">
</dile-country-select>
```

### JavaScript integration

```javascript
const countrySelect = document.querySelector('dile-country-select');

// Listen for country changes
countrySelect.addEventListener('country-changed', (e) => {
  console.log('Selected country:', e.detail.value);
});

// Set value programmatically
countrySelect.value = 'ES';

// Check selected value
console.log(countrySelect.value);
```

## Supported Countries

The component includes a comprehensive list of countries in both Spanish and English:

- **Spanish version**: 245 countries with Spanish names
- **English version**: 245 countries with English names

Countries are identified by their ISO 3166-1 alpha-2 code.

## Notes

- When using `priority-countries`, a visual separator (dashes) is displayed between priority countries and the rest
- The component validates the ISO codes provided in `priority-countries` and silently ignores invalid ones
- The country list is alphabetically sorted, except when `priority-countries` is specified
