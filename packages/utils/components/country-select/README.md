# dile-country-select

Web component for selecting countries with support for multiple languages.

## Installation

```bash
npm install @dile/utils
```

## Usage

```html
<dile-country-select 
  name="country" 
  language="es"
  label="País">
</dile-country-select>
```

## Properties

- **value** (String): The ISO code of the selected country
- **name** (String): The name attribute of the select element
- **label** (String): Label for the field. If not provided, uses default based on language
- **language** (String): Language code ('es' or 'en'). Defaults to 'en'
- **errored** (Boolean): Whether the field has an error
- **message** (String): Error message to display
- **quietOnStart** (Boolean): Suppress validation on load. Defaults to false
- **hideErrorOnInput** (Boolean): Hide error message when user starts typing. Defaults to false
- **priorityCountries** (String): ISO codes of countries to show first, separated by `|`. Example: 'ES|US|FR'

## Events

- **country-changed**: Emitted when the country selection changes
  - detail: `{ value: 'US' }`

## Supported Languages

- **es**: Spanish
- **en**: English (default)

## Example

```html
<dile-country-select 
  id="countrySelect"
  name="country" 
  language="es"
  label="Seleccione su país"
  priority-countries="ES|MX|AR">
</dile-country-select>

<script>
  const select = document.querySelector('#countrySelect');
  select.addEventListener('country-changed', (e) => {
    console.log('Selected country:', e.detail.value);
  });
</script>
```

In this example, Spain (ES), Mexico (MX), and Argentina (AR) will appear at the top of the list in that order, followed by the rest of the countries sorted alphabetically.

## Styling

You can customize the component using CSS custom properties through the underlying `dile-select` component.
