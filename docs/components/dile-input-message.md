---
title: Input Message
tags: forms
---

# dile-input-message

Input text message field.

This component inherits all properties and methods from `<dile-input>`, but it is only created for messaging purposes. 

So, this component has not got any input interface. It can show messages and error messages. And is integrated with dile-form-mixin to show error messages on validation errors.

> Usually, you won't need this component, unless you are developing a custom form element that you plan to work in conjunction with our dile-form-mixin."

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
<dile-input-message message="I am olny showing a message"></dile-input-message>
```

## Clear error message

- **clearError()**: clear the message and the error state.
