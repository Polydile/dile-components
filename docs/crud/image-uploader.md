---
title: Image uploader
tags: 'Crud extras'
---

# dile-image-uploader

The `dile-image-uploader` component is a tool to set boolean properties in a resource.

## Installation

```bash
npm i @dile/crud
```

## Usage

Import the `dile-image-uploader` component.

```javascript
import '@dile/crud/components/image-uploader/image-uploader.js';
```

Use the component.

```html
<dile-image-uploader 
  endpoint="/api/board-games/1/upload-card"
  language="es"
></dile-image-uploader>
```


> This component is implemented with the `dile-ajax` component, so refer to the [dile-ajax documentation](/crud/ajax/) for more information on configuration requirements.

### Properties

- **endpoint**: String, the API endpoint to which the image data will be sent for upload.
- **language**: String, the feedback messages language. Available 'en', 'es'. Fallback to 'en'.
- **selectImageLabel**: String, the label text for the image selection field. If not provided, a translated text will be used based on the `language` property value.
- **saveLabel**: String, the label text for the save action button. If not provided, a translated text will be used based on the `language` property value.
- **allowedExtensions**: Array, defines the permitted file extensions for the uploaded image. Defaults to `['jpeg', 'jpg', 'png']`.
- **responseAdapter**: Object, optional. API adapter object. See the [responseAdapter page](/crud/response-adapter/)) page for more information.

### Custom Events

The `dile-image-uploader` component is based on [`dile-ajax-form`](/crud/ajax-form/), so you can listen to the same custom events documented for that component.

- **image-uploaded**: This custom event is dispatched when the component recibes a positive response from the server. Has the same behaviour than `save-success` custom event on [`dile-ajax-form` component](/crud/ajax-form/).

