---
title: Input Suggestions
package: '@dile/ui'
element: '&lt;dile-input-suggestions&gt;'
status: stable
summary: Free text field that shows suggestions while typing (editable combobox). The value is always the typed text; choosing a suggestion emits the whole object.
tags: forms
---

# dile-input-suggestions

Free text field with a list of suggestions that appears while the user types. It follows the WAI-ARIA APG editable combobox ("list autocomplete") pattern: the value of the field is **always the typed text**, and choosing a suggestion copies its text into the field and emits `dile-input-suggestions-selected` with the whole object, so you decide what to do with it.

Use it when the user can type anything but you want to help with known values (product names, cities, previous concepts...). If the user must choose one of the values, use [dile-select-search](/components/dile-select-search/) or [dile-select-ajax-overlay](/components/dile-select-ajax-overlay/) instead.

The suggestions list is a [dile-select-overlay](/components/dile-select-overlay/) anchored to the field, so it shares its keyboard behavior, styles and CSS parts.

There is an Ajax variant, [dile-ajax-input-suggestions](/crud/ajax-input-suggestions/), in `@dile/crud`.

## Installation

```bash
npm i @dile/ui
```

## Usage

Import the component.

```javascript
import '@dile/ui/components/input-suggestions/input-suggestions.js';
```

Use the component, giving it the suggestions as an array of objects. They are filtered by `displayProperty`, ignoring case and accents.

```html
<dile-input-suggestions
  name="concept"
  label="Concept"
  .suggestions=${[{ id: 1, name: 'Web hosting' }, { id: 2, name: 'Domain name' }]}
></dile-input-suggestions>
```

`suggestions` can also be a function `(keyword) => array | Promise<array>` that decides what to return for the typed text.

```html:preview
<script type="module">
  import '@dile/ui/components/input-suggestions/input-suggestions.js';
  const field = document.getElementById('suggestionsDemo');
  field.suggestions = [
    { id: 1, name: 'Web hosting' },
    { id: 2, name: 'Domain name' },
    { id: 3, name: 'Domain renewal' },
    { id: 4, name: 'Maintenance' },
  ];
  field.addEventListener('dile-input-suggestions-selected', (e) => {
    document.getElementById('suggestionsDemoOutput').textContent = JSON.stringify(e.detail.item);
  });
</script>
<dile-input-suggestions id="suggestionsDemo" name="concept" label="Concept" minLength="1" delay="100"></dile-input-suggestions>
<p>Chosen suggestion: <span id="suggestionsDemoOutput">-</span></p>
```

## Keyboard

- **Arrow down / up**: move through the suggestions (Home / End go to the first and last).
- **Enter**: chooses the suggestion highlighted with the keyboard. Without one, the typed text stays and the list closes.
- **Escape**: closes the list without changing the text.

Only suggestions highlighted with the keyboard are chosen with Enter, never the one under the mouse pointer.

## Properties

- **name**: String, name of the field (form integration, it is form-associated).
- **value**: String, the typed text.
- **label**: String, visible label.
- **accessibleLabel**: String, accessible name when there is no visible label.
- **placeholder**: String, placeholder of the field.
- **disabled**, **errored**, **message**, **hideErrorOnInput**: same as `dile-input`.
- **suggestions**: Array of objects, or function `(keyword) => array | Promise<array>`.
- **displayProperty**: String (default `"name"`), property of the suggested object copied into the field.
- **getOptionText**: Function `(item) => string`, optional text of each suggestion. It is also its accessible name.
- **minLength**: Number (default `2`), minimum characters to show suggestions.
- **delay**: Number (default `300`), milliseconds to wait after the last keystroke.
- **optionRenderer**: Function `(item, index) => TemplateResult | string`, optional template for each suggestion, receiving the original object.
- **optionParts**: String, extra part names used inside `optionRenderer`, re-exported to style them with `::part()`.
- **resultsAnnouncement**: Function `(count) => string`, text announced to screen readers when suggestions appear (default `"N suggestions available"`).

## Methods

- **focus()**: focuses the text field.
- **clear()**: empties the field and the suggestions.
- **clearError()**: removes the error state and message.

## Events

- **element-changed**: when the text changes. `detail: { name, value }`.
- **dile-input-suggestions-selected**: when a suggestion is chosen. `detail: { name, item }`.

## Slots

- **prefix** / **suffix**: content inside the field border, before or after the text (e.g. an icon button).

Give an accessible name to interactive content (like an icon button), and hide decorative icons from screen readers with `aria-hidden="true"`.

```html
<dile-input-suggestions name="concept" label="Concept">
  <span slot="prefix" aria-hidden="true"><dile-lucide-icon-tag></dile-lucide-icon-tag></span>
  <button type="button" slot="suffix" aria-label="Search in the catalog" @click=${this.openCatalog}>
    <dile-lucide-icon-search></dile-lucide-icon-search>
  </button>
</dile-input-suggestions>
```

## Extending

`DileInputSuggestionsBase` (exported from `@dile/ui/components/input-suggestions/index.js`) holds the behavior. Subclasses implement `loadData()`, which gets the suggestions for `this.keyword` and calls `this.setResults(data, requestId)`. It also offers extension points, used by [dile-input-tags](/components/dile-input-tags/): `renderBeforeField()`, `renderFieldEnd()`, `filterResults(data)`, `onEnterWithoutSuggestion(e)` and `selectItem(item)`.

## Styling

The field uses the usual `--dile-input-*` custom properties and the list the `--dile-select-overlay-*` ones. Besides:

Custom property | Description | Default
----------------|-------------|---------
--dile-input-suggestions-min-width | Minimum width of the suggestions list when the field is narrower | 16rem
--dile-input-suggestions-margin-bottom | Bottom margin of the component | 10px

The `option`, `option-highlighted`, `option-selected` and `option-content` parts of the list are exposed by the component.
