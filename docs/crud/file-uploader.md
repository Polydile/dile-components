---
title: File uploader
tags: 'Crud extras'
---

# dile-file-uploader

The `dile-file-uploader` component is a tool to upload files vía Ajax.

## Installation

```bash
npm i @dile/crud
```

## Usage

Import the `dile-file-uploader` component.

```javascript
import '@dile/crud/components/file-uploader/file-uploader.js';
```

Use the component.

```html
<dile-file-uploader 
  endpoint="/api/documents/upload"
  language="es"
></dile-file-uploader>
```

> This component is implemented with the `dile-ajax-form` component, so refer to the [dile-ajax documentation](/crud/ajax/) for more information on configuration requirements.

### Properties

- **endpoint**: String, the API endpoint to which the file data will be sent for upload.
- **language**: String, the feedback messages language. Available 'en', 'es'. Fallback to 'en'.
- **selectFileLabel**: String, the label text for the file selection field. If not provided, a translated text will be used based on the `language` property value.
- **saveLabel**: String, the label text for the save action button. If not provided, a translated text will be used based on the `language` property value.
- **allowedExtensions**: Array, defines the permitted file extensions for the uploaded file. Defaults to `['*']` which allows any file extension. Use an array with specific extensions like `['pdf', 'doc', 'docx']` to restrict file types.
- **responseAdapter**: Object, optional. API adapter object. See the [responseAdapter page](/crud/response-adapter/)) page for more information.

### Custom Events

The `dile-file-uploader` component is based on [`dile-ajax-form`](/crud/ajax-form/), so you can listen to the same custom events documented for that component.

- **file-uploaded**: This custom event is dispatched when the component recibes a positive response from the server. Has the same behaviour than `save-success` custom event on [`dile-ajax-form` component](/crud/ajax-form/).

