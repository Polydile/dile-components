---
title: Input Phone
package: '@dile/utils'
element: '&lt;dile-input-phone&gt;'
status: stable
summary: Phone number input with an optional searchable selector of international prefixes. Produces E.164 values like +34600123456 and integrates with forms.
tags: input
---

# dile-input-phone

This component extends from [dile-input](/components/dile-input).

Phone number input made of a searchable selector of international prefixes ([dile-phone-prefix-select](/components/dile-phone-prefix-select/)) and a field for the number. The prefix selector is optional: use `noPrefix` when you only need the number.

To leave room for the number on small screens, the prefix selector is narrow and shows only the prefix once selected (`+34`), while its list of countries opens wider (`+34 Spain`). Screen readers get the country too: the accessible name of the selected prefix is the full text (`+34 Spain`).

It shows the numeric keyboard on mobile devices, lets the browser autocomplete the phone and only accepts the characters used to write phone numbers (digits, spaces, `+`, `-`, `(`, `)` and `.`).

## Installation

```bash
npm i @dile/utils
```

## Usage

Import the component.

```javascript
import '@dile/utils/components/input-phone/input-phone.js';
```

Use the component.

```html
<dile-input-phone name="phone" label="Phone" country="ES"></dile-input-phone>
```

## The value

The value depends on whether the prefix selector is used:

| Mode | User input | `value` |
| :--- | :--- | :--- |
| With prefix (default) | `+34` and `600 12 34 56` | `"+34600123456"` |
| With `noPrefix` | `600 12 34 56` | `"600123456"` |

- With prefix, the value is the international number in [E.164](https://en.wikipedia.org/wiki/E.164) format, without spaces: the standard way to store phone numbers, ready for `tel:` links or SMS services.
- The user can also type the full international number in the field (`+44 7700 900123` or `0044 7700 900123`). When leaving the field, the prefix is moved to the selector.
- If no prefix is selected, the value is just the typed digits. Set `country` to preselect a default prefix and avoid it.
- With `noPrefix`, the value is the typed number without spaces or separators. A leading `+` is kept.

When the value is set from outside (an attribute, `DileForm.setData()`...), an international value like `"+34600123456"` is split into the prefix and the number to display. International calling codes are designed so that none of them is the beginning of another, so the split is always unambiguous. For prefixes shared by several countries (`+1`, `+44`...), the current `country` is kept if it has that prefix; otherwise, the main country of the prefix is selected. Values that are not international are displayed as they are, without being rewritten.

### Prefix and number stored separately

When your backend stores the prefix and the number in separate fields, use two fields in your form:

```html
<dile-phone-prefix-select name="phone_prefix" label="Prefix"></dile-phone-prefix-select>
<dile-input-phone noPrefix name="phone_number" label="Phone"></dile-input-phone>
```

## Properties

Besides the [dile-input properties](/components/dile-input/#properties) (`label`, `name`, `value`, `placeholder`, `disabled`, `errored`, `message`, `hideErrorOnInput`...):

| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `noPrefix` | `Boolean` | `false` | Hides the prefix selector. The value is then the plain number. |
| `country` | `String` | `undefined` | ISO code of the country of the prefix, like `"ES"`. Set it to preselect a default prefix. It changes when the user picks another prefix. |
| `language` | `String` | `"en"` | Language of the prefix selector: `"es"` or `"en"`. |
| `priorityCountries` | `String` | `""` | ISO codes of the countries listed first in the prefix selector, separated by `\|`. Exposed via `priority-countries`. |
| `prefixPlaceholder` | `String` | `"Prefix"` / `"Prefijo"` | Placeholder of the prefix selector. |
| `prefix` | `String` | `undefined` | Read only. Prefix of the selected country, like `"+34"`. |
| `number` | `String` | `""` | Read only. Digits of the number, without the prefix. |

## Methods

- **isValid()**: Basic check of the value. Returns `true` for an empty value (implement your own "required" rule). With prefix, the value must be an international number with at least 4 digits after the prefix and up to 15 digits in total. With `noPrefix`, it must have between 4 and 15 digits. It doesn't check the numbering rules of each country.
- **clear()**: Empties the number and restores the initial `country`.
- **focus()**: Moves the focus to the number field.

## Events

- **element-changed**: Fired when the value changes. `detail` contains `{ name, value }`. The events of the internal prefix selector don't leave the component.

```javascript
document.querySelector('dile-input-phone').addEventListener('element-changed', (e) => {
  const phone = e.target;
  console.log(e.detail.value, phone.prefix, phone.number, phone.country, phone.isValid());
});
```

## CSS Custom Properties

Custom property | Description | Default
----------------|-------------|---------
--dile-input-phone-prefix-width | Width of the prefix selector | 6.5rem
--dile-input-phone-list-width | Minimum width of the list of countries, which can be wider than the prefix selector | 16rem
--dile-input-phone-gap | Space between the prefix selector and the number field | 0.5rem

The number field uses the [dile-input custom properties](/components/dile-input/#styling) and the prefix selector the ones of [dile-select-search](/components/dile-select-search/#css-custom-properties).

## dile-input-phone demos

### With a default country

```html:preview
<script type="module">
  import '@dile/utils/components/input-phone/input-phone.js';
</script>
<dile-input-phone name="phone" label="Phone" country="ES" placeholder="600 12 34 56"></dile-input-phone>
```

### Spanish with priority countries

```html:preview
<dile-input-phone language="es" priority-countries="ES|MX|AR" label="Teléfono"></dile-input-phone>
```

### Without prefix

```html:preview
<dile-input-phone noPrefix label="Phone" placeholder="600 12 34 56"></dile-input-phone>
```

### Value, parts and validation

```html:preview
<script type="module">
  import { LitElement, html } from 'lit';

  class InputPhoneDemo extends LitElement {
    static properties = {
      info: { type: String },
    };
    render() {
      return html`
        <dile-input-phone
          label="Phone"
          value="+447700900123"
          @element-changed=${this.changed}
        ></dile-input-phone>
        <p>${this.info}</p>
      `;
    }
    changed(e) {
      const phone = e.target;
      this.info = `Value: ${e.detail.value} / Prefix: ${phone.prefix} / Number: ${phone.number} / Valid: ${phone.isValid()}`;
    }
  }
  customElements.define('input-phone-demo', InputPhoneDemo);
</script>
<input-phone-demo></input-phone-demo>
```

### Styled

```html:preview
<style>
  .styled-phone {
    --dile-input-phone-prefix-width: 8rem;
    --dile-input-phone-list-width: 20rem;
    --dile-input-border-color: #39c;
  }
</style>
<dile-input-phone class="styled-phone" label="Phone" country="MX"></dile-input-phone>
```

### Errored

```html:preview
<dile-input-phone errored message="Invalid phone number" hideErrorOnInput label="Phone" country="ES"></dile-input-phone>
```
