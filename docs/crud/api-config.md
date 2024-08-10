---
title: API config
tags: configuration
---

# ApiConfig Object

The `ApiConfig` object is used across various components in the CRUD library. This object helps adapt to the specific characteristics of the API responses you are working with.

It consists of several functions that receive the server response and return the specific data that the component needs, conveniently formatted for use with this library.

The default API configuration object is as follows:

```javascript
api: {
    responseDataGetter: response => response.data,
    responseMessageGetter: response => response.message,
    validationErrorsGetter: response => response.errors,
    elementListGetter: response => response.data,
    paginationDataGetter: response => response.data,
}
```

- **responseDataGetter**: A method that returns the data in API operations that receive an individual item as a response (e.g., show, insert, etc.).
- **responseMessageGetter**: A method that returns the feedback message sent by the API in response to a request, if the API sends any message.
- **validationErrorsGetter**: A method that returns the array of validation errors that occurred in response to an insert or update operation on a resource.
- **elementListGetter**: A method that returns the array of data in GET operations on the root of a resource, typically in list operations.
- **paginationDataGetter**: A method that returns the data necessary to compose pagination functionality in a list component.

## Validation Errors Array format

The format of the validation errors returned by the `validationErrorsGetter` method should be an object similar to the following example:

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

## Pagination Data format

The pagination data that needs to be provided to the component by the `paginationDataGetter` method should follow the format shown in the following object:

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
