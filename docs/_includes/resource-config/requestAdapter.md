This property allows adapting the requests sent from the CRUD system to the API endpoints, so that it can communicate with the web service in the required way.

There is a detailed page with explanations about the [request adapter](/crud/request-adapter/).

#### Default `requestAdapter` value

The default configuration creates a generic request adapter using an instance of the `RequestApiAdapter` class.

```javascript
new RequestApiAdapter()
```
