---
title: Phone Prefix Select
package: '@dile/utils'
element: '&lt;dile-phone-prefix-select&gt;'
status: stable
summary: Searchable select of international phone prefixes. Search by prefix digits or country name, in Spanish or English, with priority countries.
tags: forms
---

# dile-phone-prefix-select

Searchable select to choose an international phone prefix (`+34`, `+52`, `+1`...). It's based on [dile-select-search](/components/dile-select-search/), with the list of countries and their prefixes already included.

- Typing digits (`3`, `34`, `+34`) shows the countries whose prefix starts with them.
- Typing text (`spa`, `mexico`) searches the country names, ignoring case and accents.

The list has one option per country, but the value of the field is the **prefix**, which is what usually gets stored. The selected country is available in the `country` property.

## Installation

```bash
npm i @dile/utils
```

## Usage

Import the component.

```javascript
import '@dile/utils/components/phone-prefix-select/phone-prefix-select.js';
```

Use the component.

```html
<dile-phone-prefix-select name="phone_prefix" label="Phone prefix" language="es"></dile-phone-prefix-select>
```

## Value and country

Several countries share some prefixes: `+1` (United States, Canada, Puerto Rico...), `+7` (Russia, Kazakhstan), `+44` (United Kingdom, Guernsey, Jersey...) and a few more. That's why the component works with two properties:

- **value**: the prefix, like `"+1"`. It's the form value and the value of the `element-changed` event.
- **country**: the ISO code of the selected country, like `"CA"`.

How they are resolved:

- When the user picks a country, both `value` and `country` are set.
- When only `value` is set, the country is the main one for that prefix (`+1` → `US`, `+7` → `RU`, `+44` → `GB`).
- When `value` and `country` are set and the country has that prefix, that country is used (`value="+1" country="CA"` shows Canada). If the country doesn't match the prefix, it's ignored: `value` always wins.
- When only `country` is set, its prefix becomes the value.

The value can also be set without the `+` (`value="34"`), which is useful if the backend stores it that way. The component always emits prefixes with the `+`.

```html
<!-- Only the prefix is stored -->
<dile-phone-prefix-select value="+1"></dile-phone-prefix-select>

<!-- Prefix and country are stored -->
<dile-phone-prefix-select value="+1" country="CA"></dile-phone-prefix-select>
```

## Properties

| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `value` | `String` | `undefined` | The selected prefix, like `"+34"`. |
| `country` | `String` | `undefined` | ISO 3166-1 alpha-2 code of the selected country, like `"ES"`. |
| `language` | `String` | `"en"` | Language of the country names and default texts: `"es"` or `"en"`. |
| `priorityCountries` | `String` | `""` | ISO codes of the countries listed first, separated by `\|`. Example: `"ES\|MX\|AR"`. Exposed via `priority-countries`. |
| `prefixFirst` | `Boolean` | `false` | Shows the prefix before the country name (`"+34 Spain"` instead of `"Spain (+34)"`). Useful in narrow fields, where the end of the text gets cut. |
| `compact` | `Boolean` | `false` | Once a country is selected, shows only its prefix (`"+34"`) instead of the full text. The list keeps the full texts. Useful in narrow layouts. Screen readers still get the full text (`"Spain (+34)"`) as the accessible name of the field. |
| `name` | `String` | `undefined` | Name of the field, used in forms. |
| `label` | `String` | `undefined` | Label text for the field. |
| `placeholder` | `String` | Depends on `language` | Placeholder of the search field. |
| `emptyMessage` | `String` | Depends on `language` | Message shown when the search doesn't match any country. |
| `clearSelectionLabel` | `String` | Depends on `language` | Accessible name of the button that clears the selected country. |
| `clearSearchLabel` | `String` | Depends on `language` | Accessible name of the button that clears the text typed in the search field. |
| `showAllOnFocus` | `Boolean` | `false` | Shows every country as soon as the search field gets the focus. |
| `disabled` | `Boolean` | `false` | Disables the field. |
| `errored` | `Boolean` | `false` | Shows the field in the error state. |
| `message` | `String` | `undefined` | Message displayed below the field. |
| `hideErrorOnInput` | `Boolean` | `false` | Clears the error state and message when the user interacts with the field. |
| `selectedText` | `String` | `undefined` | Text of the selected country, like `"Spain (+34)"`. Assigned automatically. |

## Customization

Extend the component to change how the countries are displayed, overriding `formatOptionText(country)` for the list (it receives `{ iso, name, prefix, aliases }`) or `formatSelectedText(option)` for the selected country (it receives `{ value, text, prefix, names }`).

```javascript
import { DilePhonePrefixSelect } from '@dile/utils/components/phone-prefix-select/index.js';

class CompactPrefixSelect extends DilePhonePrefixSelect {
  formatOptionText(country) {
    return `${country.prefix} ${country.name}`;
  }
}
customElements.define('compact-prefix-select', CompactPrefixSelect);
```

The prefix data is also exported, for other uses: `PHONE_PREFIXES` (prefix by ISO code), `getPhonePrefix(iso)`, `getMainCountryForPrefix(prefix)`, `getPhonePrefixCountries(language)`, `normalizePhonePrefix(prefix)` and `splitPhoneNumber(phone)`, which splits an international number into `{ prefix, number }`.

## Methods

- **clear()**: Resets the field, clearing `value` and `country`.
- **set(value)**: Selects a prefix programmatically.
- **close()**: Closes the results popup.

## Events

- **element-changed**: Fired when the value changes. `detail` contains `{ name, value }`, where `value` is the prefix.
- **dile-phone-prefix-changed**: Fired when the prefix or the country changes. `detail` contains `{ value, country }`. Note that switching to another country with the same prefix (setting `country` from `"US"` to `"CA"`) changes `country` but not `value`, so only this event is fired.
- **dile-phone-prefix-select-selected-text-changed**: Fired when the value changes. `detail` contains the text of the selected country in `selectedText`.

```javascript
document.querySelector('dile-phone-prefix-select').addEventListener('dile-phone-prefix-changed', (e) => {
  console.log(e.detail.value, e.detail.country); // "+1" "CA"
});
```

## CSS Custom Properties

Same as [dile-select-search](/components/dile-select-search/#css-custom-properties). With `compact`, the field can be narrow while the list stays readable using `--dile-select-overlay-min-width`:

```html
<dile-phone-prefix-select compact prefixFirst style="width: 7rem; --dile-select-overlay-min-width: 16rem;"></dile-phone-prefix-select>
```

## dile-phone-prefix-select demos

### Basic usage

```html:preview
<script type="module">
  import '@dile/utils/components/phone-prefix-select/phone-prefix-select.js';
</script>
<dile-phone-prefix-select name="phone_prefix" label="Phone prefix"></dile-phone-prefix-select>
```

### Spanish with priority countries

```html:preview
<dile-phone-prefix-select language="es" priority-countries="ES|MX|AR" label="Prefijo" showAllOnFocus></dile-phone-prefix-select>
```

### Value and country

```html:preview
<script type="module">
  import { LitElement, html } from 'lit';

  class PhonePrefixEventsDemo extends LitElement {
    static properties = {
      value: { type: String },
      country: { type: String },
    };
    render() {
      return html`
        <dile-phone-prefix-select
          value="+1"
          country="CA"
          label="Phone prefix"
          @dile-phone-prefix-changed=${e => { this.value = e.detail.value; this.country = e.detail.country; }}
        ></dile-phone-prefix-select>
        <p>Value: ${this.value} / Country: ${this.country}</p>
      `;
    }
  }
  customElements.define('phone-prefix-events-demo', PhonePrefixEventsDemo);
</script>
<phone-prefix-events-demo></phone-prefix-events-demo>
```
