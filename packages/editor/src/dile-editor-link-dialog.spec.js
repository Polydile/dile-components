import { describe, it, expect, afterEach } from 'vitest';
import './dile-editor-link-dialog.js';

describe('dile-editor-link-dialog', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  async function renderDialog() {
    document.body.innerHTML = '<dile-editor-link-dialog></dile-editor-link-dialog>';
    const el = document.body.querySelector('dile-editor-link-dialog');
    await el.updateComplete;
    return el;
  }

  it('renders the url and title inputs', async () => {
    const el = await renderDialog();
    expect(el.urlInput).toBeTruthy();
    expect(el.titleInput).toBeTruthy();
  });

  it('opens and closes the menu overlay', async () => {
    const el = await renderDialog();
    let opened = false;
    let closed = false;
    el.menu.addEventListener('overlay-opened', () => { opened = true; });
    el.menu.addEventListener('overlay-closed', () => { closed = true; });

    el.open();
    expect(opened).toBe(true);

    // The overlay only becomes closable once its opening delay has finished.
    await new Promise((resolve) => setTimeout(resolve, 100));
    el.close();
    expect(closed).toBe(true);
  });

  it('dispatches accept-link-dialog with the entered url and title', async () => {
    const el = await renderDialog();
    el.urlInput.value = 'https://example.com';
    el.titleInput.value = 'Example';

    let detail = null;
    el.addEventListener('accept-link-dialog', (e) => { detail = e.detail; });
    el.accept();

    expect(detail).toEqual({ url: 'https://example.com', title: 'Example' });
  });
});
