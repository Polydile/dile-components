---
title: Ajax Select Crud
tags: 'Crud extras'
---

# dile-ajax-select-crud

The `dile-ajax-select-crud` component is a tool to select elements with ajax searches. 

Is based on [dile-select-ajax](/components/dile-select-ajax/) component but configured to use [dile-ajax](/components/dile-select-ajax/) in replacement of the navigator fetch interface.

## Installation

```bash
npm i @dile/crud
```

## Usage

Import the dile-ajax component.

```javascript
import '@dile/crud/components/ajax-select-crud/ajax-select-crud';
```

Use the component.

```html
<dile-ajax-select-crud
    id="countryselect"
    idProperty="id"
    name="country_id"
    label="País"
    endpoint="https://timer.escuelait.com/api/countries" 
    queryStringVariable="keyword"
    placeholder="Buscar país"
    resultDataProperty="data"
    displayProperty="name"
    selectDefaultPlaceholder="Seleccionar país..."
></dile-ajax-select-crud>
```

### Properties

`dile-ajax-select-crud` is a specialization of `[dile-select-ajax](/components/dile-select-ajax/)`, so it offers all the properties documented for that component.

In addition, `dile-ajax-select-crud` introduces these additional properties:

- **maxResults**: Number, defines the maximum number of results that can be returned in a single request.
- **pageParamName**: String, the name of the parameter used to indicate the page size in the request (corresponding to the `maxResults` property).
- **getSelectResultList**: Object, a function that takes the full response and returns the list of selected results. This is used to extract the correct data from the JSON response object. 

### Custom Events

- **element-changed**: This component extends `[dile-select-ajax](/components/dile-select-ajax/)`, so `element-changed` custom event is fired when the value property of the component changes.

The custom event detail has this properties:

```json
detail: {
  name: this.name,
  value: this.value
}
```

### Adapting API Responses When Fetching a List

The `dile-ajax-select-crud` component can adapt to different API response formats when fetching a list of elements to display in the select field. There are two mechanisms available to achieve this adaptation:

#### getSelectResultList Property

This is the primary mechanism, and it will be used even if other access mechanisms are defined. It is also the most versatile.

It consists of a property of the component to which a function should be assigned, giving us full freedom to define where the list of elements returned by the API is located.

The provided function receives the raw JSON response from the server, and it simply needs to return the array of items.

Suppose the server returns a JSON response like this:

```json
{
    "message": "Some message",
    "data": {
        "result": {
            "countItems": 2,
            "data": [ { "id": 1, "name": "Foo" }, { "id": 2, "name": "Bar" } ]
        }
    }
}
```

As you can see, the array with the list of items to be used in the select field is located at `data.result.data`. In this case, we could configure the function like this:

```html
<dile-ajax-select-crud
    endpoint="/api/categories" 
    .getSelectResultList=${(response) => response.data.result.data}
></dile-ajax-select-crud>
```

#### resultDataProperty Property

This mechanism has lower priority and exists because it is inherited from the `dile-select-ajax` component. It can be used in simpler cases.

You can simply specify a string with the name of the property where the list is located in the API response. This is useful for a response like this:

```json
{
    "message": "Some message",
    "data": [ { "id": 1, "name": "Foo" }, { "id": 2, "name": "Bar" } ]
}
```

In this case, we can configure the component like this:

```html
<dile-ajax-select-crud
    endpoint="https://timer.escuelait.com/api/countries" 
    resultDataProperty="data"
></dile-ajax-select-crud>
```

#### If No Configuration is Set, It Assumes the API Returns an Array

If neither of the above methods is configured, the component assumes that the entire JSON response contains the array of elements for the select field.

This will only work when the server response looks like this:

```json
[ { "id": 1, "name": "Foo" }, { "id": 2, "name": "Bar" } ]
```

> This component documentation is a work in progress.

## dile-ajax-select-crud example

```html:preview
<script type="module">
  import '@dile/crud/components/ajax-select-crud/ajax-select-crud';
</script>
<dile-ajax-select-crud
    id="countryselect"
    idProperty="id"
    name="country_id"
    label="País"
    endpoint="https://timer.escuelait.com/api/countries" 
    queryStringVariable="keyword"
    placeholder="Buscar país"
    .getSelectResultList="${(response) => response.data.result.data}"
    displayProperty="name"
    selectDefaultPlaceholder="Seleccionar país..."
></dile-ajax-select-crud>
```