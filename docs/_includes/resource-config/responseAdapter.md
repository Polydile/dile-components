This property allows adapting the API responses that the CRUD system communicates with. Thanks to this object, the components can work with any API, regardless of how its responses are structured.

On this site you can find a detailed page explaining [how to create the response adapter](/crud/response-adapter/).

#### Default `responseAdapter` value

The default configuration creates a generic response adapter using an instance of the `ResponseApiAdapter` class.

```javascript
new ResponseApiAdapter()
```
