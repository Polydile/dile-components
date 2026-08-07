import { describe, it, expect, afterEach } from 'vitest';
import './drop-file.js';

describe('dile-drop-file', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  async function renderDropFile(html) {
    document.body.innerHTML = html;
    const el = document.body.querySelector('dile-drop-file');
    await el.updateComplete;
    return el;
  }

  it('renders the drop zone with label and file input', async () => {
    const el = await renderDropFile('<dile-drop-file label="Upload"></dile-drop-file>');
    expect(el.shadowRoot.querySelector('#dropZone')).toBeTruthy();
    expect(el.shadowRoot.querySelector('label').textContent.trim()).toBe('Upload');
    expect(el.shadowRoot.querySelector('input[type="file"]')).toBeTruthy();
  });

  it('clears the selected file name', async () => {
    const el = await renderDropFile('<dile-drop-file></dile-drop-file>');
    el.fileName = 'test.png';
    await el.updateComplete;

    el.clear();
    await el.updateComplete;

    expect(el.fileName).toBe('');
  });
});
