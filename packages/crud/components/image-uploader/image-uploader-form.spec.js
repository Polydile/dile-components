import { describe, it, expect, afterEach } from 'vitest';
import './image-uploader-form.js';
import { translations } from '../../lib/i18n/en.js';

function createImageFile(width = 400, height = 200, name = 'photo.png') {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  canvas.getContext('2d').fillRect(0, 0, width, height);
  return new Promise(resolve => {
    canvas.toBlob(blob => resolve(new File([blob], name, { type: 'image/png' })), 'image/png');
  });
}

async function renderForm(props = {}) {
  const el = document.createElement('dile-image-uploader-form');
  el.style.width = '400px';
  Object.assign(el, { translations, allowedExtensions: ['png', 'jpg', 'jpeg'], ...props });
  document.body.appendChild(el);
  await el.updateComplete;
  return el;
}

function selectFile(el, file) {
  const dropFile = el.shadowRoot.querySelector('dile-drop-file');
  const dataTransfer = new DataTransfer();
  dataTransfer.items.add(file);
  dropFile.fileInput.files = dataTransfer.files;
  dropFile._handleFileInput();
}

async function waitFor(condition, timeout = 3000) {
  const start = performance.now();
  while (!condition()) {
    if (performance.now() - start > timeout) {
      throw new Error('waitFor timeout');
    }
    await new Promise(resolve => setTimeout(resolve, 20));
  }
}

describe('dile-image-uploader-form', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('shows the thumbnail and sends the original file when crop is disabled', async () => {
    const el = await renderForm();
    const file = await createImageFile();
    selectFile(el, file);
    await waitFor(() => el.imageInfo);
    await el.updateComplete;
    expect(el.shadowRoot.querySelector('dile-image-cropper')).toBeNull();
    expect(el.shadowRoot.querySelector('.image-summary img')).not.toBeNull();
    await el.prepareData();
    expect(el.getData().image).toBe(file);
  });

  it('renders the cropper and sends the cropped file when crop is enabled', async () => {
    const el = await renderForm({ crop: true, cropAspectRatio: 1, cropOutputWidth: 120, cropOutputHeight: 120 });
    const ready = new Promise(resolve => el.addEventListener('dile-image-cropper-ready', resolve, { once: true }));
    const file = await createImageFile();
    selectFile(el, file);
    await ready;
    const cropper = el.shadowRoot.querySelector('dile-image-cropper');
    expect(cropper).not.toBeNull();
    expect(el.shadowRoot.querySelector('.image-summary img')).toBeNull();

    await el.prepareData();
    const image = el.getData().image;
    expect(image).toBeInstanceOf(File);
    expect(image).not.toBe(file);
    expect(image.name).toBe('photo.png');
    const bitmap = await createImageBitmap(image);
    expect(bitmap.width).toBe(120);
    expect(bitmap.height).toBe(120);
  });

  it('removes the cropper when the selected file is cleared', async () => {
    const el = await renderForm({ crop: true });
    const ready = new Promise(resolve => el.addEventListener('dile-image-cropper-ready', resolve, { once: true }));
    selectFile(el, await createImageFile());
    await ready;
    el.shadowRoot.querySelector('dile-drop-file').clear();
    await el.updateComplete;
    expect(el.shadowRoot.querySelector('dile-image-cropper')).toBeNull();
    expect(el.cropFile).toBeNull();
  });
});
