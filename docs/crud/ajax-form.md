---
title: Ajax Form
tags: ajax
---

# dile-ajax-form

The `dile-ajax-form` component is designed to create a form that can be automatically submitted via Ajax to the server, without the need to program the HTTP connections.

For its operation, `dile-ajax-form` simply needs to be configured with the appropriate attributes and define the form body in the component's slot.

## Installation

```bash
npm i @dile/crud
```

## Usage

Import the dile-ajax-form component.

```javascript
import '@dile/crud/components/ajax-form/ajax-form.js';
```

Use the component.

```html
<dile-ajax-form
  operation="insert"
  endpoint="api/countries"
  actionLabel="Save"
>
  <demo-country-form id="form"></demo-country-form>
</dile-ajax-form>
```

## dile-ajax-form Requirements 

For `dile-ajax-form` to work correctly, the form component provided in the slot needs to have some basic functionalities:

- Allow assigning values to the form fields.
- Allow obtaining a data object with the values of the form fields.
- Display validation errors.

All these functionalities are achieved by applying a mixin to the form found in the `@dile/ui` package called `DileForm`.

You can read the [documentation of the `DileForm` mixin](/mixins/dile-form-mixin/) for more information.

### Properties

- **operation**: String, can have two possible values: "insert" or "update".
- **endpoint**: String, the URL of the web service with the resource to be inserted or edited.
- **actionLabel**: String, the text that will appear on the form submission button.
- **data**: Object, the data object that will be sent to the endpoint, which is automatically obtained by querying the form fields.
- **relatedId**: String, the identifier of the record to be edited. This is only used in the case of an update operation.
- **loadOnInit**: Boolean, indicates whether the form should automatically load and display the data of the record with the ID specified in `relatedId`.
- **buttonSmall**: Boolean, where a value of `true` indicates that the button should be smaller.
- **formIdentifier**: String, the identifier (ID attribute) of the form element provided in the slot, which contains the fields from which data will be retrieved or displayed. The default value is "form".
- **setDataOnInit**: Boolean, if `true`, indicates that the component should use the object provided in the `data` property to populate the form fields upon initialization. This can be useful when you have an insert form that you want to prepopulate with specific values in the form fields.
- **responseAdapter**: An object with a series of methods used to adapt the response data from the API used by the form. See the configuration section below for more details.

### Methods

- **loadData()**: Loads the data of the item to be edited. The identifier of the item must be specified in the corresponding `relatedId` property.
- **doAction()**: Performs the form submission operation as if the form submission button had been clicked.
- **clearErrors()**: Clears all validation errors that the form or the component itself is displaying.
- **clearFeedback()**: Clears the feedback messages that the form is displaying. This does not include the feedback messages of the form elements.
- **initData()**: Sends the values from the object stored in the component's `data` property to the corresponding form fields.

### Custom Events

- **dile-ajax-form-get-error**: This event is dispatched when the form encounters an error while receiving data from the server that it needs to display in its fields, based on the item being edited. The detail will be the full server response received via Ajax.
- **dile-ajax-form-loaded**: This event is dispatched when the form has successfully finished loading the data of the resource to be edited. The detail has two properties: `data`, containing the value evaluated as the loaded data, and `previousDetail`, providing the full server response detail, including all originally received fields.
- **save-error**: This event is dispatched when errors are encountered while saving data in the form. The detail contains three pieces of data: `msg`, with the server's message; `validationErrors`, with the captured validation errors object; and `previousDetail`, with the complete Ajax response from the server.
- **save-success**: This event is dispatched when the form has been successfully saved. The detail sends three properties: `data`, with the evaluated data from the response; `msg`, with the server's response message; and `previousDetail`, with the complete Ajax response from the server.

> The component is based on `dile-ajax`, so you can also listen for the custom events documented in that component.

## Configuration

The `dile-form-ajax` component is designed to adapt to different types of APIs and websites. It can define various types of requests and handle different types of responses.

### Customize the HTTP request

The `dile-ajax-form` component uses [dile-ajax](/crud/ajax/) under the hood to make the request to the server. In turn, `dile-ajax` uses [Axios](https://axios-http.com/) as the library for HTTP connections.

If you need to customize how `dile-ajax-form` uses Axios to make Ajax connections to the server, please refer to the documentation for `dile-ajax`.

### Response Configuration

The `dile-ajax-form` component sends and receives data via HTTP requests to a REST API. To extract the necessary data in each case, the API uses a default behavior that works with typical REST APIs.

To customize the component's behavior, allowing it to adapt to any type of API response, you can pass a custom adapter using the `responseAdapter` property.

```html
<dile-ajax-form
  operation="insert"
  endpoint="customized-api/users"
  .responseAdapter=${customizedResponseAdapter}
>
  <resource-form id="form"></resource-form>
</dile-ajax-form>
```

You can find more information on how to create custom adapters on the [Response Adapter page](/crud/response-adapter/).

## dile-ajax demos

### Form Component used on dile-ajax-form

Before we start looking at the demos of `dile-ajax-form`, let's include an example of a form that uses the `DileForm` mixin. This mixin provides all the necessary functionality for easy integration with `dile-ajax-form`.

{% include "componentes-crud/country-form.md" %}

### Insert Ajax demo

```html:preview
<script type="module">
    import '@dile/crud/components/ajax-form/ajax-form.js';
</script>
<dile-ajax-form
  id="ajaxelement"
  operation="insert"
  endpoint="https://timer.escuelait.com/api/countries"
  actionLabel="Save"
>
  <demo-country-form id="form"></demo-country-form>
</dile-ajax-form>
```

### Update form example

```html:preview
<dile-ajax-form
  id="ajaxupdate"
  operation="update"
  relatedId="1"
  loadOnInit
  endpoint="https://timer.escuelait.com/api/countries"
  actionLabel="Save"
>
  <demo-country-form id="form"></demo-country-form>
</dile-ajax-form>
```
