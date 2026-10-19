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

// The ML detector files are served by the scannerMlAssets() Vite plugin
// (vite-plugin.js), registered in vitest.config.js. This file runs in its own
// page, so the resource timing entries only contain what these tests load.
const ML_ASSETS_URL = '/dile-scanner-ml/';
const ML_RESOURCE = /scanic-mlDetector|scanic-ort|ort-wasm-simd-threaded|doccornernet_lean/;

const mlResources = () =>
  performance
    .getEntriesByType('resource')
    .map((entry) => entry.name)
    .filter((name) => ML_RESOURCE.test(name));

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

  // Must run first: once loaded, the ML files stay in the resource entries.
  it('does not load any ML file without ml-detector', async () => {
    await scanPageSize('', await documentFile());

    expect(mlResources()).toEqual([]);
  });

  it('loads the ML files only when the first photo is processed', async () => {
    const el = await openScanner(`ml-detector ml-assets-url="${ML_ASSETS_URL}"`);
    await new Promise((resolve) => setTimeout(resolve, 300));

    expect(mlResources()).toEqual([]);

    selectFiles(el, [await documentFile()]);
    await acceptAdjust(el);
    await waitForPages(el, 1);
    const assets = mlResources().filter((name) => !name.includes('/node_modules/'));

    expect(assets.map((name) => new URL(name).pathname)).toEqual(
      expect.arrayContaining([
        `${ML_ASSETS_URL}doccornernet_lean.ort`,
        `${ML_ASSETS_URL}ort-wasm-simd-threaded.mjs`,
        `${ML_ASSETS_URL}ort-wasm-simd-threaded.wasm`,
      ]),
    );
    expect(assets.some((name) => name.includes('jsdelivr'))).toBe(false);
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
