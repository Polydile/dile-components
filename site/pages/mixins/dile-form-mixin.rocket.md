```js server
/* START - Rocket auto generated - do not touch */
export const sourceRelativeFilePath = 'mixins/dile-form-mixin.rocket.md';
import { layout } from '../recursive.data.js';
export { layout };
/* END - Rocket auto generated - do not touch */

export const title = 'DileFormMixin';

```

```js script
import { html, css, LitElement } from 'lit'; 
import "../../../packages/dile-menu-hamburger/dile-menu-hamburger.js";
import "../../../packages/dile-selector/dile-selector.js";
import "../../../packages/dile-selector/dile-selector-item.js";
```

# DileFormMixin

Mixins to apply more functionality to forms in order to generate some automatisms and avoid to duplicate code when you use forms in your applications.

## Installation

```bash
npm i @dile/dile-form-mixin
```

## Usage

To use DileFormMixin you only need to extend your custom element class with the mixin.

```javascript
import { DileFormMixin } from '@dile/dile-form-mixin';

class MyElement extends DileFormMixin(HTMLElement) {
  // your custom element code...
}
```

### Requirements

This mixin apply some methods to the components to recognize and operate whith forms. To be recognized the form elements should have:

- The "name" attribute to inform the form that this element is part of the form.
- The "value" property to get or set the value of the element.

It works with native form elements or custom elements, as long as they have the value and name property.

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

There is another requirement to display the error on the component. 

- Should have a ```errored``` boolean property
- Should have a ```message``` string property

