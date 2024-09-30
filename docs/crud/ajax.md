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
- **statusSuccessCodes**: Array, the list of http response codes handled as success by this component. By default is [200, 201].
- **language**: String, the feedback messages language. Available 'en', 'es'. Falllback to 'en'.
- **sendDataAsFormData**: Boolean, default false. If sendDataAsFormData property is set to true, the `dile-ajax` component will send a formData object instead of a JSON object.

### Methods

- **generateRequest()**: method to execute the configured connection in the dile-ajax component.


### Custom Events

The component dispatches two custom events to notify the reception of the response in the connections:

- **ajax-success**: Dispatched when the server response has a successful HTTP status code.
- **ajax-error**: Dispatched when the response is received with an error HTTP status code.

In both cases, the custom event will include a detail with the data received in the server's HTTP response.

## Customize the HTTP request

The `dile-ajax` component uses [Axios](https://axios-http.com/) under the hood to make the request to the server. The configuration of this library is automatically handled by the component itself.

In the simplest cases, you may not need to customize any extra parameters in the HTTP requests, and thus you may not need to customize the Axios instance used for the HTTP requests. However, in most HTTP applications, it is very likely that you will need to change some details of Axios's behavior.

On the [documentation page for the CRUD components](/crud/), we explain the available mechanisms to configure Axios according to the needs of your project.

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
