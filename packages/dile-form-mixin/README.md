# @dile/dile-form-mixin

Mixin to apply more functionality to forms.

## Usage

Install it:

```bash
npm i @dile/dile-form-mixin
```

### Import and extend your class

To use it you only need to extend your custom element class with the mixin.

```javascript
import { DileformMixin } from '@dile/dile-form-mixin';

class MyElement extends DileformMixin(HTMLElement) {
  // your custom element code...
}
```

### Requirements

This mixin apply some methods to the components to recognize and operate whith forms. To be recognized the elements in the form should have:

- The "name" attribute to inform the form that this element is part of the form.
- The "value" property to get or set the value of the element.


Work with native form elements or custom elements, as long as they have the value property.

## Methods

- **getData()** Gets the data object represented by the form elements.
- **setData(data)** Set the values in the form elements using the data object provided in the argument.
- **resetData()** Set the values of the form to null