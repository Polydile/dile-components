---
title: Ajax Input Suggestions
tags: 'Crud extras'
element: dile-ajax-input-suggestions
package: '@dile/crud'
summary: Free text field that requests its suggestions to an API endpoint while typing, using the configured Axios instance.
---

# dile-ajax-input-suggestions

Ajax variant of [dile-input-suggestions](/components/dile-input-suggestions/). It is a free text field whose suggestions come from an API endpoint, requested with the [configured Axios instance](/crud/axios-configuration/) while the user types. The value is always the typed text; choosing a suggestion copies its text and emits `dile-input-suggestions-selected` with the whole object.

The request API (`endpoint`, `queryStringVariable`, `getSelectResultList`...) is the same as [dile-ajax-select-crud-overlay](/crud/ajax-select-crud-overlay/).

## Installation

```bash
npm i @dile/crud
```

## Usage

Import the component.

```javascript
import '@dile/crud/components/ajax-input-suggestions/ajax-input-suggestions.js';
```

Use the component.

```html
<dile-ajax-input-suggestions
  name="concept"
  label="Concept"
  endpoint="/api/products"
  queryStringVariable="keyword"
  resultDataProperty="data"
></dile-ajax-input-suggestions>
```

While the user types (from `minLength` characters, after `delay` milliseconds), it requests `GET {endpoint}?{queryStringVariable}={text}`, plus `additionalQueryString` and the page size when set. Responses that arrive after a newer request are discarded, and a failed request shows no suggestions.

## Properties

All [dile-input-suggestions](/components/dile-input-suggestions/) properties (except `suggestions`), plus:

- **endpoint**: String, URL to request the suggestions.
- **queryStringVariable**: String (default `"q"`), query string variable with the typed text.
- **additionalQueryString**: Object, extra query string parameters for every request.
- **resultDataProperty**: String, first-level property of the response body holding the array.
- **getSelectResultList**: Function `(body) => array`, extracts the list from the response body. It has priority over `resultDataProperty`. Without both, the whole body is used.
- **pageParamName** / **maxResults**: String / Number, when both are set, `maxResults` is sent in the `pageParamName` parameter.

## Events

- **element-changed**: when the text changes. `detail: { name, value }`.
- **dile-input-suggestions-selected**: when a suggestion is chosen. `detail: { name, item }`.
