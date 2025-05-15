---
title: Time Picker
tags: forms
---

# dile-time-picker

Web Component to select a complete time (hours, minutes, seconds) using numeric pickers. Designed to integrate easily in forms, it is a form-associated element compatible with `FormData` and provides validation and customizable error messages.

## Installation

```bash
npm i @dile/ui
```

## Usage

Import the component.

```javascript
import '@dile/ui/components/time-picker/time-picker.js';
```

Use the component.

```html
<dile-time-picker label="Select time"></dile-time-picker>
```

## Properties

* **value**: `String`. Full time in `HH:MM:SS` format. Default is `"00:00:00"`.
* **label**: `String`. Label displayed above the time picker.
* **disabled**: `Boolean`. Disables user interaction.
* **message**: `String`. Help or error message displayed below the picker.
* **errored**: `Boolean`. Displays the component in error state.
* **hideErrorOnInput**: `Boolean`. Clears the error when the user changes the value.
* **focusOnStart**: `Boolean`. Sets focus on the hours field when the component is rendered.
* **name**: `String`. Name of the field, useful for form integration.


## Methods

* **focus()**: Focuses the hours field.
* **clearError()**: Clears the error state and removes the message.

## Events

- **element-changed**:  The ```element-changed``` event is dispatched when value on the input changes. In the event detail will emmit the element ```name``` and ```value```properties.

## CSS Custom Properties

You can customize the component's appearance using the following CSS properties inherited from `messageStyles` and `number-picker-element`:

| Custom property                  | Description                | Default |
| -------------------------------- | -------------------------- | ------- |
--dile-input-label-margin-bottom | Bottom margin of the label | 4px    
--dile-input-label-font-size     | Label font size            | 1em    
--dile-input-label-color         | Label color                | #59e   
--dile-input-label-font-weight   | Label font weight          | normal 
--dile-input-message-padding-top | Space from input to message | 4px
--dile-input-message-font-size | Message font size | 0.875rem
--dile-input-message-color | Message text color | #888
--dile-input-message-error-color | Message text color on errored state | #c00

> **Note:** To customize the internal `dile-number-picker-element` styles, refer to the [dile-number-picker-element documentation](/components/dile-number-picker/).

## Demos

### Simple Time Picker

```html:preview
<script type="module">
  import '@dile/ui/components/time-picker/time-picker.js';
</script>
<dile-time-picker label="Time"></dile-time-picker>
```

### Time Picker with initial value and error message

```html:preview
<dile-time-picker 
  label="Finish time"
  value="03:30:00"
  errored
  message="This is a message"
></dile-time-picker>
```
