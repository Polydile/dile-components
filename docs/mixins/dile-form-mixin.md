---
title: Form
tags: formData
---

# DileForm

Mixins to apply more functionality to forms in order to generate some automatisms and avoid to duplicate code when you use forms in your applications.

## Installation

```bash
npm i @dile/ui
```

## Usage

To use DileFormMixin you only need to extend your custom element class with the mixin.

```javascript
import { DileForm } from '@dile/ui/mixins/form';

class MyElement extends DileForm(LitElement) {
  // your custom element code...
}
```

## Create a form using the CLI

Dile Components provides a CLI that offers the essential scaffolding for a form component, where the DileForm mixin is applied.

Once the [CLI is installed](/cli/), you can create form components with this command:

```bash
dile g-form <component-name>
```

This command will create the component in the folders defined in `dile.config.js` or, by default, in `src/components` if no configuration file exists. Additionally, it's possible to generate the form with examples of various components already included, to facilitate the integration of diverse form fields.

To see the complete help for this command, run it like this:

```bash
dile g-form --help
```

### Form element requirements

This mixin apply some methods to the components to recognize and operate whith forms. To be recognized the form elements should have:

- The "name" attribute to inform the form that this element is part of the form.
- The "value" property to get or set the value of the element.

It works with native form elements or custom elements, as long as they have the value and name property.

#### Optional requirements

Optionally, the form fields can have properties designed to conveniently display validation errors.

These properties are:

- **errored**: Boolean, true when there is an error in this field
- **message**: String, containing a message to display the error description

These properties are available in all form elements found in the `@dile/ui` form components catalog.

### Properties 

- **setOnInit**: Object to set its properties in the form when the component initializes

### Methods

- **getData()** Gets the data object represented by the form elements.
- **setData(data)** Set the values in the form elements using the data object provided in the argument.
- **clearData()** Clear the form. Try to call a clear() method on all form elements. If this method does not exists only set the value of the element to "". 
- **resetData()** Set the form elements to it's initial state.
- **showError(name, error)** Show an error message in the element with the name provided in the argument.
- **clearErrors()** Clear all error messages in the form.
- **showErrors(errors)** Show errors in various elements of the form, using the errors object provided in the argument

```javascript
showErrors({
  name: 'Please complete your name', 
  age: 'your age should be greater than 18 years old'
})
```

In the above code "name" and "age" are the ```name``` of the form element that shoud have a displayed error. 

The requirements to display the error on the component are: 

- `errored` boolean property
- `message` string property

#### Template Methods for Data Transformation

The following are template methods that can be overridden in your component to adapt data structure before sending or receiving data:

- **adaptDataOut(data)** Template method called by `getData()` before returning the data. Override this method to transform the structure of outgoing data. By default, it returns the data without any modifications.

- **adaptDataIn(data)** Template method called by `setData()` before setting the form values. Override this method to transform the structure of incoming data. By default, it returns the data without any modifications.

##### Example: Using data adaptation methods

```javascript
import { DileForm } from '@dile/ui/mixins/form';
import { LitElement } from 'lit';

class MyFormComponent extends DileForm(LitElement) {
  // Transform data structure before returning it
  adaptDataOut(data) {
    return {
      ...data,
      // Custom transformations
      fullName: `${data.firstName} ${data.lastName}`,
    };
  }

  // Transform data structure before setting it
  adaptDataIn(data) {
    return {
      ...data,
      // Custom transformations
      firstName: data.fullName?.split(' ')[0] || '',
      lastName: data.fullName?.split(' ')[1] || '',
    };
  }
}
```

