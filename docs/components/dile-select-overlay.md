---
title: Select Overlay
package: '@dile/ui'
element: '&lt;dile-select-overlay&gt;'
status: stable
summary: Accessible select alternative using custom overlay popup instead of native dropdown. Implements WAI-ARIA combobox pattern for styling control.
tags: forms
---

# dile-select-overlay

Accessible alternative to [dile-select](/components/dile-select/) that does not rely on the native `<select>` popup for its UI. Instead of opening the browser's own dropdown, it shows the options in a floating overlay panel built and styled by the component itself, following the WAI-ARIA APG "select-only combobox" pattern (a `role="combobox"` trigger button plus a `role="listbox"` popup).

Use it when you want full control over how the option list looks (custom styles, icons) while keeping the exact same public interface as `dile-select` — properties, methods and the `element-changed` event all match, so the two components are interchangeable in most cases.

Also used internally by [dile-select-ajax-overlay](/components/dile-select-ajax-overlay/), embedded with `hideTrigger` to provide its results popup.

## Installation

```bash
npm i @dile/ui
```

## dile-select-overlay Usage

Import the component.

```javascript
import '@dile/ui/components/select/select-overlay.js';
```

Use the component. Just like `dile-select`, it requires a native `<select>` in the `"select"` slot — that `<select>` is never shown to the user, it's only the declarative source of the available options (label, value, disabled) and keeps the component's form semantics.

```html
<dile-select-overlay name="select1" label="Selector">
  <select slot="select">
    <option value="1">Option 1</option>
    <option value="2">Option 2</option>
    <option value="3">Option 3</option>
  </select>
</dile-select-overlay>
```

## Icons

Options can show a leading icon from [dile-iconlib](/icons/dile-iconlib/), using its `family.name` string format (e.g. `"lucide.house"`, `"material.star"`). The icon appears both on the trigger (for the selected option) and next to each option in the popup, and is marked `aria-hidden="true"` so it doesn't interfere with the option's accessible name (still the option's text).

There are two ways to set it:

- **Per option**: add `data-icon="family.name"` to the individual `<option>`.
- **For the whole select**: add `data-icon="family.name"` to the `<select>` element itself — it's used as the default icon for every option that doesn't declare its own.

```html
<dile-select-overlay name="select1" label="Selector">
  <select slot="select">
    <option value="1" data-icon="lucide.house">Option 1</option>
    <option value="2" data-icon="material.star">Option 2</option>
    <option value="3">Option 3</option>
  </select>
</dile-select-overlay>
```

As with `dile-selector-item`'s equivalent icon support, you must import the specific icon module you use (e.g. `@dile/iconlib/lucide-icons/house.js`) — if it isn't imported/registered yet, a warning is logged to the console and the icon is skipped until it becomes available.

```html:preview
<script type="module">
  import '@dile/iconlib/lucide-icons/house.js';
  import '@dile/iconlib/material-icons/star.js';
  import '@dile/ui/components/select/select-overlay.js';
</script>
<dile-select-overlay name="select1" label="Selector with icons" value="2">
  <select slot="select">
    <option value="1" data-icon="lucide.house">Option 1</option>
    <option value="2" data-icon="material.star">Option 2</option>
    <option value="3">Option 3</option>
  </select>
</dile-select-overlay>
```

## Properties

- **disabled**: To disable the trigger.
- **errored**: To mark the trigger with an error border color.
- **label**: A label, associated with the trigger button.
- **name**: The name of the element.
- **value**: The value of the option selected.
- **message**: Place a message under the component.
- **hideErrorOnInput**: Hide the error message when the user selects a new option.
- **quietOnStart**: Do not emmit `element-changed` event on component start.
- **placeholder**: String, empty by default. Text shown on the trigger when no option is selected — most useful when the component is mounted before its options exist yet (e.g. composed by [dile-select-ajax-overlay](/components/dile-select-ajax-overlay/) in static mode).
- **hideTrigger**: Boolean, `false` by default. When `true`, the visible trigger button is hidden (though still present for popup positioning) and taken out of the tab order. Meant for components that compose `dile-select-overlay` and supply their own visible control — see `highlightedText` and `handleExternalKeydown()` below. [dile-select-ajax-overlay](/components/dile-select-ajax-overlay/) uses this to embed the options popup under its own search field.

## Methods

- **quietChange(value)**: Set the value of the component without emmiting a `element-changed` event.
- **clear()**: Set the value to `undefined`.
- **getOptionByValue(id)**: Returns the native `<option>` element matching a given value.
- **open() / close() / toggle()**: Open, close or toggle the options overlay (from the [DileOverlay mixin](/mixins/dile-overlay-mixin/)).

### Composition methods

These exist to let another component drive `dile-select-overlay` from an external control (used together with `hideTrigger`):

- **handleExternalKeydown(e)**: Runs the exact same keyboard-navigation logic used internally on the trigger (arrow keys, Home/End, Enter, Escape, typeahead) against a `KeyboardEvent` coming from somewhere else, e.g. an external search field.
- **highlightedText**: Read-only reactive property with the display text of the currently highlighted option, so an external consumer can announce it (e.g. in its own `aria-live` region) without reaching into this component's shadow root.

## Events

- **element-changed**: Dispatched when the value property changes. The detail object carries the `name` and `value` of the element.
- **overlay-opened** / **overlay-closed**: Bubble from the internal [DileOverlay mixin](/mixins/dile-overlay-mixin/) when the options popup opens or closes.

## Accessibility

`dile-select-overlay` implements the WAI-ARIA APG [Select-Only Combobox](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/examples/combobox-select-only/) pattern: the trigger has `role="combobox"`, `aria-haspopup="listbox"`, `aria-expanded` and `aria-controls`; the popup has `role="listbox"`; each option has `role="option"` and `aria-selected`; the highlighted option is tracked via `aria-activedescendant` on the trigger.

### Keyboard Navigation

- **Tab / Shift+Tab**: Move focus to and away from the trigger.
- **Enter / Space**: Opens the popup if closed; if open, selects the highlighted option and closes.
- **Arrow Down / Arrow Up**: Opens the popup (if closed) and moves the highlight to the next/previous option.
- **Home / End**: Opens the popup (if closed) and jumps the highlight to the first/last option.
- **Escape**: Closes the popup without changing the value.
- **Printable characters**: Typeahead — while the popup is open it moves the highlight to the next option starting with the typed characters; while closed it selects that option immediately, matching native `<select>` behavior.

### Screen Reader Support

- **Label Association**: The `label` attribute is associated with the trigger via `<label for>`.
- **Error Announcements**: Error messages are linked to the trigger via `aria-describedby`.
- **Invalid State**: When `errored` is `true`, the trigger receives `aria-invalid="true"`.
- **Status Updates**: Error messages use `role="status"` and `aria-live="polite"`.

### High Contrast Mode Support

Focus outlines and the arrow icon adapt to `forced-colors` mode, matching `dile-select`.

## CSS custom properties

The options popup always matches the trigger's width automatically (recalculated on open, scroll and resize), so there is no custom property to override its width.

Custom property | Description | Default
----------------|-------------|---------
--dile-select-font-size | Trigger font size | 0.875em
--dile-select-arrow-color | Arrow icon color | #303030
--dile-input-label-font-size | Font size for the label | 1em
--dile-input-label-color | Color for the label text | #59e
--dile-input-label-font-weight | Label text font weight | normal
--dile-input-label-margin-bottom | Label marging bottom | 4px
--dile-input-width | Trigger width | 100%
--dile-input-border-width | Trigger border width | 1px
--dile-input-border-color | Trigger border color | #888
--dile-input-border-radius | Trigger border radius | 5px
--dile-input-padding | Trigger padding | 7px 5px
--dile-input-color | Trigger and options text color | #303030
--dile-input-background-color | Trigger background color | #fff
--dile-input-focus-border-color | Trigger border on focus | #6af
--dile-input-error-border-color | Trigger border when errored | #c00
--dile-input-disabled-border-color | Trigger border when disabled | #eee
--dile-input-message-padding-top | Space from trigger to message | 4px
--dile-input-message-font-size | Message font size | 0.875em
--dile-input-message-color | Message text color | #888
--dile-input-message-error-color | Message text color on errored state | #c00
--dile-select-overlay-background-color | Options popup background color | #fff
--dile-select-overlay-color | Options popup text color | #303030
--dile-select-overlay-border-radius | Options popup border radius | 5px
--dile-select-overlay-max-height | Options popup max height before scrolling | 260px
--dile-select-overlay-box-shadow | Options popup box shadow | 0 4px 10px rgba(0, 0, 0, 0.15)
--dile-select-overlay-highlighted-background-color | Background color of the highlighted option | #eef6ff
--dile-select-overlay-option-icon-size | Size of an option's `dile-iconlib` icon (trigger and popup) | 16px
--dile-select-overlay-option-icon-color | Color of an option's `dile-iconlib` icon (trigger and popup) | currentColor

## dile-select-overlay demos

### Default dile-select-overlay

```html:preview
<script type="module">
import { LitElement, html, css } from 'lit';
import '@dile/ui/components/select/select-overlay.js';

class MyComponent extends LitElement {

  render() {
    return html`
      <dile-select-overlay id="select1" value="3">
        <select slot="select">
          <option value="1">Option 1</option>
          <option value="2">Option 2</option>
          <option value="3">Option 3</option>
        </select>
      </dile-select-overlay>
      <p id="msg1"></p>
    `
  }
  firstUpdated() {
    this.shadowRoot.getElementById('select1').addEventListener('element-changed', (e) => {
      let textElement = this.shadowRoot.getElementById('msg1');
      textElement.innerText = "The value selected is: " + e.detail.value;
    });
  }
}
customElements.define('my-component-select-overlay', MyComponent);
</script>
<my-component-select-overlay></my-component-select-overlay>
```

### Disabled

```html:preview
<dile-select-overlay disabled value="c">
  <select slot="select">
    <option value="a">Option a</option>
    <option value="b">Option b</option>
    <option value="c">Option c</option>
  </select>
</dile-select-overlay>
```

### Styled with label

```html:preview
<style>
  dile-select-overlay.styled {
    --dile-input-background-color: red;
    --dile-input-color: #fff;
  }
</style>
<dile-select-overlay label="Select one option" class="styled">
  <select slot="select">
    <option value="1">Option 1</option>
    <option value="2" disabled>Option 2</option>
    <option value="3">Option 3</option>
  </select>
</dile-select-overlay>
```

### Errored

```html:preview
<dile-select-overlay errored message="One message..." hideErrorOnInput>
  <select slot="select">
    <option value="1">Option 1</option>
    <option value="2">Option 2</option>
    <option value="3">Option 3</option>
  </select>
</dile-select-overlay>
```

### With dark background and custom arrow color

```html:preview
<style>
  dile-select-overlay.dark-bg {
    --dile-input-background-color: #2a2a2a;
    --dile-input-color: #fff;
    --dile-select-arrow-color: #fff;
    --dile-select-overlay-background-color: #2a2a2a;
    --dile-select-overlay-color: #fff;
    --dile-select-overlay-highlighted-background-color: #3f3f3f;
  }
</style>
<dile-select-overlay label="Dark select with white arrow" class="dark-bg">
  <select slot="select">
    <option value="1">Option 1</option>
    <option value="2">Option 2</option>
    <option value="3">Option 3</option>
  </select>
</dile-select-overlay>
```
