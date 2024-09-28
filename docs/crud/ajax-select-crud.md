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
