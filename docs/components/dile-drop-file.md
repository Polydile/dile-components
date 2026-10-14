---
title: Drop File
package: '@dile/ui'
element: '&lt;dile-drop-file&gt;'
status: stable
summary: File upload component with drag-and-drop support, preview, and extension validation. Includes manual file selection and clear functionality.
tags: forms
---

# dile-drop-file

This custom element provides a file upload field with drag-and-drop support, single file selection, preview, and extension validation. It integrates seamlessly with HTML forms for greater versatility, offering a rich user experience.

The component also offers a button to manually select a file and a clear option to remove the uploaded file. It's designed to simplify file handling in web applications while ensuring validation.

## Install

```bash
npm install @dile/ui
```

## Usage

Import the component.

```javascript
import "@dile/ui/components/drop-file/drop-file.js"
```

Use the component

```html
<dile-drop-file 
  name="fileinput"
  id="myFileInput" 
  label="Image to upload" 
  message="Select an image and press upload button"
></dile-drop-file>
```

### Properties

| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `name` | `String` | `""` | Name of the input element. |
| `label` | `String` | `""` | Label text displayed above the drop zone. |
| `message` | `String` | `""` | Message displayed below the drop zone, typically used for help or error messages. |
| `errored` | `Boolean` | `false` | Indicates whether there is an error in the drop zone. |
| `dropLabel` | `String` | `"Drop here your file"` | Label displayed inside the drop zone, instructing the user to drop a file. |
| `buttonLabel` | `String` | `"Select file"` | Label of the button shown in the drop zone. |
| `selectedFileLabel` | `String` | `"Selected file"` | Label shown when a file is selected. |
| `allowedExtensions` | `Array` | `[]` | Specifies the allowed file extensions for validation. Use `['*']` to allow any file extension. Example: `['pdf', 'doc', 'docx']`. |
| `extensionErrorMessage` | `String` | `"Only this file extensions are allowed: "` | Error message displayed when the selected file does not match the allowed extensions. |
| `accept` | `String` | `""` | Specifies the types of files allowed, filtering the native file picker. Example: `"application/pdf,image/*"` or `"image/*"`. When empty (default), no filtering is applied. |
| `capture` | `String` | `""` | On mobile devices, enables direct capture from camera or microphone. Valid values: `"user"` (front camera) or `"environment"` (rear camera). Only has effect on mobile devices; on desktop it is ignored. |

### Methods

- **openFileDialog()**: Opens the file selection dialog.
- **clear()**: Clear the file.
- **getFiles()**: get the files object.

### CSS Custom Properties

You can customize it using CSS Custom Properties.

Custom property | Description | Default
----------------|-------------|---------
--dile-drop-zone-min-height | Minimum height of the drop zone | auto
--dile-input-label-margin-bottom | Margin-bottom for the label | 4px
--dile-input-label-font-size | Font size for the label | 1em
--dile-input-label-color | Color of the label | #59e
--dile-input-label-font-weight | Font weight of the label | normal
--dile-input-section-width | Width of the input section | 100%
--dile-drop-zone-border-color | Drop section border color | #ccc

### Custom Events

- **dile-file-clear**: Fired when the selected file is cleared. The event contains no detail.
- **dile-drop-file-changed**: Dispatched when the file input value changes. Contains a detail object with the selected file.
- **element-changed**: This event is dispatched when value on the input changes. In the event detail will send the element name and value properties.

## Example

### Simple File Drop Zone

```html:preview
<script type="module">
import "@dile/ui/components/drop-file/drop-file.js"
</script>
<dile-drop-file label="Upload your file" dropLabel="Drop your file here"></dile-drop-file>
```

### Document Upload with Type Filtering

This example demonstrates a document upload field that filters for PDF and image files on the file picker:

```html:preview
<script type="module">
import "@dile/ui/components/drop-file/drop-file.js"
</script>
<dile-drop-file 
  label="Upload Document or Photo" 
  dropLabel="Drop PDF or image here"
  buttonLabel="Select Document or Photo"
  accept="application/pdf,image/*"
  allowedExtensions=${JSON.stringify(['pdf', 'jpg', 'jpeg', 'png', 'webp'])}
  extensionErrorMessage="Only PDF and image files (jpg, jpeg, png, webp) are allowed"
></dile-drop-file>
```

### Camera Capture on Mobile

This example shows how to take a photo directly from the device camera on mobile devices:

```html:preview
<script type="module">
import "@dile/ui/components/drop-file/drop-file.js"
</script>
<dile-drop-file 
  label="Take a Photo" 
  dropLabel="Drop image here or tap to take photo"
  buttonLabel="Take Photo"
  accept="image/*"
  capture="environment"
  allowedExtensions=${JSON.stringify(['jpg', 'jpeg', 'png', 'webp'])}
></dile-drop-file>
```
