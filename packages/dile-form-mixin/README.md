# @dile/dile-form-mixin

Mixins to apply more functionality to forms.

## Usage

Install it:

```bash
npm i @dile/dile-form-mixin
```

Mixins in this package: 

- DileFormMixin
- DileFormChangeDetectMixin

## DileFormMixin

To use DileFormMixin you only need to extend your custom element class with the mixin.

```javascript
import { DileformMixin } from '@dile/dile-form-mixin';

class MyElement extends DileFormMixin(HTMLElement) {
  // your custom element code...
}
```

### Requirements

This mixin apply some methods to the components to recognize and operate whith forms. To be recognized the elements in the form should have:

- The "name" attribute to inform the form that this element is part of the form.
- The "value" property to get or set the value of the element.

It works with native form elements or custom elements, as long as they have the value property.

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
})```

## DileFormChangeDetectMixin

This mixin detects changes in form and emmit a ```dile-form-changed``` event when it occurs.

To detect changes the form elements should emmit a ```element-changed```event. for this reason, this mixins only works with custom elements that have this custom event implemented.

Also, for this mixin do its work depends on the DileFormMixin, so you need to implement both mixins.

´´´javascript
export class FctCrudFilters extends DileFormChangeDetectMixin(DileFormMixin(LitElement)) {
```