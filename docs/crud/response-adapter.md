---
title: Response Adapter
tags: configuration
order: 2
---

# Response Adapter Object

The `responseAdapter` object is used across various components in the CRUD library. This object helps adapt to the specific characteristics of the API responses you are working with.

It provides of several methods to return the specific data that the component needs, conveniently formatted for use with this CRUD library.

## Default responseAdapter Object

All components in the CRUD library use a default `responseAdapter` object that provides configurations for a typical REST API.

The behavior of this object is very straightforward. It simply has a method for storing the response and various methods that allow access to specific parts of that response. You can view the code in the `ResponseApiAdapter` class on GitHub.


## Creating Custom responseAdapter Objects

When the API responses don't match the conventions expected by the default `responseAdapter`, it's possible to create custom `responseAdapter` objects.

To do this, simply extend the `ResponseApiAdapter` class, creating a new class with the methods you need to redefine.

Here is a simple example of customization by creating a new class:

```javascript
import { ResponseApiAdapter } from '@dile/crud/lib/ResponseApiAdapter';

class BoardGameResponseApiAdapter extends ResponseApiAdapter {
  getElementList() {
    return this.response.data.result.data;
  }
}
```

### How to Adapt Responses in Methods of Derived Classes

When creating custom responseAdapter objects by extending the ResponseApiAdapter class, you may need to adapt the responses to match the expected format of your application. This is done by overriding the methods in your derived class to process the API responses as needed.

Here are the methods you can adapt in your custom `responseAdapter` class:

- **setResponse(response)**: This method stores the API response. You can override it to customize how the response is stored or processed when it is first received.

- **getData()**: A method that returns the data in API operations that receive an individual item as a response (e.g., show, insert, update, etc.).

- **getMessage()**: Returns any message included in the API response, such as a success or error message. This method should return a string with the feedback message sent by the API in response to a request, if the API sends any message.

- **getValidationErrors()**: A method that returns the array of validation errors that occurred in response to an insert or update operation on a resource. See below more details of the errors array format.

- **getElementList()**: Returns a list of elements from the API response, on GET operations on the root of a resource Should return an array of element objets.

- **getPaginationData()**: A method that returns the data necessary to compose pagination functionality in a list component. See below information about the expected pagination data format.

- **getIds()**: Extracts the IDs of elements, used in batch operations. Must return an array of resource Ids. Override this method to customize how IDs are retrieved from the API response. 

By overriding these methods, you can ensure that the custom `responseAdapter` works seamlessly with your specific API's structure and data formats.

#### Validation Errors Array format

The format of the validation errors returned by the `getValidationErrors()` method should be an object similar to the following example:

```json
{
  "name": [
    "The name field is required."
  ],
  "slug": [
    "The slug field is required."
  ],
  "continent": [
    "The continent field is required."
  ]
}
```

The names of the properties must match the `name` attribute of the form fields corresponding to the error. The errors are specified in an array of strings.

> This validation error format is used by popular validation systems, such as the one implemented in the Laravel framework.


#### Pagination Data format

The pagination data that needs to be provided to the component by the `getPaginationData()` method should follow the format shown in the following object:

```json
{
  "countItems": 118,
  "result": {
    "current_page": 1,
    "next_page_url": "https://example.com/api/users?per_page=25&page=2",
    "prev_page_url": null
  }
}
```

## Using the Custom `responseAdapter`

To use the custom `responseAdapter`, you need to instantiate an object of the class you just created and provide it to the component. This can be done in two different ways depending on the component.

### Using the Custom `responseAdapter` in Simple Components

For core components, like `dile-ajax-form` or atomic operations like `dile-crud-insert`, you can pass the custom response adapter through a component property.

First, you need to create an instance of this object, for example, in the constructor of the component where you want to use the CRUD components:

```javascript
this.customizedResponseAdapter = new BoardGameResponseApiAdapter();
```

Then, pass the object as a property:

```html
<dile-ajax-form
  operation="insert"
  endpoint="api/countries"
  .responseAdapter=${this.customizedResponseAdapter}
></dile-ajax-form>
```

### Using the Custom `responseAdapter` in advanced Components

For more complex components like `dile-crud`, `dile-crud-list`, or `dile-crud-single`, you need to pass the instance of the custom object in the `responseAdapter` property of the [configuration object](/crud/resource-config/).

```javascript
import { CrudConfigBuilder } from '@dile/crud/lib/CrudConfigBuilder';
import { ResponseApiAdapter } from '@dile/crud/lib/ResponseApiAdapter';

class BoardGameResponseApiAdapter extends ResponseApiAdapter {
  getElementList() {
    return this.response.data.result.data;
  }
}

export const boardGameConfig = new CrudConfigBuilder('https://timer.escuelait.com/api/board-games', {
  responseAdapter: new BoardGameResponseApiAdapter(),
});
```




