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

  describe('multiple mode', () => {
    function createFile(name, content = 'content') {
      return new File([content], name, { lastModified: 1 });
    }

    function dropFiles(el, files) {
      const dataTransfer = new DataTransfer();
      files.forEach(file => dataTransfer.items.add(file));
      const dropZone = el.shadowRoot.querySelector('#dropZone');
      dropZone.dispatchEvent(new DragEvent('drop', { dataTransfer, bubbles: true, cancelable: true }));
      return el.updateComplete;
    }

    it('renders the file input with the multiple attribute', async () => {
      const el = await renderDropFile('<dile-drop-file multiple></dile-drop-file>');
      expect(el.shadowRoot.querySelector('input[type="file"]').hasAttribute('multiple')).toBe(true);
    });

    it('does not render the multiple attribute by default', async () => {
      const el = await renderDropFile('<dile-drop-file></dile-drop-file>');
      expect(el.shadowRoot.querySelector('input[type="file"]').hasAttribute('multiple')).toBe(false);
    });

    it('accepts several dropped files and renders a preview for each one', async () => {
      const el = await renderDropFile('<dile-drop-file multiple></dile-drop-file>');
      let eventDetail = null;
      el.addEventListener('dile-drop-file-changed', (e) => { eventDetail = e.detail; });

      await dropFiles(el, [createFile('a.txt'), createFile('b.txt')]);

      expect(el.shadowRoot.querySelectorAll('dile-file-preview').length).toBe(2);
      expect(el.value.map(file => file.name)).toEqual(['a.txt', 'b.txt']);
      expect(el.getFiles().length).toBe(2);
      expect(el.shadowRoot.querySelector('#fileInput').files.length).toBe(2);
      expect(eventDetail.files.map(file => file.name)).toEqual(['a.txt', 'b.txt']);
      expect(eventDetail.file.name).toBe('a.txt');
    });

    it('accumulates files between selections without duplicates', async () => {
      const el = await renderDropFile('<dile-drop-file multiple></dile-drop-file>');
      await dropFiles(el, [createFile('a.txt')]);
      await dropFiles(el, [createFile('a.txt'), createFile('b.txt')]);

      expect(el.value.map(file => file.name)).toEqual(['a.txt', 'b.txt']);
      expect(el.shadowRoot.querySelectorAll('dile-file-preview').length).toBe(2);
    });

    it('removes a single file with removeFile', async () => {
      const el = await renderDropFile('<dile-drop-file multiple></dile-drop-file>');
      await dropFiles(el, [createFile('a.txt'), createFile('b.txt'), createFile('c.txt')]);

      el.removeFile(1);
      await el.updateComplete;

      expect(el.value.map(file => file.name)).toEqual(['a.txt', 'c.txt']);
      expect(el.shadowRoot.querySelector('#fileInput').files.length).toBe(2);
    });

    it('removes a file when its preview clear link is clicked', async () => {
      const el = await renderDropFile('<dile-drop-file multiple></dile-drop-file>');
      await dropFiles(el, [createFile('a.txt'), createFile('b.txt')]);

      const preview = el.shadowRoot.querySelectorAll('dile-file-preview')[0];
      await preview.updateComplete;
      preview.shadowRoot.querySelector('a').click();
      await el.updateComplete;

      expect(el.value.map(file => file.name)).toEqual(['b.txt']);
    });

    it('discards files with invalid extensions and keeps the valid ones', async () => {
      const el = await renderDropFile('<dile-drop-file multiple></dile-drop-file>');
      el.allowedExtensions = ['pdf'];
      await dropFiles(el, [createFile('a.pdf'), createFile('b.exe')]);

      expect(el.value.map(file => file.name)).toEqual(['a.pdf']);
      expect(el.errored).toBe(true);
      expect(el.shadowRoot.querySelector('.message.errored-msg')).toBeTruthy();
    });

    it('clears all the files', async () => {
      const el = await renderDropFile('<dile-drop-file multiple></dile-drop-file>');
      await dropFiles(el, [createFile('a.txt'), createFile('b.txt')]);

      el.clear();
      await el.updateComplete;

      expect(el.value).toEqual([]);
      expect(el.shadowRoot.querySelectorAll('dile-file-preview').length).toBe(0);
    });

    it('sets all the files as form value', async () => {
      document.body.innerHTML = '<form><dile-drop-file name="docs" multiple></dile-drop-file></form>';
      const el = document.querySelector('dile-drop-file');
      await el.updateComplete;
      await dropFiles(el, [createFile('a.txt'), createFile('b.txt')]);

      const formData = new FormData(document.querySelector('form'));
      expect(formData.getAll('docs').map(file => file.name)).toEqual(['a.txt', 'b.txt']);
    });
  });
});
