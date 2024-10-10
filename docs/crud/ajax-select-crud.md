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


> This component not documented yet.

### Properties

`dile-ajax-select-crud` is a specialization of `[dile-select-ajax](/components/dile-select-ajax/)`, so it offers all the properties documented for that component.

In addition, `dile-ajax-select-crud` introduces these additional properties:

- **maxResults**: Number, defines the maximum number of results that can be returned in a single request.
- **pageParamName**: String, the name of the parameter used to indicate the page size in the request (corresponding to the `maxResults` property).
- **getSelectResultList**: Object, a function that takes the full response and returns the list of selected results. This is used to extract the correct data from the JSON response object. 

### dile-ajax-select-crud example

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
    resultDataProperty="data"
    displayProperty="name"
    selectDefaultPlaceholder="Seleccionar país..."
></dile-ajax-select-crud>
```
