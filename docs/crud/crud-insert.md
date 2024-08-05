---
title: Crud Insert
tags: crud
---

# dile-crud-insert

The `dile-crud-insert` component is essentially a wrapper around [dile-ajax-form](/crud/ajax-form/), configured to perform the operation of inserting records into a REST API more conveniently and with less verbosity.

Additionally, instead of using slots for injecting the insertion form for the resource, the component uses a template function, assigned via an attribute of the component. This alternative provides greater versatility for the insertion component.

## Installation

```bash
npm i @dile/crud
```

## Usage

Import the dile-ajax component.

```javascript
import '@dile/crud/components/crud-insert/crud-insert.js';
```
Use the component.

```html
<dile-crud-insert
  title="Insert a country"
  endpoint="api/countries"
  .apiConfig=${this.apiConfig}
  .formTemplate=${html`<demo-countries-form id="form"></demo-countries-form>`}
></dile-crud-insert>
```

### Properties

- **title**: String, optionally you can specify a title to head the form.
- **endpoint**: String, the endpoint of the resource where we want to insert records.
- **actionLabel**: String, the text of the form submission button.
- **belongsTo**: String, specifies the parent resource this record belongs to.
- **relationId**: String, the identifier of the parent resource.
- **formTemplate**: Object, the template with the component that acts as the form for the record to be inserted. The component must have an identifier (id attribute), typically "form".
- **buttonSmall**: Boolean, indicates whether a small button is desired for the form submission button.
- **apiConfig**: Object, an API configuration object (see examples below).
- **formIdentifier**: String, if the identifier of the component is not "form", it must be specified in this attribute.
