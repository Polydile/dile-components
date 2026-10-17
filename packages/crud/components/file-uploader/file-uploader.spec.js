import { describe, it, expect, afterEach } from 'vitest';
import './file-uploader.js';

describe('dile-file-uploader', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  async function renderUploader(html) {
    document.body.innerHTML = html;
    const el = document.body.querySelector('dile-file-uploader');
    await el.updateComplete;
    const form = el.shadowRoot.querySelector('dile-file-uploader-form');
    await form.updateComplete;
    const dropFile = form.shadowRoot.querySelector('dile-drop-file');
    await dropFile.updateComplete;
    return { el, form, dropFile };
  }

  it('uses a single file field named "file" by default', async () => {
    const { dropFile } = await renderUploader('<dile-file-uploader endpoint="/upload"></dile-file-uploader>');
    expect(dropFile.getAttribute('name')).toBe('file');
    expect(dropFile.multiple).toBe(false);
  });

  it('uses a multiple field named "files" when multiple is set', async () => {
    const { form, dropFile } = await renderUploader('<dile-file-uploader endpoint="/upload" multiple></dile-file-uploader>');
    expect(dropFile.getAttribute('name')).toBe('files');
    expect(dropFile.multiple).toBe(true);
    expect(form.getData()).toEqual({ files: [] });
  });
});
