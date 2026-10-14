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

  it('renders accept attribute when accept property is defined', async () => {
    const el = await renderDropFile('<dile-drop-file accept="application/pdf,image/*"></dile-drop-file>');
    const fileInput = el.shadowRoot.querySelector('input[type="file"]');
    expect(fileInput.getAttribute('accept')).toBe('application/pdf,image/*');
  });

  it('does not render accept attribute when accept property is empty', async () => {
    const el = await renderDropFile('<dile-drop-file accept=""></dile-drop-file>');
    const fileInput = el.shadowRoot.querySelector('input[type="file"]');
    expect(fileInput.getAttribute('accept')).toBeNull();
  });

  it('renders capture attribute when capture property is defined', async () => {
    const el = await renderDropFile('<dile-drop-file capture="environment"></dile-drop-file>');
    const fileInput = el.shadowRoot.querySelector('input[type="file"]');
    expect(fileInput.getAttribute('capture')).toBe('environment');
  });

  it('does not render capture attribute when capture property is empty', async () => {
    const el = await renderDropFile('<dile-drop-file capture=""></dile-drop-file>');
    const fileInput = el.shadowRoot.querySelector('input[type="file"]');
    expect(fileInput.getAttribute('capture')).toBeNull();
  });

  it('updates accept attribute when property changes after render', async () => {
    const el = await renderDropFile('<dile-drop-file></dile-drop-file>');
    let fileInput = el.shadowRoot.querySelector('input[type="file"]');
    expect(fileInput.getAttribute('accept')).toBeNull();
    
    el.accept = 'image/*';
    await el.updateComplete;
    
    fileInput = el.shadowRoot.querySelector('input[type="file"]');
    expect(fileInput.getAttribute('accept')).toBe('image/*');
  });

  it('updates capture attribute when property changes after render', async () => {
    const el = await renderDropFile('<dile-drop-file></dile-drop-file>');
    let fileInput = el.shadowRoot.querySelector('input[type="file"]');
    expect(fileInput.getAttribute('capture')).toBeNull();
    
    el.capture = 'user';
    await el.updateComplete;
    
    fileInput = el.shadowRoot.querySelector('input[type="file"]');
    expect(fileInput.getAttribute('capture')).toBe('user');
  });

  it('emits dile-drop-file-changed event when file is selected', async () => {
    const el = await renderDropFile('<dile-drop-file></dile-drop-file>');
    let eventDetail = null;
    el.addEventListener('dile-drop-file-changed', (e) => { eventDetail = e.detail; });

    const fileInput = el.shadowRoot.querySelector('input[type="file"]');
    const file = new File(['content'], 'test.pdf', { type: 'application/pdf' });
    Object.defineProperty(fileInput, 'files', {
      value: [file],
      writable: false,
    });
    
    fileInput.dispatchEvent(new Event('change', { bubbles: true }));
    await el.updateComplete;

    expect(eventDetail).toBeTruthy();
    expect(eventDetail.file).toEqual(file);
  });

  it('emits dile-drop-file-changed event with null when file is cleared', async () => {
    const el = await renderDropFile('<dile-drop-file></dile-drop-file>');
    let eventDetail = null;
    el.addEventListener('dile-drop-file-changed', (e) => { eventDetail = e.detail; });

    el.clear();
    await el.updateComplete;

    expect(eventDetail).toBeTruthy();
    expect(eventDetail.file).toBeNull();
  });
});
