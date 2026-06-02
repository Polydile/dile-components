---
title: Ajax
tags: ajax
---

# dile-ajax

The `dile-ajax` component is a tool designed to make asynchronous HTTP connections (Ajax) declaratively, without having to write JavaScript code.

The idea behind this component is to configure a series of attributes to define the parameters of the Ajax connection. Then, the connection is made by invoking a method from the component's API, and the response is received through two possible events: one for successful connections and another for connections that return error codes.

## Installation

```bash
npm i @dile/crud
```

## Usage

Import the dile-ajax component.

```javascript
import '@dile/crud/components/ajax/ajax.js';
```

Use the component.

```html
<dile-ajax
  method="get"
  url="api/countries"
  @ajax-error=${this.manageErrors}
  @ajax-success=${this.manageSuccess}
></dile-ajax>
```

To produce the Ajax request, it is necessary to invoke the `generateRequest()` method of the component.

```javascript
ajaxComponent.generateRequest();
```

Once the method is invoked, the response will be received in one of the two custom events emitted by this component.

> Note that this is a "non-presentational" component. Therefore, it will not produce any output in the template. It is only used to implement the Ajax functionality.

### Properties

- **method**: String, the HTTP method of the connection. It must be one of the following values: "get", "post", "put", "delete", "patch".
- **data**: Object, the data that will be sent to the server. In GET requests, the data will be sent via query string. In other types of requests, the data will be sent in the body of the HTTP request.
- **url**: String, the URL for the conection.
- **statusSuccessCodes**: Array, the list of http response codes handled as success by this component. By default is [200, 201, 202].
- **language**: String, the feedback messages language. Available 'en', 'es'. Fallback to 'en'.
- **sendDataAsFormData**: Boolean, default false. If sendDataAsFormData property is set to true, the `dile-ajax` component will send a formData object instead of a JSON object.
- **getValidationErrors**: Object, a function that receives the full response data and returns the validation errors. See the explanation below on providing validation errors.
- **responseType**: String, default empty. When set to `'blob'`, the response is treated as binary data instead of JSON. See the [File downloads (blob)](#file-downloads-blob) section below.

### Methods

- **generateRequest()**: method to execute the configured connection in the dile-ajax component.


### Custom Events

The component dispatches custom events to notify the lifecycle of the HTTP request and the reception of the response:

- **dile-ajax-request-start**: Dispatched when the request begins, right before sending the HTTP request to the server. Useful for showing loading indicators or disabling controls while the request is in progress.

- **dile-ajax-request-end**: Dispatched when the request finishes, regardless of success or error. This includes the finally stage of the Promise. Useful for hiding loading indicators or re-enabling controls.

- **ajax-success**: Dispatched when the server response has a successful HTTP status code. The detail of the event depends on the `responseType` property:
  - **Default (JSON)**: the detail is the JSON returned by the server.
  - **`responseType="blob"`**: the detail is an object with these properties:
    - `blob`: the `Blob` object with the binary content of the file.
    - `filename`: the filename extracted from the `Content-Disposition` response header. Falls back to `'download'` if the header is absent.
    - `contentType`: the value of the `Content-Type` response header.
- **ajax-error**: Dispatched when the response is received with an error HTTP status code. The detail of the event is an object with these properties:

    ```json
    {
      message, 
      errors,
      data
    }
    ```

    - `message` is an human readable description of the error. To make the description the component try to reach a `message` property on the server response. If this property exists, then the component will use it as the message. If this property does not exists, then the component creates a standar descripcion based on the HTTP status code.
    - `errors` is an array of errors, generally usable for validation purpouses. `data` is the entire JSON response. 
    - `data` is the complete server response JSON content.

> The `ajax-success` and `ajax-error` custom events are not configured with `bubbles: true`, so they must be listened to directly on the `dile-ajax` component tag. However, `dile-ajax-request-start` and `dile-ajax-request-end` are configured with `bubbles: true` and `composed: true`, allowing them to be listened to on parent elements.

- **ajax-response**: Dispatched when the response is received, in both cases (error and success). The detail of this custom event has a `response` property with the entire Axios response object.


## Customize the HTTP request

The `dile-ajax` component uses [Axios](https://axios-http.com/) under the hood to make the request to the server. The configuration of this library is automatically handled by the component itself.

In the simplest cases, you may not need to customize any extra parameters in the HTTP requests, and thus you may not need to customize the Axios instance used for the HTTP requests. However, in most HTTP applications, it is very likely that you will need to change some details of Axios's behavior.

On the [documentation page for the CRUD components](/crud/general-information/), we explain the available mechanisms to configure Axios according to the needs of your project.

## Providing validation errors

The component will attempt to provide the client with a complete list of validation errors detected by the server when it receives status codes 400 and 422. By default, for validation errors, the component expects to receive a JSON response like this:

```json
{
    "message": "The name is incorrect and there are two more validation errors",
    "errors": {
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
}
```

In this response, there are two properties. First, a `message` property that provides an overall description of the validation issue. Then, an `errors` property that contains the details of the validation errors.

> For the `dile-ajax` component, the format of the `errors` property’s value doesn’t matter. However, for more complex CRUD components to display specific validation errors next to each field that failed validation, the `errors` property should be an object where each property name corresponds to the field with an error, and each value is an array containing the errors found for that field.

If the REST API we’re working with does not send the `message` property in the JSON response, the `dile-ajax` component will send a generic error message.

If the REST API does not send the `errors` property as expected, we can use the component’s `getValidationErrors` property to help `dile-ajax` locate where the errors are.

```html
<dile-ajax .getValidationErrors=${(data) => data.result.validationErrors}></dile-ajax>
```

As shown, we simply bind a function to the `getValidationErrors` property, which receives the complete JSON response from the server and returns the path to the validation errors array provided by the API.

## File downloads (blob)

Set `responseType="blob"` to download binary files (PDFs, images, spreadsheets, etc.) through the same `dile-ajax` component, without needing a separate component or a raw `<a>` tag.

```html
<dile-ajax
  id="fileDownload"
  method="get"
  url="/api/reports/january.pdf"
  responseType="blob"
  @ajax-success="${this._handleBlob}"
  @ajax-error="${this._handleError}"
></dile-ajax>
```

When `responseType="blob"`, the `ajax-success` event detail contains `{ blob, filename, contentType }` instead of the usual JSON:

```javascript
_handleBlob(e) {
  const { blob, filename, contentType } = e.detail;
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
```

### Filename resolution

The `filename` value is extracted from the `Content-Disposition` header that the server sends in the response:

```
Content-Disposition: attachment; filename="report-january.pdf"
```

If the server does not send this header, `filename` falls back to `'download'`. It is good practice to always include `Content-Disposition` in file download endpoints so that the browser saves the file with the correct name and extension.

### Error handling with blob

When `responseType="blob"` and the server returns an error status (4xx, 5xx), the error body also arrives as a `Blob`. The component automatically converts it back to JSON before dispatching `ajax-error`, so the `ajax-error` handler works exactly the same as in the JSON case:

```javascript
_handleError(e) {
  console.error(e.detail.message); // human-readable message from the server
}
```

### CORS requirement

Downloading a blob from a cross-origin server requires proper CORS headers on the server, just like any other XHR/fetch request. This applies even to public resources such as images or PDFs: the browser allows `<img>` and `<a>` tags to load cross-origin resources without CORS, but `XMLHttpRequest` (used by Axios) always enforces CORS for cross-origin requests.

Make sure the server returns:

```
Access-Control-Allow-Origin: https://your-app.com
Access-Control-Allow-Headers: X-Requested-With
```

If the server does not return these headers, the request will fail with "No response received from the server". The solution is to configure CORS on the server or to proxy the request through your own backend.

## dile-ajax demos

### Ajax GET request example

```html:preview
<script type="module">
    import '@dile/crud/components/ajax/ajax.js';
</script>
<dile-ajax
  id="ajaxelement"
  method="get"
  url="https://timer.escuelait.com/api/countries"
></dile-ajax>
<p>
  <button id="getButton">Get country list</button>  
</p>
<p id="message">Push the button to get countries list...</p>
<script>
  document.addEventListener('DOMContentLoaded', function() {
    const ajaxelement = document.getElementById('ajaxelement');
    document.getElementById('getButton').addEventListener('click', function() {
      ajaxelement.generateRequest();
    });
    ajaxelement.addEventListener('ajax-error', function(e) {
      console.error('Error Ajax:', e.detail);
    });
    ajaxelement.addEventListener('ajax-success', function(e) {
      console.log('Success Ajax:', e.detail);
      const messageElement = document.getElementById('message');
      const countryNames = e.detail.data.map(country => country.name).join(', ');
      messageElement.textContent = countryNames;
    })
  });
</script>
```

### Ajax POST request example

```html:preview
<dile-ajax
  id="ajaxcreate"
  method="post"
  url="https://timer.escuelait.com/api/countries"
></dile-ajax>
<p>
  <input type="text" id="countryName" placeholder="Name"> <button id="postButton">Create country</button>  
</p>
<p id="messagecreate">Write a name and push the button to create a new country...</p>
<script>
  function createSlug(inputString) {
    let slug = inputString.toLowerCase();
    slug = slug.replace(/[^a-z0-9\s-]/g, ' ');
    slug = slug.replace(/[\s-]+/g, ' ');
    slug = slug.trim();
    slug = slug.replace(/\s+/g, '-');        
    return slug;
  }

  document.addEventListener('DOMContentLoaded', function() {
    const ajaxcreate = document.getElementById('ajaxcreate');
    const messageElement = document.getElementById('messagecreate');
    document.getElementById('postButton').addEventListener('click', function() {
      const countryName = document.getElementById('countryName').value;
      if(countryName == '') {
        messageElement.textContent = 'Please provide a country name';
        return;
      }
      const slug = createSlug(countryName);
      ajaxcreate.data = {
        name: countryName,
        slug,
        continent: 'Europe',
      }
      ajaxcreate.generateRequest();
    });
    ajaxcreate.addEventListener('ajax-error', function(e) {
      messageElement.textContent = 'Ajax error, see complete error on the console';
      console.error('Error Ajax:', e.detail);
    });
    ajaxcreate.addEventListener('ajax-success', function(e) {
      console.log('Success Ajax:', e.detail);
      messageElement.textContent = 'Country inserted';
    })
  });
</script>
```
