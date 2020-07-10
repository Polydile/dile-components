# @dile/dile-input

Input text field Web Component, with customizable design.

```
<dile-input label="The label" placeholder="Write something..."></dile-input>
```

## Install

```
npm install @dile/dile-input
```

## Usage

Import the component.

```javascript
import '@dile/dile-input/dile-input';
```

Use the component

```html
<dile-input
  name="input_name"
  label="Text to the label"
  value="Text to the input"
  placeholder="Some text"
  disabled
  errored
></dile-input>
```

## Properties

- **name**: the name of the input element. This is usefull to distinguish the related element in an input event listener.
- **label**: the element label
- **value**: defines the text inside the input element
- **placeholder**: Defines the texts present in the input element when is empty
- **disabled**: on true, the element is disabled
- **errored**: on true, the element is marked as error
- **disableAutocomplete**: on true, the input autocomplete HTML featured is disabled

## Styling

Custom property | Description | Default
----------------|-------------|---------
--dile-input-width | Input element width | 100%
--dile-input-border-width | Input element border width | 1px
--dile-input-border-color | Input element border color | #888
--dile-input-border-radius | Input element border radius | 5px
--dile-input-error-border-color | Input element border on errored property = true | #c00
--dile-input-focus-border-color | Input element border on focus | #6af
--dile-input-disabled-border-color | Input element border when disabled | #eee
--dile-input-font-size | Input element font size | 1em
--dile-input-line-height | Input element line height | 1.5em
--dile-input-label-font-size | Font size for the label | 1em
--dile-input-label-color | Color for the label text | #59e
--dile-input-label-font-weight | Label text font weight | normal
--dile-input-label-margin-bottom | Label marging bottom | 4px
--dile-input-background-color | Color for the background input element | #fff
--dile-input-padding | Padding for the input text | 5px

## Events

### input

This element acts as an native input element. So, you can listen the native `input` event.

```
inputField.addEventListener('input', (e) => {
  console.log('input event named ', e.target.name, ' has value: ', e.target.value);
});
```

### enter-pressed

The `enter-pressed` event is dispatched when the user press enter on it.

```
inputField.addEventListener('enter-pressed', (e) => {
  console.log('enter-pressed event, value: ', e.target.value);
});
```