---
title: Input Message
package: '@dile/ui'
element: '&lt;dile-input-message&gt;'
status: stable
summary: Message display component inheriting from dile-input. Designed for showing validation messages within form components.
---

# dile-input-message

Input text message field.

This component inherits all properties and methods from `<dile-input>`, but it is specifically designed for messaging purposes.

Therefore, this component does not include any input interface. It is intended for displaying messages and error messages and is integrated with `dile-form-mixin` to show validation error messages.

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
<dile-input-message message="I am olny showing a message"></dile-input-message>
```

## Clear error message

- **clearError()**: clear the message and the error state.
