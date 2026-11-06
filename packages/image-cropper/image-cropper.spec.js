import { describe, it, expect, afterEach } from 'vitest';
import './image-cropper.js';

function createImageFile(width = 400, height = 200, name = 'photo.png', type = 'image/png') {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext('2d');
  context.fillStyle = '#3366cc';
  context.fillRect(0, 0, width, height);
  return new Promise(resolve => {
    canvas.toBlob(blob => resolve(new File([blob], name, { type })), type);
  });
}

async function renderCropper(props = {}) {
  const el = document.createElement('dile-image-cropper');
  el.style.width = '400px';
  Object.assign(el, props);
  const ready = new Promise(resolve => {
    el.addEventListener('dile-image-cropper-ready', e => resolve(e), { once: true });
  });
  document.body.appendChild(el);
  return { el, ready };
}

describe('dile-image-cropper', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('renders nothing when there is no image', async () => {
    const el = document.createElement('dile-image-cropper');
    document.body.appendChild(el);
    await el.updateComplete;
    expect(el.shadowRoot.querySelector('cropper-canvas')).toBeNull();
  });

  it('lazy loads Cropper.js, renders the cropper and dispatches the ready event', async () => {
    const file = await createImageFile();
    const { el, ready } = await renderCropper({ file });
    const event = await ready;
    expect(customElements.get('cropper-canvas')).toBeDefined();
    expect(el.shadowRoot.querySelector('cropper-canvas')).not.toBeNull();
    expect(el.shadowRoot.querySelector('cropper-image').getAttribute('src')).toMatch(/^blob:/);
    expect(event.detail.width).toBeGreaterThan(0);
    expect(event.detail.height).toBeGreaterThan(0);
  });

  it('keeps the initial selection inside the image with the given aspect ratio', async () => {
    const file = await createImageFile(400, 200);
    const { el, ready } = await renderCropper({ file, aspectRatio: 1 });
    const { detail } = await ready;
    expect(Math.abs(detail.width - detail.height)).toBeLessThanOrEqual(1);
    const bounds = el._imageBounds();
    expect(detail.height).toBeLessThanOrEqual(bounds.height + 1);
  });

  it('exports a canvas with the configured output size', async () => {
    const file = await createImageFile();
    const { el, ready } = await renderCropper({ file, aspectRatio: 1, outputWidth: 100, outputHeight: 100 });
    await ready;
    const canvas = await el.getCanvas();
    expect(canvas.width).toBe(100);
    expect(canvas.height).toBe(100);
  });

  it('exports at the natural image resolution when no output size is set', async () => {
    const file = await createImageFile(1600, 800);
    const { el, ready } = await renderCropper({ file, aspectRatio: 1, initialCoverage: 1 });
    await ready;
    const canvas = await el.getCanvas();
    expect(Math.abs(canvas.width - 800)).toBeLessThanOrEqual(2);
    expect(Math.abs(canvas.height - 800)).toBeLessThanOrEqual(2);
  });

  it('getFile returns a File with the output type and matching extension', async () => {
    const file = await createImageFile();
    const { el, ready } = await renderCropper({ file, outputType: 'image/jpeg' });
    await ready;
    const result = await el.getFile('avatar.png');
    expect(result).toBeInstanceOf(File);
    expect(result.type).toBe('image/jpeg');
    expect(result.name).toBe('avatar.jpg');
  });

  it('uses the source file type and name by default', async () => {
    const file = await createImageFile(300, 300, 'me.png', 'image/png');
    const { el, ready } = await renderCropper({ file });
    await ready;
    const result = await el.getFile();
    expect(result.type).toBe('image/png');
    expect(result.name).toBe('me.png');
  });

  it('rejects selection changes that go outside the image', async () => {
    const file = await createImageFile(400, 200);
    const { el, ready } = await renderCropper({ file });
    const { detail } = await ready;
    const selection = el.shadowRoot.querySelector('cropper-selection');
    selection.$change(-50, -50, detail.width, detail.height);
    expect(selection.x).toBe(detail.x);
    expect(selection.y).toBe(detail.y);
  });

  it('reflects the round attribute and hides the shade', async () => {
    const file = await createImageFile();
    const { el, ready } = await renderCropper({ file, round: true });
    await ready;
    expect(el.hasAttribute('round')).toBe(true);
    expect(el.shadowRoot.querySelector('cropper-shade')).toBeNull();
  });
});
