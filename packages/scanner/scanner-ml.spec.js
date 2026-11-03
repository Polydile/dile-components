import { describe, it, expect, afterEach } from 'vitest';
import './scanner.js';
import {
  hardDocumentCanvas,
  canvasToFile,
  documentFile,
  openScanner,
  selectFiles,
  acceptAdjust,
  waitForPages,
  save,
  imageSize,
} from './test/scanner-test-helpers.js';
import { mlAssetsUrl, mlAssetsVersion } from 'virtual:dile-scanner-ml';

// The ML detector files are served by the scannerMlAssets() Vite plugin
// (vite-plugin.js), registered in vitest.config.js, which also provides the
// virtual module with their URL. This file runs in its own page, so the
// resource timing entries only contain what these tests load.
const ML_ASSETS_URL = mlAssetsUrl;
const ML_RESOURCE = /scanic-mlDetector|scanic-ort|ort-wasm-simd-threaded|doccornernet_lean/;

const mlResources = () =>
  performance
    .getEntriesByType('resource')
    .map((entry) => entry.name)
    .filter((name) => ML_RESOURCE.test(name));

// Pathnames of the self-hosted ML files requested so far.
const mlAssets = () =>
  mlResources()
    .map((name) => new URL(name).pathname)
    .filter((pathname) => pathname.startsWith(ML_ASSETS_URL));

async function scanPageSize(attrs, file) {
  const el = await openScanner(attrs);
  selectFiles(el, [file]);
  await acceptAdjust(el);
  await waitForPages(el, 1);
  const detail = await save(el);
  return imageSize(detail.pages[0]);
}

describe('dile-scanner ML detector', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('serves the ML files from a folder with the scanic-ml version', () => {
    expect(mlAssetsVersion).toMatch(/^\d+\.\d+\.\d+/);
    expect(mlAssetsUrl).toBe(`/dile-scanner-ml/${mlAssetsVersion}/`);
  });

  // Must run before the tests that load the ML files: once loaded, they stay
  // in the resource entries.
  it('does not load any ML file without ml-detector', async () => {
    await scanPageSize('', await documentFile());

    expect(mlResources()).toEqual([]);
  });

  it('preloads the ML files when the scanner opens, before any photo', async () => {
    const el = await openScanner(`ml-detector ml-assets-url="${ML_ASSETS_URL}"`);
    await expect.poll(mlAssets, { timeout: 20000 }).toEqual(
      expect.arrayContaining([
        `${ML_ASSETS_URL}doccornernet_lean.ort`,
        `${ML_ASSETS_URL}ort-wasm-simd-threaded.mjs`,
        `${ML_ASSETS_URL}ort-wasm-simd-threaded.wasm`,
      ]),
    );
    expect(mlResources().some((name) => name.includes('jsdelivr'))).toBe(false);

    // The first photo reuses the preloaded session: nothing is downloaded again.
    const before = mlAssets().length;
    selectFiles(el, [await documentFile()]);
    await acceptAdjust(el);
    await waitForPages(el, 1);

    expect(mlAssets().length).toBe(before);
  }, 30000);

  it('finds the document where the classical detector picks a line of text', async () => {
    const file = await canvasToFile(hardDocumentCanvas());
    const classical = await scanPageSize('', file);
    const ml = await scanPageSize(`ml-detector ml-assets-url="${ML_ASSETS_URL}"`, file);

    expect(classical.height).toBeLessThan(100);
    expect(ml.width).toBeGreaterThan(750);
    expect(ml.height).toBeGreaterThan(600);
  }, 30000);
});
