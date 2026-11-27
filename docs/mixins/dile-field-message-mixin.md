---
title: FieldMessage
tags: formData
element: DileFieldMessage
package: '@dile/ui'
summary: Adds message and errored properties, a message template and clearError() so form elements can show validation feedback.
---

# DileFieldMessage

This mixin provides the common features to display a feedback or validation message in a form element.

It is compatible with the [DileFormMixin](/mixins/dile-form-mixin), which sets `message` and `errored` on form elements through its `showError()` and `clearErrors()` methods.

## Installation

```bash
npm i @dile/ui
```

## Usage

```javascript
import { LitElement, html } from 'lit';
import { DileFieldMessage } from '@dile/ui/mixins/form';
import { messageStyles } from '@dile/ui/components/input';

class MyField extends DileFieldMessage(LitElement) {
  static get styles() {
    return [messageStyles];
  }

  render() {
    return html`
      <!-- your field interface -->
      ${this.messageTemplate}
    `;
  }
}
```

> The mixin doesn't add styles by itself. Include `messageStyles` in your component styles to get the standard message look and its CSS custom properties.

## Properties

- **message**: String. Message displayed below the field.
- **errored**: Boolean. When true, the message is displayed with the error style.

## Methods

- **clearError()**: clears the message and the error state.

## Getters

- **messageTemplate**: Lit template that renders the message (`<div id="field-message" class="message">`), adding the `errored-msg` class when `errored` is true. Renders nothing when there is no message.

## Linking the message with the field

The message element has the id exported as `FIELD_MESSAGE_ID` (`"field-message"`). Use it in `aria-describedby` so screen readers announce the message with the field:

```javascript
import { DileFieldMessage, FIELD_MESSAGE_ID } from '@dile/ui/mixins/form';

// inside render()
html`<input
  aria-invalid=${ifDefined(this.errored ? 'true' : undefined)}
  aria-describedby=${ifDefined(this.message ? FIELD_MESSAGE_ID : undefined)}
>`
```

## Implementations of DileFieldMessage

- [dile-input](/components/dile-input) (and the components that extend it)
- [dile-input-message](/components/dile-input-message)
