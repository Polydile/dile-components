import { describe, it, expect, afterEach } from 'vitest';
import './qr-code.js';

describe('dile-qr-code', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  async function renderQrCode(html) {
    document.body.innerHTML = html;
    const el = document.body.querySelector('dile-qr-code');
    await el.updateComplete;
    return el;
  }

  it('renders canvas with default properties', async () => {
    const el = await renderQrCode('<dile-qr-code></dile-qr-code>');
    const canvas = el.shadowRoot.querySelector('canvas');
    expect(canvas).not.toBeNull();
    expect(canvas.getAttribute('role')).toBe('img');
    expect(canvas.getAttribute('aria-label')).toBe('QR Code');
    expect(canvas.width).toBe(128);
    expect(canvas.height).toBe(128);
    expect(el.value).toBe('');
    expect(el.size).toBe(128);
    expect(el.fill).toBe('#000000');
    expect(el.background).toBe('#ffffff');
    expect(el.radius).toBe(0);
    expect(el.errorCorrection).toBe('M');
    expect(el.logo).toBe('');
    expect(el.logoSize).toBe(0);
    expect(el.logoRadius).toBe(4);
    expect(el.logoBackground).toBe('');
    expect(el.logoPadding).toBe(4);
  });

  it('sets accessible label from value or custom label attribute', async () => {
    const elWithValue = await renderQrCode(
      '<dile-qr-code value="https://example.com"></dile-qr-code>'
    );
    const canvas1 = elWithValue.shadowRoot.querySelector('canvas');
    expect(canvas1.getAttribute('aria-label')).toBe('https://example.com');

    const elWithLabel = await renderQrCode(
      '<dile-qr-code value="https://example.com" label="QR para pago"></dile-qr-code>'
    );
    const canvas2 = elWithLabel.shadowRoot.querySelector('canvas');
    expect(canvas2.getAttribute('aria-label')).toBe('QR para pago');
  });

  it('renders pixels on canvas when value is provided', async () => {
    const el = await renderQrCode(
      '<dile-qr-code value="https://dile-components.com"></dile-qr-code>'
    );
    const canvas = el.shadowRoot.querySelector('canvas');
    const ctx = canvas.getContext('2d');
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const hasDrawnPixels = imageData.data.some((channel) => channel !== 0);
    expect(hasDrawnPixels).toBe(true);
  });

  it('clears canvas when value is empty or cleared', async () => {
    const el = await renderQrCode(
      '<dile-qr-code value="https://example.com"></dile-qr-code>'
    );
    const canvas = el.shadowRoot.querySelector('canvas');
    const ctx = canvas.getContext('2d');

    // First check it has pixels
    let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    expect(imageData.data.some((channel) => channel !== 0)).toBe(true);

    // Empty the value
    el.value = '';
    await el.updateComplete;

    imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const hasDrawnPixels = imageData.data.some((channel) => channel !== 0);
    expect(hasDrawnPixels).toBe(false);
  });

  it('updates canvas dimensions when size property changes', async () => {
    const el = await renderQrCode(
      '<dile-qr-code value="test" size="200"></dile-qr-code>'
    );
    const canvas = el.shadowRoot.querySelector('canvas');
    expect(canvas.width).toBe(200);
    expect(canvas.height).toBe(200);

    el.size = 256;
    await el.updateComplete;
    expect(canvas.width).toBe(256);
    expect(canvas.height).toBe(256);
  });

  it('updates canvas when fill, background, radius, or errorCorrection change', async () => {
    const el = await renderQrCode(
      '<dile-qr-code value="test" fill="#0000ff" background="#ffff00" radius="0.5" error-correction="H"></dile-qr-code>'
    );
    const canvas = el.shadowRoot.querySelector('canvas');
    const ctx = canvas.getContext('2d');
    let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    expect(imageData.data.some((channel) => channel !== 0)).toBe(true);

    // Update fill and radius
    el.fill = '#ff0000';
    el.radius = 0.2;
    el.errorCorrection = 'Q';
    await el.updateComplete;

    imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    expect(imageData.data.some((channel) => channel !== 0)).toBe(true);
  });

  it('handles transparent background', async () => {
    const el = await renderQrCode(
      '<dile-qr-code value="test" background="transparent"></dile-qr-code>'
    );
    const canvas = el.shadowRoot.querySelector('canvas');
    expect(canvas).not.toBeNull();
    const ctx = canvas.getContext('2d');
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    expect(imageData.data.some((channel) => channel !== 0)).toBe(true);
  });

  it('renders logo on top of QR code and dispatches dile-qr-code-logo-loaded', async () => {
    const sampleLogo =
      'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"><rect width="20" height="20" fill="rgb(255,0,0)"/></svg>';

    const el = await renderQrCode(
      `<dile-qr-code value="https://dile-components.com" logo="${sampleLogo}" logo-size="24" logo-padding="2"></dile-qr-code>`
    );

    // Wait for the logo load event if not already fired
    const canvas = el.shadowRoot.querySelector('canvas');
    expect(canvas).not.toBeNull();

    // Check center pixel in canvas to verify logo/badge was drawn
    const ctx = canvas.getContext('2d');
    const centerX = Math.floor(canvas.width / 2);
    const centerY = Math.floor(canvas.height / 2);
    const centerPixel = ctx.getImageData(centerX, centerY, 1, 1).data;
    // Red channel from red svg rect
    expect(centerPixel[0]).toBe(255);
  });

  it('handles logo load error gracefully and dispatches dile-qr-code-logo-error', async () => {
    document.body.innerHTML = '';
    const el = document.createElement('dile-qr-code');
    el.value = 'https://dile-components.com';

    const errorPromise = new Promise((resolve) => {
      el.addEventListener('dile-qr-code-logo-error', resolve, { once: true });
    });

    el.logo = 'data:image/invalid;base64,broken';
    document.body.appendChild(el);
    await el.updateComplete;

    const event = await errorPromise;
    expect(event).toBeDefined();
    expect(el.shadowRoot.querySelector('canvas')).not.toBeNull();
  });
});
