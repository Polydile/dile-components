// Cropper.js is only downloaded the first time a dile-image-cropper needs to display an image.
// Importing the "cropperjs" module registers all the <cropper-*> custom elements.
let cropperModule = null;

export function loadCropper() {
  cropperModule ??= import('cropperjs');
  return cropperModule;
}
