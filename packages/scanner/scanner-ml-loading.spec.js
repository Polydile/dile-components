import { describe, it, expect, afterEach, beforeEach } from 'vitest';
import './scanner.js';
import {
  hardDocumentCanvas,
  canvasToFile,
  openScanner,
  selectFiles,
  acceptAdjust,
  waitForPages,
  save,
  imageSize,
} from './test/scanner-test-helpers.js';
import { mlAssetsUrl, mlAssetsVersion } from 'virtual:dile-scanner-ml';
import { CDN_ML_ASSETS_URL, isMlCached, isSlowConnection } from './src/scanner-engine.js';

// How the ML detector is loaded: maximum wait of a photo, slow connections
// and the cache. This file runs in its own page, so the engine starts without
// any ML session.
//
// The engine and scanic keep the ML session by URL, so each test uses a
// different spelling of the same folder (served by the scannerMlAssets()
// plugin registered in vitest.config.js) to start from scratch.
const MODEL_FILE = 'doccornernet_lean.ort';
const absoluteUrl = `${location.origin}${mlAssetsUrl}`;
const protocolRelativeUrl = `//${location.host}${mlAssetsUrl}`;

// Intercepts the requests of the ML model: counts them and can delay them.
let modelRequests = 0;
let modelDelay = 0;
const originalFetch = window.fetch;

function setConnection(connection) {
  Object.defineProperty(navigator, 'connection', { value: connection, configurable: true });
}

async function scanPageSize(el, file) {
  selectFiles(el, [file]);
  await acceptAdjust(el);
  await waitForPages(el, 1);
  const detail = await save(el);
  return imageSize(detail.pages[0]);
}

// The classical detector picks a line of text on this photo (height < 100)
// and the ML detector finds the whole document (see scanner-ml.spec.js).
const hardFile = () => canvasToFile(hardDocumentCanvas());

describe('dile-scanner ML loading', () => {
  beforeEach(() => {
    modelRequests = 0;
    modelDelay = 0;
    window.fetch = async (input, init) => {
      const url = typeof input === 'string' ? input : input.url;
      if (url.endsWith(MODEL_FILE)) {
        modelRequests++;
        if (modelDelay) {
          await new Promise((resolve) => setTimeout(resolve, modelDelay));
        }
      }
      return originalFetch(input, init);
    };
  });

  afterEach(async () => {
    window.fetch = originalFetch;
    delete navigator.connection;
    for (const name of await caches.keys()) {
      await caches.delete(name);
    }
    document.body.innerHTML = '';
  });

  it('uses the same scanic-ml version as the self-hosted files for the CDN URL', () => {
    expect(CDN_ML_ASSETS_URL).toBe(`https://cdn.jsdelivr.net/npm/scanic-ml@${mlAssetsVersion}/dist/`);
  });

  it('detects slow connections only when the browser reports them', () => {
    setConnection(undefined);
    expect(isSlowConnection()).toBe(false);
    setConnection({ effectiveType: '4g', saveData: false });
    expect(isSlowConnection()).toBe(false);
    setConnection({ effectiveType: '3g', saveData: false });
    expect(isSlowConnection()).toBe(true);
    setConnection({ effectiveType: '4g', saveData: true });
    expect(isSlowConnection()).toBe(true);
  });

  it('looks for the ML files in the Cache Storage', async () => {
    expect(await isMlCached(absoluteUrl)).toBe(false);
    const cache = await caches.open('test-ml');
    await cache.put(`${absoluteUrl}${MODEL_FILE}`, new Response('model'));
    expect(await isMlCached(absoluteUrl)).toBe(false);
    await cache.put(`${absoluteUrl}ort-wasm-simd-threaded.wasm`, new Response('wasm'));
    expect(await isMlCached(absoluteUrl)).toBe(true);
    // A relative URL is resolved against the page.
    expect(await isMlCached(mlAssetsUrl)).toBe(true);
  });

  it('does not download the ML files on a slow connection with ml-fast-connection-only', async () => {
    setConnection({ effectiveType: '3g', saveData: false });
    const el = await openScanner(
      `ml-detector ml-fast-connection-only ml-assets-url="${protocolRelativeUrl}"`,
    );
    const size = await scanPageSize(el, await hardFile());

    expect(modelRequests).toBe(0);
    expect(size.height).toBeLessThan(100);
  }, 30000);

  it('uses the ML files on a slow connection when they are already cached', async () => {
    setConnection({ effectiveType: '3g', saveData: false });
    const cache = await caches.open('test-ml');
    for (const file of [MODEL_FILE, 'ort-wasm-simd-threaded.wasm']) {
      await cache.put(new URL(`${protocolRelativeUrl}${file}`, location.href).href, new Response(file));
    }
    const el = await openScanner(
      `ml-detector ml-fast-connection-only ml-assets-url="${protocolRelativeUrl}"`,
    );
    const size = await scanPageSize(el, await hardFile());

    expect(modelRequests).toBe(1);
    expect(size.height).toBeGreaterThan(600);
  }, 30000);

  it('stops waiting for the ML detector after ml-max-wait and keeps downloading it', async () => {
    modelDelay = 3000;
    const el = await openScanner(
      `ml-detector ml-max-wait="200" ml-assets-url="${absoluteUrl}"`,
    );
    const start = performance.now();
    const classical = await scanPageSize(el, await hardFile());

    expect(classical.height).toBeLessThan(100);
    expect(performance.now() - start).toBeLessThan(modelDelay);

    // The download went on: once ready, the next photo uses it without
    // downloading the model again.
    await new Promise((resolve) => setTimeout(resolve, modelDelay + 1000));
    el.open();
    await el.updateComplete;
    const ml = await scanPageSize(el, await hardFile());

    expect(ml.height).toBeGreaterThan(600);
    expect(modelRequests).toBe(1);
  }, 30000);
});
