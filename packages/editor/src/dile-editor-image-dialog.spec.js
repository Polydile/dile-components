import { describe, it, expect, afterEach } from 'vitest';
import './dile-editor-image-dialog.js';

describe('dile-editor-image-dialog', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  async function renderDialog() {
    document.body.innerHTML = '<dile-editor-image-dialog></dile-editor-image-dialog>';
    const el = document.body.querySelector('dile-editor-image-dialog');
    await el.updateComplete;
    return el;
  }

  it('renders the src and alt inputs', async () => {
    const el = await renderDialog();
    expect(el.srcInput).toBeTruthy();
    expect(el.altInput).toBeTruthy();
  });

  it('opens the menu overlay', async () => {
    const el = await renderDialog();
    let opened = false;
    el.menu.addEventListener('overlay-opened', () => { opened = true; });

    el.open({ state: { selection: {} } });

    expect(opened).toBe(true);
  });

  it('dispatches accept-image-dialog with the entered src and alt', async () => {
    const el = await renderDialog();
    el.srcInput.value = 'https://example.com/img.png';
    el.altInput.value = 'An image';

    let detail = null;
    el.addEventListener('accept-image-dialog', (e) => { detail = e.detail; });
    el.accept();

    expect(detail).toEqual({ src: 'https://example.com/img.png', alt: 'An image' });
  });
});
