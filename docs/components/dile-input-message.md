---
title: Input Message
package: '@dile/ui'
element: '&lt;dile-input-message&gt;'
status: stable
summary: Message display component designed for showing feedback and validation messages within form components.
tags: input
---

# dile-input-message

Component to display a feedback or validation message, with the same look as the messages of `<dile-input>` and the other form elements.

This component doesn't include any input interface and it doesn't emit `element-changed` events. It is intended for displaying messages and error messages and it is integrated with [DileForm](/mixins/dile-form-mixin) to show validation error messages: give it a `name` and the form's `showError()` / `clearErrors()` methods will target it.

It is built with the [DileFieldMessage](/mixins/dile-field-message-mixin) mixin.

> Usually, you won't need this component, unless you are developing a custom form element that you plan to work in conjunction with our [DileForm](/mixins/dile-form-mixin) mixin.

## Install

```bash
npm install @dile/ui
```

## Usage

Import the component.

```javascript
import '@dile/ui/components/input/input-message';
```

Use the component

```html
<dile-input-message message="I am only showing a message"></dile-input-message>
```

## Properties

- **message**: String. Message to display.
- **errored**: Boolean. Displays the message with the error style.
- **name**: String (reflected). Used by `DileForm` to locate this element when showing errors.

## Methods

- **clearError()**: clear the message and the error state.

## CSS custom properties

Custom property | Description | Default
----------------|-------------|---------
--dile-input-message-padding-top | Space above the message | 4px
--dile-input-message-font-size | Message font size | 0.875rem
--dile-input-message-color | Message text color | #888
--dile-input-message-error-color | Message text color on errored state | #c00

## dile-input-message demos

```html:preview
<script type="module">
  import '@dile/ui/components/input/input-message.js';
</script>
<dile-input-message message="This is an informative message"></dile-input-message>
<dile-input-message message="This field is required" errored></dile-input-message>
```
