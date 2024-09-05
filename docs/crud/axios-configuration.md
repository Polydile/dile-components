---
title: Axios configuration
tags: configuration
order: 1
---

# Axios configuration

A default Axios configuration may be implemented within the library using the `AxiosInstanceBuilder` class.

```javascript
import { AxiosInstanceBuilder } from '@dile/crud/lib/AxiosInstanceBuilder';
new AxiosInstanceBuilder();
```

After that, you can import all the components from the crud library that you need.

```javascript
import '@dile/crud/components/ajax/ajax.js';
import '@dile/crud/components/ajax-form/ajax-form.js';
```

## How to customize the Axios instance

There are two possible alternatives to customize the Axios instance that the components will use.

### ALTERNATIVE 1: Use your own Axios instance

The first alternative is to create your own Axios instance using your JavaScript code.

To generate it, you can refer to the [Axios library documentation](https://axios-http.com/docs/intro). We simply require you to place the Axios instance in the browser's `window` object.

```javascript
window.axios = myConfiguredAxiosInstance;
```

This is useful because some frameworks, like Laravel, include an Axios instance by default in the `window` object of the browser, which is already perfectly configured for tasks like sending csrf tokens via Ajax.

It is also useful if you are familiar with Axios and prefer to create your own instance, fully customized to your needs.

### ALTERNATIVE 2: Create a new Axios instance with AxiosInstanceBuilder

For very common use cases, we can assist you in easily creating the Axios instance using a minimal configuration. For this purpose, the package includes the `AxiosInstanceBuilder` class, that allows a easy configuration.

To use this class, you simply need to import it:

```javascript
import { AxiosInstanceBuilder } from '@dile/crud/lib/AxiosInstanceBuilder';
```

Then, we can create the Axios instance by creating an instance of the class:

```javascript
new AxiosInstanceBuilder();
```

The Axios instance created this way will be configured in a basic way, simply ensuring that the necessary headers are sent to the server to make XMLHttpRequest requests that expect JSON responses.

```javascript
headers: {
  'X-Requested-With': 'XMLHttpRequest',
  'Accept': 'application/json',
},
```

You can also set up a more specific configuration sending a configuration objetc to the constructor of the `AxiosInstanceBuilder` class.

```javascript
let configuration = {
  baseURL: 'http://localhost',
};

new AxiosInstanceBuilder(configuration);
```

In the above case, the configuration object used to create the Axios instance would look like this:

```javascript
{
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Accept': 'application/json',
  },
  baseURL: 'http://localhost',
}
```

#### Available configuration props

The configuration object used to create the Axios instance could have the following properties:

- **baseURL**: The base URL for the API.
- **withCredentials**: Boolean, determines if cross-site Access-Control requests should be made using credentials (e.g., cookies, authorization headers).
- **withXSRFToken**: Boolean, indicates whether XSRF tokens should be included in the requests.
- **headerAuthorization**: String, used to set the `Authorization` header with a token or other authentication credentials.

#### Example Configuration for an API with Bearer Token Authentication

For a REST API that uses Bearer token authentication, you could create the Axios instance like this:

```javascript
new AxiosInstanceBuilder({
  headerAuthorization: `Bearer ${this.token}`,
  baseURL: 'https://timer.escuelait.com'
});
```

#### Configuration example for a Website

If you're using these components in a more traditional website or with an API that uses cookies for authentication:

```javascript
new AxiosInstanceBuilder({
  withCredentials: true,
  withXSRFToken: true,
  baseURL: 'https://example.com'
});
```