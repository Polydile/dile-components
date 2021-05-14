# @dile/dile-textarea

Input textarea field Web Component, with customized design.

```
<dile-textarea label="The label" placeholder="Write something..."></dile-input>
```

## Install

```
npm install @dile/dile-textarea
```

## Usage

Import the component.

```javascript
import '@dile/dile-textarea/dile-textarea';
```

Use the component

```html
<dile-textarea
  label="Text to the label"
  max-rows="5"
  rows="2"
  placeholder="write something"
></dile-textarea>
```

## Properties

- **name**: the name of the textarea element. This is usefull to distinguish the related element in an textarea event listener.
- **label**: the element label
- **rows**: Visible rows
- **maxRows**: maximum rows (use max-rows in the HTML code, as attribute)
- **readOnly**: Defines the texts present in the input element when is empty
- **placeholder**: on true, the element is disabled

## Styling

Custom property | Description | Default
----------------|-------------|---------
--dile-textarea-label-color | Label text color | #59e
--dile-textarea-label-font-size | Label font size | 1rem
--dile-textarea-border | Textarea box border | 1px solid #888
--dile-textarea-border-radius | Textarea element border radius | 5px
--dile-textarea-font-size | Input element font size | 0.9rem
--dile-textarea-padding | Padding for the textarea element | 5px
--dile-textarea-font-family | Textarea element font family | sans-serif
--dile-textarea-label-margin-bottom | Label marging bottom | 4px

## Events

### input

This element acts as an native input element. So, you can listen the native `input` event.

```
inputField.addEventListener('input', (e) => {
  console.log('input event named ', e.target.name, ' has value: ', e.target.value);
});
```

