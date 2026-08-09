---
title: Ajax Select Crud Overlay
tags: 'Crud extras'
---

# dile-ajax-select-crud-overlay

Same tool as [dile-ajax-select-crud](/crud/ajax-select-crud/) to select elements with ajax searches through axios, but results appear directly in a floating popup as soon as they load — no extra click needed to open a native select and pick an option.

Is based on [dile-select-ajax-overlay](/components/dile-select-ajax-overlay/) the same way `dile-ajax-select-crud` is based on `dile-select-ajax`: it overrides the data-fetching methods to go through [dile-ajax](/crud/ajax/)/Axios instead of the native fetch API, while inheriting all of `dile-select-ajax-overlay`'s composed-popup UI.

## Installation

```bash
npm i @dile/crud
```

## Usage

Import the dile-ajax-select-crud-overlay component.

```javascript
import '@dile/crud/components/ajax-select-crud/ajax-select-crud-overlay.js';
```

Use the component.

```html
<dile-ajax-select-crud-overlay
    id="countryselect"
    idProperty="id"
    name="country_id"
    label="Country"
    endpoint="https://timer.escuelait.com/api/countries"
    queryStringVariable="keyword"
    placeholder="Search country"
    resultDataProperty="data"
    displayProperty="name"
></dile-ajax-select-crud-overlay>
```

### Properties

`dile-ajax-select-crud-overlay` is a specialization of [`dile-select-ajax-overlay`](/components/dile-select-ajax-overlay/), so it offers all the properties documented for that component (note it does not have a `selectDefaultPlaceholder` property either, for the same reason: there's no native `<select>` placeholder row to label).

In addition, `dile-ajax-select-crud-overlay` introduces these additional properties:

- **maxResults**: Number, defines the maximum number of results that can be returned in a single request.
- **pageParamName**: String, the name of the parameter used to indicate the page size in the request (corresponding to the `maxResults` property).
- **getSelectResultList**: Object, a function that takes the full response and returns the list of selected results. This is used to extract the correct data from the JSON response object.

### Custom Events

Refer to the [dile-select-ajax-overlay documentation](/components/dile-select-ajax-overlay/#events) for information about custom events, as `dile-ajax-select-crud-overlay` inherits all events from that component.

### Adapting API Responses When Fetching a List

Same two mechanisms as `dile-ajax-select-crud`, in the same priority order — see [its documentation](/crud/ajax-select-crud/#adapting-api-responses-when-fetching-a-list) for the full explanation with examples:

- **getSelectResultList**: highest priority, most versatile — a function `(response) => array`.
- **resultDataProperty**: lower priority, a string naming the top-level property that holds the array.
- If neither is set, the whole response body is assumed to be the array.

## Configuring Axios

Since `dile-ajax-select-crud-overlay` uses Axios internally through `dile-ajax`, you can configure the Axios instance to suit your project's needs. For detailed information on how to set up authentication tokens, custom headers, interceptors, and other advanced configurations, refer to the [Axios Configuration guide](/crud/axios-configuration/).

## dile-ajax-select-crud-overlay example

```html:preview
<script type="module">
    import { LitElement, html, css } from 'lit';
    import '@dile/crud/components/ajax-select-crud/ajax-select-crud-overlay';

    export class DileSelectAjaxCrudOverlayDemo extends LitElement {
        static styles = [
            css`
            :host {
                display: block;
                position: relative;
            }
            `
        ];

        render() {
            return html`
                <dile-ajax-select-crud-overlay
                    id="countryselect"
                    idProperty="id"
                    name="country_id"
                    label="País"
                    endpoint="https://timer.escuelait.com/api/countries"
                    queryStringVariable="keyword"
                    placeholder="Buscar país"
                    .getSelectResultList="${(response) => response.data}"
                    displayProperty="name"
                ></dile-ajax-select-crud-overlay>
            `;
        }
    }
    customElements.define('dile-select-ajax-crud-overlay-demo', DileSelectAjaxCrudOverlayDemo);

</script>
<dile-select-ajax-crud-overlay-demo></dile-select-ajax-crud-overlay-demo>
```
