---
title: Wheel Picker
package: '@dile/ui'
element: '&lt;dile-wheel-picker&gt;'
status: experimental
summary: Touch-friendly scrolling list where the centered item is the selected value. Supports keyboard, mouse wheel, click and disabled items.
tags: forms
---

# dile-wheel-picker

Web Component to select a value by scrolling a list, like the wheel pickers of mobile operating systems. The item that stays in the central band is the selected one. It works with touch drag, mouse wheel, click and keyboard, and several pickers can be placed side by side to build compound selectors (for example month and year).

## Installation

```bash
npm i @dile/ui
```

## Usage

Import the component.

```javascript
import '@dile/ui/components/wheel-picker/wheel-picker.js';
```

Use the component and set its items with JavaScript.

```html
<dile-wheel-picker id="size" name="size" label="Size"></dile-wheel-picker>
<script>
  const picker = document.getElementById('size');
  picker.items = ['Small', 'Medium', 'Large'];
  picker.value = 'Medium';
</script>
```

## Items

The `items` property accepts an array of strings or numbers, or an array of objects with this shape:

```javascript
picker.items = [
  { value: 0, label: 'January' },
  { value: 1, label: 'February', disabled: true },
];
```

- **value**: the value assigned to the component when the item is selected.
- **label**: the visible text. Defaults to the value.
- **disabled**: the item is shown but can't be selected. Scrolling onto it moves to the nearest enabled item.

Values are compared as strings, so `value="3"` set as an attribute matches an item with `value: 3`.

## Properties

| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `items` | `Array` | `[]` | Items to choose from (strings, numbers or `{ value, label, disabled }` objects). |
| `value` | `any` | `undefined` | Value of the selected item. Setting it scrolls the list to that item without dispatching events. |
| `visibleItems` | `Number` | `5` | Number of visible rows. Even numbers are rounded up to the next odd number so one row is always centered. Exposed via `visibleitems`. |
| `label` | `String` | `""` | Accessible label of the list. |
| `name` | `String` | `undefined` | Name sent in the event details, useful inside forms. |
| `disabled` | `Boolean` | `false` | Disables the interaction with the picker. |

The read-only getter `selectedItem` returns the normalized item of the current value. Calling `focus()` on the element moves the focus to the list.

## Events

- **dile-wheel-picker-changed**: Dispatched when the user changes the selected value. `detail` contains `{ name, value, item }`, where `item` is the normalized selected item.
- **element-changed**: Dispatched at the same time, with `detail` `{ name, value }`, so the component works with the [DileForm mixin](/mixins/dile-form-mixin/).

No event is dispatched when `value` is set programmatically.

```javascript
picker.addEventListener('dile-wheel-picker-changed', (e) => {
  console.log(e.detail.value, e.detail.item.label);
});
```

## CSS Custom Properties

Custom property | Description | Default
----------------|-------------|---------
--dile-wheel-picker-width | Component width | auto
--dile-wheel-picker-item-height | Height of each row | 40px
--dile-wheel-picker-font-size | Font size of the items | 1.25rem
--dile-wheel-picker-text-color | Color of the items | #888
--dile-wheel-picker-selected-text-color | Color of the centered item | --dile-on-background-color or #303030
--dile-wheel-picker-band-background-color | Background of the central selection band | rgba(90, 90, 90, 0.1)
--dile-wheel-picker-band-border-radius | Border radius of the band | 8px
--dile-wheel-picker-item-justify-content | Horizontal alignment of the items | center
--dile-wheel-picker-focus-color | Outline of the band when the list has keyboard focus | --dile-focus-border-color or #6af

## Accessibility

The list has `role="listbox"` and is focusable; the items have `role="option"` and `aria-selected`. Use the `label` property to name the list. Keyboard support:

- **Arrow Up / Arrow Down**: previous / next enabled item.
- **Page Up / Page Down**: jump as many items as visible rows.
- **Home / End**: first / last enabled item.

## dile-wheel-picker demos

### Basic usage

```html:preview
<script type="module">
  import '@dile/ui/components/wheel-picker/wheel-picker.js';
  const picker = document.getElementById('wheelsize');
  picker.items = ['Small', 'Medium', 'Large', 'Extra large', 'XXL'];
  picker.value = 'Medium';
</script>
<dile-wheel-picker id="wheelsize" name="size" label="Size"></dile-wheel-picker>
```

### Month and year columns

```html:preview
<script type="module">
  import { LitElement, html, css } from 'lit';

  class MonthYearWheelDemo extends LitElement {
    static styles = css`
      .columns {
        display: flex;
        gap: 0.5rem;
        max-width: 360px;
        padding: 1rem;
        background-color: #f2f3f7;
        border-radius: 12px;
      }
      dile-wheel-picker {
        flex: 1;
      }
    `;
    static properties = { month: { type: Number }, year: { type: Number } };

    constructor() {
      super();
      const today = new Date();
      this.month = today.getMonth();
      this.year = today.getFullYear();
      const format = new Intl.DateTimeFormat('en', { month: 'long' });
      this.months = Array.from({ length: 12 }, (_, i) => ({ value: i, label: format.format(new Date(2000, i, 1)) }));
      this.years = Array.from({ length: 201 }, (_, i) => this.year - 100 + i);
    }

    render() {
      return html`
        <div class="columns">
          <dile-wheel-picker label="Month" .items=${this.months} .value=${this.month}
            @dile-wheel-picker-changed=${(e) => (this.month = e.detail.value)}></dile-wheel-picker>
          <dile-wheel-picker label="Year" .items=${this.years} .value=${this.year}
            @dile-wheel-picker-changed=${(e) => (this.year = e.detail.value)}></dile-wheel-picker>
        </div>
        <p>Selected: ${this.months[this.month].label} ${this.year}</p>
      `;
    }
  }
  customElements.define('month-year-wheel-demo', MonthYearWheelDemo);
</script>
<month-year-wheel-demo></month-year-wheel-demo>
```

### Disabled items

```html:preview
<script type="module">
  const picker = document.getElementById('wheelweekday');
  picker.items = [
    { value: 'mon', label: 'Monday' },
    { value: 'tue', label: 'Tuesday' },
    { value: 'wed', label: 'Wednesday', disabled: true },
    { value: 'thu', label: 'Thursday' },
    { value: 'fri', label: 'Friday' },
    { value: 'sat', label: 'Saturday', disabled: true },
  ];
  picker.value = 'tue';
</script>
<dile-wheel-picker id="wheelweekday" label="Weekday" visibleItems="3"></dile-wheel-picker>
```

### Styled

```html:preview
<style>
  .styled-wheel {
    --dile-wheel-picker-item-height: 56px;
    --dile-wheel-picker-font-size: 2rem;
    --dile-wheel-picker-text-color: #a5b4fc;
    --dile-wheel-picker-selected-text-color: #312e81;
    --dile-wheel-picker-band-background-color: #e0e7ff;
    --dile-wheel-picker-band-border-radius: 16px;
    --dile-wheel-picker-width: 120px;
  }
</style>
<script type="module">
  const picker = document.getElementById('wheelminutes');
  picker.items = Array.from({ length: 60 }, (_, i) => String(i).padStart(2, '0'));
  picker.value = '30';
</script>
<dile-wheel-picker id="wheelminutes" class="styled-wheel" label="Minutes"></dile-wheel-picker>
```

### Disabled

```html:preview
<script type="module">
  const picker = document.getElementById('wheeldisabled');
  picker.items = ['Red', 'Green', 'Blue'];
  picker.value = 'Green';
</script>
<dile-wheel-picker id="wheeldisabled" label="Color" disabled></dile-wheel-picker>
```
