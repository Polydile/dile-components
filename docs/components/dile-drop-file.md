---
title: Drop File
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

- **name**: String, name of the input element
- **label**: String, label text displayed above the drop zone.
- **message**: String, message displayed below the drop zone, tipically used for help or error messages.
- **errored**: Boolean, indicates whether there is an error in the drop zone.
- **dropLabel**: String, label displayed inside the drop zone, instructing the user to drop a file.
- **buttonLabel**: String, label of the button shown in the drop zone.
- **selectedFileLabel**: String, label shown when a file is selected.
- **allowedExtensions**: Array, specifies the allowed file extensions for validation.
- **extensionErrorMessage**: String, error message displayed when the selected file does not match the allowed extensions.

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
