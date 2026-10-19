import { describe, it, expect, afterEach, vi } from 'vitest';
import './scanner.js';
import {
  documentCanvas,
  canvasToFile,
  documentFile,
  waitFor,
  nextEvent,
  imageSize,
  renderScanner,
  openScanner,
  query,
  queryAll,
  button,
  pageButtons,
  pages,
  errorMessage,
  selectFiles,
  waitForIdle,
  waitForEditor,
  waitForPages,
  acceptAdjust,
  scanFiles,
  save,
} from './test/scanner-test-helpers.js';

describe('dile-scanner', () => {
  afterEach(() => {
    document.body.innerHTML = '';
    vi.restoreAllMocks();
  });

  it('starts on the capture step when opened', async () => {
    const el = await openScanner();

    expect(query(el, 'dile-modal').opened).toBe(true);
    expect(query(el, 'h2').textContent).toBe('Scan document');
    expect(button(el, 'image').textContent.trim()).toBe('Choose image');
    expect(button(el, 'camera')).toBeNull();
    expect(query(el, '#galleryinput').multiple).toBe(false);
  });

  it('detects the document and returns a PDF with one page', async () => {
    const el = await openScanner('filename="invoice"');
    selectFiles(el, [await documentFile()]);
    await waitForEditor(el);

    expect(query(el, '.step:not([hidden]) .message').textContent.trim()).toBe(
      'Drag the corners to the edges of the document.',
    );

    await acceptAdjust(el);
    await waitForPages(el, 1);
    const detail = await save(el);

    expect(detail.file.name).toBe('invoice.pdf');
    expect(detail.file.type).toBe('application/pdf');
    expect(detail.pages).toHaveLength(1);
    expect(detail.pages[0].name).toBe('invoice.jpg');
    expect(detail.files).toBeUndefined();
    expect(query(el, 'dile-modal').opened).toBe(false);
  });

  it('names the result with the prefix and the date when there is no filename', async () => {
    const el = await openScanner();
    await scanFiles(el, [await documentFile()]);
    const detail = await save(el);

    expect(detail.file.name).toMatch(/^scan-\d{4}-\d{2}-\d{2}-\d{4}\.pdf$/);
  });

  it('adjusts several images one after another and joins them in one PDF', async () => {
    const el = await openScanner('multipage');
    expect(query(el, '#galleryinput').multiple).toBe(true);

    const files = await Promise.all([documentFile(), documentFile(), documentFile()]);
    selectFiles(el, files);
    for (let i = 0; i < files.length; i++) {
      await waitForEditor(el);
      expect(query(el, '.step:not([hidden]) .message').textContent.trim()).toBe(
        'Drag the corners to the edges of the document.',
      );
      button(el, 'check').click();
      await waitForIdle(el);
    }
    await waitForPages(el, 3);
    expect(queryAll(el, '.page-number').map((item) => item.textContent.trim())).toEqual([
      'Page 1',
      'Page 2',
      'Page 3',
    ]);

    const detail = await save(el);
    const pdf = await detail.file.text();

    expect(pdf.match(/\/Type\s*\/Page(?!s)/g)).toHaveLength(3);
    expect(pdf.match(/\/DCTDecode/g)).toHaveLength(3);
    expect(detail.pages.map((page) => page.name)).toEqual([
      expect.stringMatching(/-1\.jpg$/),
      expect.stringMatching(/-2\.jpg$/),
      expect.stringMatching(/-3\.jpg$/),
    ]);
  });

  it('returns one JPEG per page with output="images"', async () => {
    const el = await openScanner('multipage output="images" filename="receipt"');
    await scanFiles(el, [await documentFile(), await documentFile()]);
    const detail = await save(el);

    expect(detail.file).toBeUndefined();
    expect(detail.files.map((file) => file.name)).toEqual(['receipt-1.jpg', 'receipt-2.jpg']);
    expect(detail.files.every((file) => file.type === 'image/jpeg')).toBe(true);
    expect(detail.pages).toEqual(detail.files);
  });

  it('returns an array of images even with a single page', async () => {
    const el = await openScanner('output="images"');
    await scanFiles(el, [await documentFile()]);
    const detail = await save(el);

    expect(detail.files).toHaveLength(1);
  });

  it('replaces the page with a new image when it is not multipage', async () => {
    const el = await openScanner();
    selectFiles(el, [await documentFile()]);
    await waitForEditor(el);
    button(el, 'maximize').click();
    await waitForPages(el, 1);

    expect(button(el, 'image').textContent.trim()).toBe('Choose another image');
    expect(pageButtons(el, 'trash-2')).toHaveLength(0);

    selectFiles(el, [await canvasToFile(documentCanvas({ width: 800, height: 1000 }))]);
    await waitForEditor(el);
    button(el, 'maximize').click();
    await waitForPages(el, 1);
    const detail = await save(el);

    expect(detail.pages).toHaveLength(1);
    expect(await imageSize(detail.pages[0])).toEqual({ width: 800, height: 1000 });
  });

  it('uses the full image when asked, limited by max-side', async () => {
    const el = await openScanner('max-side="1000"');
    selectFiles(el, [await documentFile({ width: 1200, height: 900 })]);
    await waitForEditor(el);
    button(el, 'maximize').click();
    await waitForPages(el, 1);
    const detail = await save(el);

    expect(await imageSize(detail.pages[0])).toEqual({ width: 1000, height: 750 });
  });

  it('applies the EXIF orientation of the photo', async () => {
    const el = await openScanner();
    const landscape = await documentFile({ width: 1200, height: 900 });
    selectFiles(el, [await withExifOrientation(landscape, 6)]);
    await waitForEditor(el);
    button(el, 'maximize').click();
    await waitForPages(el, 1);
    const detail = await save(el);

    expect(await imageSize(detail.pages[0])).toEqual({ width: 900, height: 1200 });
  });

  it('rotates and reorders pages', async () => {
    const el = await openScanner('multipage');
    selectFiles(el, [
      await documentFile({ width: 1200, height: 900 }),
      await canvasToFile(documentCanvas({ width: 600, height: 1000 })),
    ]);
    for (let i = 0; i < 2; i++) {
      await waitForEditor(el);
      button(el, 'maximize').click();
      await waitForIdle(el);
    }
    await waitForPages(el, 2);

    // First page: no "move before". Last page: no "move after".
    expect(pageButtons(el, 'chevron-left').map((item) => item.disabled)).toEqual([true, false]);
    expect(pageButtons(el, 'chevron-right').map((item) => item.disabled)).toEqual([false, true]);

    pageButtons(el, 'rotate-cw')[0].click();
    await waitForIdle(el);
    pageButtons(el, 'chevron-left')[1].click();
    await el.updateComplete;

    const detail = await save(el);
    expect(await imageSize(detail.pages[0])).toEqual({ width: 600, height: 1000 });
    expect(await imageSize(detail.pages[1])).toEqual({ width: 900, height: 1200 });
  });

  it('goes back to the capture step when the last page is removed', async () => {
    const el = await openScanner('multipage');
    await scanFiles(el, [await documentFile(), await documentFile()]);

    pageButtons(el, 'trash-2')[0].click();
    await el.updateComplete;
    expect(pages(el)).toHaveLength(1);

    pageButtons(el, 'trash-2')[0].click();
    await el.updateComplete;
    expect(pages(el)).toHaveLength(0);
    expect(button(el, 'image').textContent.trim()).toBe('Choose image');
  });

  it('keeps the page when its re-adjustment is cancelled', async () => {
    const el = await openScanner('multipage');
    await scanFiles(el, [await documentFile(), await documentFile()]);

    pageButtons(el, 'crop')[1].click();
    await waitForEditor(el);
    button(el, 'x').click();
    await waitForPages(el, 2);

    expect(query(el, '#editor')).toBeNull();
  });

  it('replaces the page with the re-adjusted one', async () => {
    const el = await openScanner();
    selectFiles(el, [await documentFile({ width: 1200, height: 900 })]);
    await acceptAdjust(el);
    await waitForPages(el, 1);

    pageButtons(el, 'crop')[0].click();
    await waitForEditor(el);
    button(el, 'maximize').click();
    await waitForPages(el, 1);
    const detail = await save(el);

    expect(await imageSize(detail.pages[0])).toEqual({ width: 1200, height: 900 });
  });

  it('warns when the edges of the document are not detected', async () => {
    const el = await openScanner();
    const blank = document.createElement('canvas');
    blank.width = 800;
    blank.height = 600;
    const context = blank.getContext('2d');
    context.fillStyle = '#888';
    context.fillRect(0, 0, blank.width, blank.height);
    selectFiles(el, [await canvasToFile(blank)]);
    await waitForEditor(el);

    expect(query(el, '.step:not([hidden]) .message').textContent.trim()).toBe(
      'The edges of the document were not detected. Drag the corners to the edges of the document.',
    );
  });

  it('shows an error and stays on the capture step with an unreadable file', async () => {
    const el = await openScanner();
    selectFiles(el, [new File(['not an image'], 'broken.jpg', { type: 'image/jpeg' })]);
    await waitFor(() => errorMessage(el));

    expect(errorMessage(el)).toBe(
      'The image could not be read. Try with another image (JPG, PNG or WebP).',
    );
    expect(button(el, 'image').textContent.trim()).toBe('Choose image');
    expect(query(el, '#editor')).toBeNull();
  });

  it('disables adding pages and refuses to save when max-bytes is reached', async () => {
    const el = await openScanner('multipage max-bytes="1000"');
    const scanned = vi.fn();
    el.addEventListener('dile-document-scanned', scanned);
    await scanFiles(el, [await documentFile()]);

    expect(query(el, '.size').textContent.replace(/\s+/g, ' ').trim()).toMatch(/^\d+ KB of 1 KB$/);
    expect(button(el, 'image').disabled).toBe(true);
    expect(query(el, '.step:not([hidden]) p.message').textContent.trim()).toBe(
      'The document has reached the maximum size. Remove a page to add another one.',
    );

    button(el, 'check').click();
    await waitFor(() => errorMessage(el));

    expect(errorMessage(el)).toBe(
      'The document exceeds the maximum size even with reduced quality. Remove some pages.',
    );
    expect(scanned).not.toHaveBeenCalled();
    expect(query(el, 'dile-modal').opened).toBe(true);
  });

  it('compresses the pages more to fit a max-bytes a bit lower than the document', async () => {
    const file = await documentFile();
    const reference = await openScanner();
    await scanFiles(reference, [file]);
    const fullSize = (await save(reference)).file.size;

    const maxBytes = Math.floor(fullSize * 0.9);
    const el = await openScanner(`max-bytes="${maxBytes}"`);
    await scanFiles(el, [file]);
    const detail = await save(el);

    expect(detail.file.size).toBeLessThanOrEqual(maxBytes);
  });

  it('dispatches the cancel event when closed without saving', async () => {
    const el = await openScanner();
    const cancelled = vi.fn();
    const modalClosed = vi.fn();
    el.addEventListener('dile-document-scan-cancelled', cancelled);
    document.addEventListener('dile-modal-closed', modalClosed);

    button(el, 'x').click();
    document.removeEventListener('dile-modal-closed', modalClosed);

    expect(cancelled).toHaveBeenCalledTimes(1);
    expect(modalClosed).not.toHaveBeenCalled();
    expect(query(el, 'dile-modal').opened).toBe(false);
  });

  it('dispatches the cancel event when closed with the Esc key', async () => {
    const el = await openScanner();
    const cancelled = vi.fn();
    el.addEventListener('dile-document-scan-cancelled', cancelled);

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));

    expect(cancelled).toHaveBeenCalledTimes(1);
    expect(query(el, 'dile-modal').opened).toBe(false);
  });

  it('does not dispatch the cancel event after saving', async () => {
    const el = await openScanner();
    const cancelled = vi.fn();
    el.addEventListener('dile-document-scan-cancelled', cancelled);
    await scanFiles(el, [await documentFile()]);
    await save(el);

    expect(cancelled).not.toHaveBeenCalled();
  });

  it('discards the work in progress when closed while processing', async () => {
    const el = await openScanner();
    const cancelled = vi.fn();
    const scanned = vi.fn();
    el.addEventListener('dile-document-scan-cancelled', cancelled);
    el.addEventListener('dile-document-scanned', scanned);

    selectFiles(el, [await documentFile()]);
    await el.updateComplete;
    expect(query(el, '.busy')).toBeTruthy();
    el.close();
    await new Promise((resolve) => setTimeout(resolve, 1000));

    expect(cancelled).toHaveBeenCalledTimes(1);
    expect(scanned).not.toHaveBeenCalled();
    expect(query(el, '.scanic-handle')).toBeNull();
    expect(query(el, '.busy')).toBeNull();
    expect(button(el, 'image').textContent.trim()).toBe('Choose image');
  });

  it('starts with an empty document when opened again', async () => {
    const el = await openScanner();
    await scanFiles(el, [await documentFile()]);
    el.close();
    el.open();
    await el.updateComplete;

    expect(pages(el)).toHaveLength(0);
    expect(button(el, 'image').textContent.trim()).toBe('Choose image');
  });

  it('merges the labels with the default ones, also in the corner handles', async () => {
    const el = await renderScanner();
    el.labels = { title: 'Escanear documento', topLeftCorner: 'Esquina superior izquierda' };
    el.open();
    await el.updateComplete;

    expect(query(el, 'h2').textContent).toBe('Escanear documento');
    expect(button(el, 'image').textContent.trim()).toBe('Choose image');

    selectFiles(el, [await documentFile()]);
    await waitForEditor(el);
    const handleLabels = queryAll(el, '.scanic-handle').map((handle) => handle.getAttribute('aria-label'));

    expect(handleLabels).toContain('Esquina superior izquierda');
    expect(handleLabels).toContain('Bottom-right corner');
  });

  it('offers to take a photo on touch devices', async () => {
    const realMatchMedia = window.matchMedia.bind(window);
    vi.spyOn(window, 'matchMedia').mockImplementation((mediaQuery) =>
      mediaQuery === '(pointer: coarse)' ? { matches: true } : realMatchMedia(mediaQuery),
    );
    const el = await openScanner();
    const camera = query(el, '#camerainput');
    const openCamera = vi.spyOn(camera, 'click').mockImplementation(() => {});

    expect(button(el, 'camera').textContent.trim()).toBe('Take photo');
    expect(camera.getAttribute('capture')).toBe('environment');

    button(el, 'camera').click();
    expect(openCamera).toHaveBeenCalled();

    selectFiles(el, [await documentFile()], 'camerainput');
    await acceptAdjust(el);
    await waitForPages(el, 1);
    expect(button(el, 'camera').textContent.trim()).toBe('Repeat photo');
  });

  it('falls back to the classical detector when the ML assets cannot be loaded', async () => {
    const fetchSpy = vi.spyOn(window, 'fetch');
    const el = await openScanner('ml-detector ml-assets-url="http://127.0.0.1:9/missing/"');
    selectFiles(el, [await documentFile()]);
    await waitForEditor(el);

    expect(fetchSpy).toHaveBeenCalledWith(
      expect.stringContaining('http://127.0.0.1:9/missing/'),
      expect.anything(),
    );

    expect(errorMessage(el)).toBeUndefined();
    expect(query(el, '.step:not([hidden]) .message').textContent.trim()).toBe(
      'Drag the corners to the edges of the document.',
    );
  }, 30000);
});

// Inserts an EXIF APP1 segment with the given orientation after the JPEG SOI.
async function withExifOrientation(file, orientation) {
  const jpeg = new Uint8Array(await file.arrayBuffer());
  const tiff = [
    0x49, 0x49, 0x2a, 0x00, 0x08, 0x00, 0x00, 0x00, // little endian, IFD at 8
    0x01, 0x00, // one entry
    0x12, 0x01, 0x03, 0x00, 0x01, 0x00, 0x00, 0x00, orientation, 0x00, 0x00, 0x00, // Orientation
    0x00, 0x00, 0x00, 0x00, // no next IFD
  ];
  const payload = [0x45, 0x78, 0x69, 0x66, 0x00, 0x00, ...tiff]; // "Exif\0\0"
  const length = payload.length + 2;
  const app1 = [0xff, 0xe1, length >> 8, length & 0xff, ...payload];
  const bytes = new Uint8Array([...jpeg.slice(0, 2), ...app1, ...jpeg.slice(2)]);
  return new File([bytes], file.name, { type: 'image/jpeg' });
}
