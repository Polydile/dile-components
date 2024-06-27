---
title: Textarea
tags: forms
---

# dile-textarea

Input textarea field Web Component, with customizable design.

```html
<dile-textarea label="The label" placeholder="Write something..."></dile-textarea>
```

## Install

```bash
npm install @dile/ui
```

## Usage

Import the component.

```javascript
import '@dile/ui/components/textarea/textarea';
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

- **value**: the text value of the textarea element
- **name**: the name of the textarea element. This is usefull to distinguish the related element in an textarea event listener.
- **label**: the element label
- **rows**: Visible rows
- **maxRows**: maximum rows (use max-rows in the HTML code, as attribute)
- **disabled**: on true, the element is disabled
- **readonly**: on true, the element is read only
- **placeholder**: Defines the texts present in the input element when is empty
- **message**: Place a message under the textarea element
- **errored**: to mark the textarea element with a error style
- **hideErrorOnInput**: Hide the error message when the user changes the value of the textarea element

## Styling

Custom property | Description | Default
----------------|-------------|---------
--dile-textarea-label-color | Label text color | #59e
--dile-textarea-label-font-size | Label font size | 1em
--dile-textarea-label-font-weight | Label font weight | bold
--dile-textarea-border | Textarea box border | 1px solid #888
--dile-textarea-border-radius | Textarea element border radius | 5px
--dile-textarea-font-size | Input element font size | 1em
--dile-textarea-padding | Padding for the textarea element | 5px
--dile-textarea-font-family | Textarea element font family | sans-serif
--dile-textarea-label-margin-bottom | Label marging bottom | 4px
--dile-input-error-border-color | Border color on errored state | #c00
--dile-input-message-padding-top | Space from input to message | 4px
--dile-input-message-font-size | Message font size | 0.875em
--dile-input-message-color | Message text color | #888
--dile-input-message-error-color | Message text color on errored state | #c00
--dile-textarea-background-color | Textarea background color | #ffffff
--dile-textarea-color | Textarea text color | #000
--dile-textarea-placeholder-color | Placeholder text color | #999
--dile-textarea-disabled-background-color | Disabled background color | #ebebeb
--dile-textarea-disabled-border-color | Disabled border color | #ccc

## Events

### input

This element acts as an native textarea element. So, you can listen the native `input` event.

```javascript
inputField.addEventListener('input', (e) => {
  console.log('input event named ', e.target.name, ' has value: ', e.target.value);
});
```

## dile-textarea demos

### Default textarea

```html:preview
<dile-textarea label="Comments"></dile-textarea>
```

