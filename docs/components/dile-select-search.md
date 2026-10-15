---
title: Select Search
package: '@dile/ui'
element: '&lt;dile-select-search&gt;'
status: stable
summary: Searchable select whose options come from a slotted native select. Filters as you type, in a floating popup, and integrates with forms.
tags: forms
---

# dile-select-search

Searchable select for a fixed set of options. Like [dile-select](/components/dile-select/), the options are declared through a `<select>` element in the `select` slot. Like [dile-select-ajax-overlay](/components/dile-select-ajax-overlay/), the user types in a search field and picks one of the matching options from a floating popup.

The filtering is done locally (no requests), so results appear instantly. It's a good fit for long but known lists: countries, phone prefixes, currencies, languages...

`dile-select-search` and `dile-select-ajax-overlay` share the same base class (`DileSelectSearchableBase`), so they look and behave the same way: same search field, keyboard navigation, read-only selected state with a clear button and form integration. Only the source of the options differs.

## Installation

```bash
npm i @dile/ui
```

## Usage

Import the component.

```javascript
import '@dile/ui/components/select/select-search.js';
```

Use the component, placing a `<select>` with all the options in the `select` slot.

```html
<dile-select-search name="country" label="Country" placeholder="Search a country...">
  <select slot="select">
    <option value="ES">España</option>
    <option value="PT">Portugal</option>
    <option value="FR">France</option>
  </select>
</dile-select-search>
```

The slotted `<select>` is never displayed: it's only read as the data source. Options added, removed or edited later are picked up automatically.

> **Note:** option values must be unique, just like in a native select. When several options share the same value, the component can't tell them apart and the first one is used to display the selected text.

## Properties

| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `label` | `String` | `undefined` | Label text for the field. |
| `value` | `String` | `undefined` | The value of the selected option. |
| `name` | `String` | `undefined` | Name of the field, used in forms. |
| `placeholder` | `String` | `"Search to choose..."` | Placeholder of the search field. |
| `emptyMessage` | `String` | `"No results found"` | Message shown when the search doesn't match any option. |
| `showAllOnFocus` | `Boolean` | `false` | Shows every option as soon as the search field gets the focus, before typing anything. Useful for short lists. |
| `delay` | `Number` | `0` | Debounce delay in milliseconds before filtering. Local filtering is fast, so it's usually not needed. |
| `disabled` | `Boolean` | `false` | Disables the field. |
| `errored` | `Boolean` | `false` | Shows the field in the error state. |
| `message` | `String` | `undefined` | Message displayed below the field. |
| `hideErrorOnInput` | `Boolean` | `false` | Clears the error state and message when the user interacts with the field. |
| `selectedText` | `String` | `undefined` | Text of the selected option. Assigned automatically, read it rather than setting it. |
| `isSelected` | `Boolean` | `false` | Read-only state, `true` when an option is selected. |

## Search customization

By default an option matches when its text contains the keyword anywhere, ignoring case and accents (`"espana"` matches `"España"`). To change it, extend the component and override `filterOption(option, keyword)`. It receives each option as `{ value, text, icon }` and returns a boolean.

```javascript
import { DileSelectSearch } from '@dile/ui/components/select/index.js';

class PrefixSelect extends DileSelectSearch {
  // Match by text or by value
  filterOption(option, keyword) {
    return super.filterOption(option, keyword) || option.value.startsWith(keyword);
  }
}
customElements.define('prefix-select', PrefixSelect);
```

## Option icons

As in [dile-select-overlay](/components/dile-select-overlay/#icons), use a `data-icon` attribute with a [dile-iconlib](/icons/dile-iconlib/) `family.name` icon string in each `<option>`, or in the `<select>` to set a default icon for all options. Remember to import the icons you use.

## Methods

- **clear()**: Resets the field back to the unselected/search state.
- **set(value)**: Selects a value programmatically. Its text is taken from the slotted options.
- **close()**: Closes the results popup.

## Events

- **element-changed**: This component implements [DileEmmitChangeMixin](/mixins/dile-emmit-change-mixin/), so `element-changed` is fired when the value changes. `detail` contains `{ name, value }`.
- **dile-select-search-selected-text-changed**: Fired when the value changes. `detail` contains the text of the selected option in `selectedText`.

## Slots

- **select**: a native `<select>` with the options available to search.

## CSS Custom Properties

The search field uses the same custom properties as [dile-select-ajax-overlay](/components/dile-select-ajax-overlay/), and the popup uses the `--dile-select-overlay-*` properties of [dile-select-overlay](/components/dile-select-overlay/#css-custom-properties).

## Accessibility

Same pattern as [dile-select-ajax-overlay](/components/dile-select-ajax-overlay/#accessibility): the search field is a `role="combobox"`, keyboard navigation (`ArrowUp`/`ArrowDown`/`Home`/`End`/`Enter`/`Escape`) is forwarded to the popup and a visually-hidden live region announces the highlighted option.

## dile-select-search demos

### Basic usage

```html:preview
<script type="module">
  import '@dile/ui/components/select/select-search.js';
</script>
<dile-select-search name="prefix" label="Phone prefix" placeholder="Type a prefix or a country...">
  <select slot="select">
    <option value="+34">+34 España</option>
    <option value="+351">+351 Portugal</option>
    <option value="+33">+33 France</option>
    <option value="+39">+39 Italia</option>
    <option value="+44">+44 United Kingdom</option>
    <option value="+49">+49 Deutschland</option>
    <option value="+52">+52 México</option>
    <option value="+54">+54 Argentina</option>
    <option value="+55">+55 Brasil</option>
    <option value="+1">+1 United States, Canada</option>
  </select>
</dile-select-search>
```

### Show all options on focus

```html:preview
<dile-select-search showAllOnFocus label="Language" placeholder="Choose a language...">
  <select slot="select">
    <option value="es">Español</option>
    <option value="en">English</option>
    <option value="fr">Français</option>
    <option value="pt">Português</option>
  </select>
</dile-select-search>
```

### Initial value and events

```html:preview
<script type="module">
  import { LitElement, html } from 'lit';

  class SelectSearchEventsDemo extends LitElement {
    static properties = {
      value: { type: String },
      text: { type: String },
    };
    render() {
      return html`
        <dile-select-search
          value="pt"
          label="Language"
          @element-changed=${e => this.value = e.detail.value}
          @dile-select-search-selected-text-changed=${e => this.text = e.detail.selectedText}
        >
          <select slot="select">
            <option value="es">Español</option>
            <option value="en">English</option>
            <option value="pt">Português</option>
          </select>
        </dile-select-search>
        <p>Value: ${this.value} / Text: ${this.text}</p>
      `;
    }
  }
  customElements.define('select-search-events-demo', SelectSearchEventsDemo);
</script>
<select-search-events-demo></select-search-events-demo>
```

### Errored

```html:preview
<dile-select-search errored message="This field is required" hideErrorOnInput label="Language">
  <select slot="select">
    <option value="es">Español</option>
    <option value="en">English</option>
  </select>
</dile-select-search>
```
