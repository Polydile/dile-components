---
title: Image uploader
tags: 'Crud extras'
element: dile-image-uploader
package: '@dile/crud'
summary: Lightweight component to upload images to your API via Ajax.
---

# dile-image-uploader

The `dile-image-uploader` component is a tool to upload images vía Ajax.

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
- **maxFileSize**: Number, optional. Maximum allowed file size in bytes. If the selected image exceeds it, the selection is rejected and an error message is shown.
- **minWidth** / **maxWidth**: Number, optional. Minimum/maximum allowed image width in pixels.
- **minHeight** / **maxHeight**: Number, optional. Minimum/maximum allowed image height in pixels.
- **crop**: Boolean, default `false`. Shows an image cropper after selecting a file, so the user can crop the image before uploading it. See "Image cropping" below.
- **cropAspectRatio**: Number, optional. Fixed aspect ratio of the crop selection, e.g. `1` for square avatars. Free selection if not set.
- **cropOutputWidth** / **cropOutputHeight**: Number, optional. Size in pixels of the uploaded cropped image. If not set, the crop keeps the natural resolution of the original image.
- **cropOutputType**: String, optional. MIME type of the cropped image (`image/png`, `image/jpeg`, `image/webp`). Defaults to the type of the selected file.
- **cropRound**: Boolean, default `false`. Shows a circular mask in the cropper, useful for avatars. It's only visual: the uploaded image is still rectangular.

### Image validation and preview

After selecting a file, the component decodes it in the browser to check that it's a real, non-empty, non-corrupted image before accepting it. If `maxFileSize`, `minWidth`, `maxWidth`, `minHeight` or `maxHeight` are set and the image doesn't comply, the selection is rejected and a translated error message is shown, the same way an invalid extension is reported.

Once a valid image is accepted, a thumbnail and a summary (`width × height px · file size`) are shown below the drop zone, so the user can confirm the file is the expected one before submitting.

### Image cropping

When `crop` is set, after a valid image is selected the thumbnail is replaced by a [dile-image-cropper](/components/dile-image-cropper/) component. The user selects the area to keep and, when the form is submitted, the cropped image is sent in the `image` field instead of the original file. The validation rules (`maxFileSize`, `minWidth`...) are checked against the original image.

```html
<dile-image-uploader
  endpoint="/api/users/1/avatar"
  crop
  cropAspectRatio="1"
  cropOutputWidth="400"
  cropOutputHeight="400"
  cropRound
></dile-image-uploader>
```

The cropper is based on Cropper.js v2, which is **only loaded when `crop` is enabled** and an image is selected, through a dynamic import. If you don't use `crop`, Cropper.js is never downloaded.

### Custom Events

The `dile-image-uploader` component is based on [`dile-ajax-form`](/crud/ajax-form/), so you can listen to the same custom events documented for that component.

- **image-uploaded**: This custom event is dispatched when the component recibes a positive response from the server. Has the same behaviour than `save-success` custom event on [`dile-ajax-form` component](/crud/ajax-form/).

