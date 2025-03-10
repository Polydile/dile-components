---
title: Input contact
tags: forms
---

# dile-input-contact

This component extends from [dile-input](/components/dile-input).

This component is customized to allow only the introduction of contacts: mobile, telephone, fax and email. When the user enters a value and loses focus, it is validated to meet this requirement. If the data entered is not valid, the input will appear in red. It is possible to include a custom message when the contact is not valid.

## Installation

```bash
npm i @dile/ui
```

## Usage

Import the component.

```javascript
import '@dile/ui/components/input/input-contact.js';
```

Use the component.

```html
<dile-input-contact mobile></dile-input-contact>
```

## Properties

- **value**: value for this input.
- **phone**: the component is phone
- **mobile**: the component is mobile
- **fax**: the component is fax
- **email**: the component is email
- **messageError**: message that will appear when the field is invalid

## Methods

- **_input()**: takes the entered value and emits the "dile-input-contact-input" event
- **_isValidInput()**: checks that the field value is valid and emits the "dile-input-contact-blur" event

## Custom events

- **dile-input-contact-input**: This event is emitted whenever the value of the field changes. The event detail is an object like this:

```javascript
{
  detail: {
    value: "675698965"
  }
}
```

- **dile-input-contact-blur**: This event is emitted when the field focus is lost. The event detail is an object like this:

```javascript
{
  detail: {
    value: "675698965",
    isValid: true,
    isMobile: true,
    isPhone: false,
    isFax: false,
    isMail: false
  }
}
```

## dile-input-search demos

### Contact input mobile

```html:preview
<dile-input-contact id="mobile" disableAutocomplete mobile value=""></dile-input-contact>
```

### Contact input mobile with message error

```html:preview
<dile-input-contact id="mobileMsg" disableAutocomplete mobile messageError="El móvil es incorrecto"></dile-input-contact>
```

### Contact input with initial error value

```html:preview
<dile-input-contact id="mobile" disableAutocomplete mobile value="aaaaa"></dile-input-contact>
```
### Contact input phone

```html:preview
 <dile-input-contact id="phone" disableAutocomplete phone label="Teléfono fijo"></dile-input-contact>
```

### Contact input phone with message error

```html:preview
 <dile-input-contact id="phoneMsg" disableAutocomplete phone messageError="El teléfono es incorrecto"></dile-input-contact>
```

### Contact input fax

```html:preview
 <dile-input-contact id="fax" disableAutocomplete fax></dile-input-contact>
```

### Contact input fax with message error

```html:preview
 <dile-input-contact id="faxMsg" disableAutocomplete fax messageError="El fax es incorrecto"></dile-input-contact>
```

### Contact input email

```html:preview
 <dile-input-contact id="email" disableAutocomplete email></dile-input-contact>
```

### Contact input email with message error

```html:preview
 <dile-input-contact id="emailMsg" disableAutocomplete email messageError="El email es incorrecto"></dile-input-contact>
```