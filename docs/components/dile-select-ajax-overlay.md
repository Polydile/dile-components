---
title: Select Ajax Overlay
package: '@dile/ui'
element: '&lt;dile-select-ajax-overlay&gt;'
status: stable
summary: Select component with API search results appearing in floating popup. Combines dile-select-ajax and dile-select-overlay functionality.
---

# dile-select-ajax-overlay

Same ability as [dile-select-ajax](/components/dile-select-ajax/) to search a configurable JSON API resource, but results appear directly in a floating popup as soon as they load, instead of populating a native `<select>` that then needs a second click to open. It covers the exact same properties, methods and events as `dile-select-ajax`, so the two are interchangeable — swap the tag name to change the UI without changing how you wire it up.

Internally it's built by composing [dile-select-overlay](/components/dile-select-overlay/) for the popup/picking UI (embedded with its trigger hidden), the same way `dile-select-ajax` composes `dile-select`.

## Alternative: dile-ajax-select-crud-overlay

If you need more advanced configuration options for your API requests, such as adding authentication tokens or custom headers, consider using [dile-ajax-select-crud-overlay](/crud/ajax-select-crud-overlay/) instead. Same relationship as `dile-select-ajax` → `dile-ajax-select-crud`, but for the overlay variant.

## Installation

```bash
npm i @dile/ui
```

## dile-select-ajax-overlay Usage

Import the component.

```javascript
import '@dile/ui/components/select/select-ajax-overlay.js';
```

Use the component.

```html
<dile-select-ajax-overlay
  id="select1"
  name="post_id"
  label="Post"
  displayProperty="title"
  endpoint="https://jsonplaceholder.typicode.com/posts"
  delay="500"
></dile-select-ajax-overlay>
```

## Properties

Same set as [dile-select-ajax](/components/dile-select-ajax/#properties), except **selectDefaultPlaceholder**: that property doesn't apply here — it existed to label the empty/default option inside the native `<select>` you had to click to open, but this component never shows an empty placeholder row, so there's nothing for it to label.

- **endpoint**: String, the URL of the API endpoint where the data will be fetched for the select options.
- **label**: String, the label text for the search field.
- **value**: String, the value selected by the user.
- **name**: String, the name attribute for the field, used in form submissions.
- **disabled**: Boolean, disables the field when set to `true`, preventing user interaction.
- **errored**: Boolean, indicates if the field has an error state, changing the appearance of the field to indicate an error.
- **data**: Array, the array of data options that populate the results popup. You should not use this property as the component can fetch the data using the endpoint.
- **placeholder**: String, the placeholder text shown when no option is selected and the user has not searched for anything.
- **emptyMessage**: String, the message displayed when there are no available options, usually because a search on the endpoint has returned no results.
- **selectedText**: String, the text shown when an option is selected. You should not use this property because it is assigned automatically when the user selects an option.
- **ajaxErrorMessage**: String, the message displayed when an error occurs during an AJAX request to fetch data.
- **ajaxError**: Boolean, indicates if there was an error in the AJAX request, typically used to show an error message or state.
- **queryStringVariable**: String, the name of the query string variable used when sending a request to the endpoint.
- **resultDataProperty**: String, specifies which property in the JSON response contains the data for the options. Leave blank if the JSON result directly contains the data array.
- **displayProperty**: String, the property in each data object used to display the option text.
- **idProperty**: String, the property in each data object used as the unique identifier for the options.
- **iconProperty**: String, the property in each data object holding a [dile-iconlib](/icons/dile-iconlib/) `family.name` icon string (e.g. `"lucide.house"`), shown next to that option. Leave unset if you don't need per-option icons.
- **icon**: String, a `family.name` icon string used as the default icon for every option that doesn't have its own via `iconProperty`.
- **delay**: Number, the debounce delay in milliseconds before making the request to the API endpoint as the user types.
- **opened**: Boolean, read-only state reflecting whether the results popup is currently open (delegates to the internal `dile-select-overlay`).
- **keyword**: String, state property that holds the current search keyword entered by the user.
- **loading**: Boolean, state property that indicates whether the component is currently loading data from the endpoint.
- **isSelected**: Boolean, a property that indicates whether an option has been selected.
- **static**: Boolean, when set to `true`, disables the search functionality and displays all options when the field is initialized. In this mode the internal `dile-select-overlay` shows its own regular trigger (there's no search field to open the popup from).
- **message**: A custom message to display.
- **hideErrorOnInput**: Hide error messages and error state if the user interacts with this component.
- **additionalQueryString**: Object with additional query string data to be placed in the request url.

## Methods

- **clear()**: Resets the field back to the unselected/search state.
- **set(value)**: Programmatically selects a value and fetches its display text from `${endpoint}/${value}`.
- **close()**: Closes the results popup.

## Events

- **element-changed**: This component implements [DileEmmitChangeMixin](/mixins/dile-emmit-change-mixin/), so `element-changed` is fired when the value property of the component changes.
- **dile-select-ajax-selected-text-changed**: This event is triggered when the selected element changes. The event detail includes the text of the selected element in the `selectedText` property.

## Accessibility

The search field has `role="combobox"`, `aria-haspopup="listbox"` and `aria-expanded`. Keyboard navigation (`ArrowUp`/`ArrowDown`/`Home`/`End`/`Enter`/`Escape`) is forwarded to the internal `dile-select-overlay` popup, which owns the `role="listbox"`/`role="option"` markup and highlight state — see [dile-select-overlay's accessibility section](/components/dile-select-overlay/#accessibility) for the full keyboard pattern.

Because the popup lives in a different shadow root than the search field (the trigger it's embedded under is hidden, not the field driving it), `aria-activedescendant` can't reliably point across that boundary. Instead, a visually-hidden `aria-live="polite"` region next to the field announces the currently highlighted option's text as you navigate with the keyboard, so screen reader users still get real-time feedback.

## dile-select-ajax-overlay demo

```html:preview
<script type="module">
import { LitElement, html, css } from 'lit';
import '@dile/ui/components/select/select-ajax-overlay.js';

class MyComponentOverlay extends LitElement {
  static get styles() {
    return css`
      :host {
        position: relative;
      }
      dile-select-ajax-overlay {
        z-index: 1;
      }
    `
  }

  render() {
    return html`
      <dile-select-ajax-overlay
        id="select1"
        name="country_id"
        label="Country"
        displayProperty="name"
        endpoint="https://timer.escuelait.com/api/countries"
        delay="500"
        queryStringVariable="keyword"
        resultDataProperty="data"
      ></dile-select-ajax-overlay>

      <p id="msg1">Select a value</p>
      <p style="font-size: 0.875rem;">Note that the API only has 30 countries, so the query results may be shorter than actual list of countries. Notice how the results appear as soon as they load — no extra click needed.</p>
    `
  }
  firstUpdated() {
    this.shadowRoot.getElementById('select1').addEventListener('element-changed', (e) => {
      let textElement = this.shadowRoot.getElementById('msg1');
      textElement.innerText = "The value selected is: " + e.detail.value;
    });
  }
}
customElements.define('my-component-overlay', MyComponentOverlay);
</script>
<my-component-overlay></my-component-overlay>
```
