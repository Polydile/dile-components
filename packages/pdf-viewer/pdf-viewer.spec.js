import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

const { mockGetDocument } = vi.hoisted(() => {
  return { mockGetDocument: vi.fn() };
});

vi.mock('pdfjs-dist', () => ({
  GlobalWorkerOptions: {},
  getDocument: (...args) => mockGetDocument(...args),
}));

import './pdf-viewer.js';

describe('dile-pdf-viewer', () => {
  function createFakePdfDocument({ numPages = 3 } = {}) {
    return {
      numPages,
      getPage: vi.fn(async () => ({
        getViewport: ({ scale }) => ({ width: 200 * scale, height: 300 * scale }),
        render: () => ({ promise: Promise.resolve() }),
      })),
      getData: vi.fn(async () => new Uint8Array([1, 2, 3, 4])),
    };
  }

  function mockSuccessfulLoad(options) {
    const fakeDoc = createFakePdfDocument(options);
    mockGetDocument.mockReturnValue({ promise: Promise.resolve(fakeDoc) });
    return fakeDoc;
  }

  function mockFailedLoad(error = new Error('network error')) {
    mockGetDocument.mockReturnValue({ promise: Promise.reject(error) });
  }

  function createDeferred() {
    let resolve;
    const promise = new Promise((res) => { resolve = res; });
    return { promise, resolve };
  }

  function waitForEvent(el, eventName) {
    return new Promise((resolve) => {
      el.addEventListener(eventName, (e) => resolve(e), { once: true });
    });
  }

  function waitForTranslations(el) {
    return new Promise((resolve) => {
      const check = () => {
        if (el.translations && el.translations.previous_page) {
          resolve();
        } else {
          setTimeout(check, 10);
        }
      };
      check();
    });
  }

  function prevButton(el) { return el.shadowRoot.querySelector('button:has(dile-lucide-icon-chevron-left)'); }
  function nextButton(el) { return el.shadowRoot.querySelector('button:has(dile-lucide-icon-chevron-right)'); }
  function zoomOutButton(el) { return el.shadowRoot.querySelector('button:has(dile-lucide-icon-zoom-out)'); }
  function zoomInButton(el) { return el.shadowRoot.querySelector('button:has(dile-lucide-icon-zoom-in)'); }
  function downloadButton(el) { return el.shadowRoot.querySelector('button:has(dile-lucide-icon-download)'); }

  async function renderViewer(attrs = 'src="fake.pdf"') {
    document.body.innerHTML = `<dile-pdf-viewer ${attrs}></dile-pdf-viewer>`;
    const el = document.body.querySelector('dile-pdf-viewer');
    await waitForEvent(el, 'dile-pdf-viewer-opened');
    await waitForTranslations(el);
    await el.updateComplete;
    return el;
  }

  async function renderViewerWithError(attrs = 'src="fake.pdf"') {
    document.body.innerHTML = `<dile-pdf-viewer ${attrs}></dile-pdf-viewer>`;
    const el = document.body.querySelector('dile-pdf-viewer');
    await waitForEvent(el, 'dile-pdf-viewer-error');
    await waitForTranslations(el);
    await el.updateComplete;
    return el;
  }

  beforeEach(() => {
    mockGetDocument.mockReset();
    mockSuccessfulLoad();
  });

  afterEach(() => {
    document.body.innerHTML = '';
    vi.restoreAllMocks();
  });

  it('shows a loading notice while the document is being fetched', async () => {
    const deferred = createDeferred();
    mockGetDocument.mockReturnValue({ promise: deferred.promise });

    document.body.innerHTML = '<dile-pdf-viewer src="fake.pdf"></dile-pdf-viewer>';
    const el = document.body.querySelector('dile-pdf-viewer');
    await waitForTranslations(el);
    await el.updateComplete;

    expect(el.loading).toBe(true);
    expect(el.shadowRoot.querySelector('canvas').hidden).toBe(true);
    expect(el.shadowRoot.querySelector('.Notice').textContent).toContain('Loading');

    deferred.resolve(createFakePdfDocument({ numPages: 2 }));
    await waitForEvent(el, 'dile-pdf-viewer-opened');
  });

  it('loads the document and renders the first page', async () => {
    mockSuccessfulLoad({ numPages: 5 });
    const el = await renderViewer();

    expect(el.loading).toBe(false);
    expect(el.numPages).toBe(5);
    expect(el.page).toBe(1);
    expect(el.shadowRoot.querySelector('canvas').hidden).toBe(false);
    expect(el.shadowRoot.querySelector('.Toolbar-pageInfo').textContent).toContain('Page 1 / 5');
  });

  it('dispatches dile-pdf-viewer-opened with the page count', async () => {
    mockSuccessfulLoad({ numPages: 4 });
    document.body.innerHTML = '<dile-pdf-viewer src="fake.pdf"></dile-pdf-viewer>';
    const el = document.body.querySelector('dile-pdf-viewer');

    const event = await waitForEvent(el, 'dile-pdf-viewer-opened');

    expect(event.detail.numPages).toBe(4);
  });

  it('shows an error notice and dispatches dile-pdf-viewer-error when loading fails', async () => {
    const error = new Error('boom');
    mockFailedLoad(error);
    document.body.innerHTML = '<dile-pdf-viewer src="fake.pdf"></dile-pdf-viewer>';
    const el = document.body.querySelector('dile-pdf-viewer');

    const event = await waitForEvent(el, 'dile-pdf-viewer-error');
    await el.updateComplete;

    expect(event.detail.error).toBe(error);
    expect(el.loading).toBe(false);
    expect(el.shadowRoot.querySelector('canvas').hidden).toBe(true);
    expect(el.shadowRoot.querySelector('.Notice').textContent.length).toBeGreaterThan(0);
  });

  it('disables the previous page button on the first page and enables it after navigating', async () => {
    mockSuccessfulLoad({ numPages: 3 });
    const el = await renderViewer();

    expect(prevButton(el).disabled).toBe(true);

    nextButton(el).click();
    await el.updateComplete;

    expect(prevButton(el).disabled).toBe(false);
  });

  it('navigates to the next page and dispatches dile-pdf-viewer-page-changed', async () => {
    mockSuccessfulLoad({ numPages: 3 });
    const el = await renderViewer();

    let detail = null;
    el.addEventListener('dile-pdf-viewer-page-changed', (e) => { detail = e.detail; });

    nextButton(el).click();
    await el.updateComplete;

    expect(el.page).toBe(2);
    expect(detail).toEqual({ page: 2, numPages: 3 });
    expect(el.shadowRoot.querySelector('.Toolbar-pageInfo').textContent).toContain('Page 2 / 3');
  });

  it('disables the next page button on the last page and does not advance further', async () => {
    mockSuccessfulLoad({ numPages: 2 });
    const el = await renderViewer();

    nextButton(el).click();
    await el.updateComplete;
    expect(el.page).toBe(2);
    expect(nextButton(el).disabled).toBe(true);

    let dispatched = false;
    el.addEventListener('dile-pdf-viewer-page-changed', () => { dispatched = true; });

    nextButton(el).click();
    await el.updateComplete;

    expect(el.page).toBe(2);
    expect(dispatched).toBe(false);
  });

  it('does not go below the first page when clicking previous', async () => {
    mockSuccessfulLoad({ numPages: 3 });
    const el = await renderViewer();

    let dispatched = false;
    el.addEventListener('dile-pdf-viewer-page-changed', () => { dispatched = true; });

    prevButton(el).click();
    await el.updateComplete;

    expect(el.page).toBe(1);
    expect(dispatched).toBe(false);
  });

  it('zooms in and out within the allowed scale range', async () => {
    const el = await renderViewer();
    el.scale = 1.2;
    await el.updateComplete;

    zoomInButton(el).click();
    expect(el.scale).toBe(1.4);

    zoomOutButton(el).click();
    zoomOutButton(el).click();
    expect(el.scale).toBe(1.0);
  });

  it('disables the zoom-in button at the maximum scale', async () => {
    const el = await renderViewer();
    el.scale = 3;
    await el.updateComplete;

    expect(zoomInButton(el).disabled).toBe(true);

    zoomInButton(el).click();
    expect(el.scale).toBe(3);
  });

  it('disables the zoom-out button at the minimum scale', async () => {
    const el = await renderViewer();
    el.scale = 0.5;
    await el.updateComplete;

    expect(zoomOutButton(el).disabled).toBe(true);

    zoomOutButton(el).click();
    expect(el.scale).toBe(0.5);
  });

  it('only handles keyboard shortcuts while the component has focus or is hovered', async () => {
    mockSuccessfulLoad({ numPages: 3 });
    const el = await renderViewer();

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }));
    expect(el.page).toBe(1);

    el.dispatchEvent(new MouseEvent('mouseenter'));
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }));
    expect(el.page).toBe(2);

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft' }));
    expect(el.page).toBe(1);

    el.dispatchEvent(new MouseEvent('mouseleave'));
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }));
    expect(el.page).toBe(1);
  });

  it('triggers a browser download with the configured filename and dispatches lifecycle events', async () => {
    const el = await renderViewer('src="fake.pdf" filename="report.pdf"');

    let clickedAnchor = null;
    vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(function () {
      clickedAnchor = this;
    });

    const requested = waitForEvent(el, 'dile-pdf-viewer-download-requested');
    const downloaded = waitForEvent(el, 'dile-pdf-viewer-downloaded');

    downloadButton(el).click();

    await requested;
    await downloaded;

    expect(clickedAnchor).toBeTruthy();
    expect(clickedAnchor.download).toBe('report.pdf');
    expect(clickedAnchor.href).toContain('blob:');
  });

  it('renders toolbar labels in English by default', async () => {
    const el = await renderViewer();

    expect(prevButton(el).getAttribute('aria-label')).toBe('Previous page');
    expect(downloadButton(el).getAttribute('aria-label')).toBe('Download');
  });

  it('renders toolbar labels in Spanish when language="es"', async () => {
    const el = await renderViewer('src="fake.pdf" language="es"');

    expect(prevButton(el).getAttribute('aria-label')).toBe('Página anterior');
    expect(downloadButton(el).getAttribute('aria-label')).toBe('Descargar');
  });

  it('removes the accessible announcer element from the document when disconnected', async () => {
    const el = await renderViewer();

    expect(document.body.querySelector('[aria-live="polite"]')).toBeTruthy();

    el.remove();

    expect(document.body.querySelector('[aria-live="polite"]')).toBeNull();
  });
});
