import { test } from 'node:test';
import assert from 'node:assert/strict';
import { validateImageFile } from './validateImageFile.js';

const baseInfo = { size: 1000, width: 800, height: 600 };

test('valid when no constraints are set', () => {
  const result = validateImageFile(baseInfo, {});
  assert.equal(result.valid, true);
  assert.deepEqual(result.errors, []);
});

test('rejects files over maxFileSize', () => {
  const result = validateImageFile(baseInfo, { maxFileSize: 500 });
  assert.equal(result.valid, false);
  assert.equal(result.errors[0].code, 'FILE_TOO_LARGE');
  assert.equal(result.errors[0].maxFileSize, 500);
  assert.equal(result.errors[0].actual, 1000);
});

test('rejects width below minWidth', () => {
  const result = validateImageFile(baseInfo, { minWidth: 1000 });
  assert.equal(result.valid, false);
  assert.equal(result.errors[0].code, 'WIDTH_OUT_OF_RANGE');
});

test('rejects width above maxWidth', () => {
  const result = validateImageFile(baseInfo, { maxWidth: 400 });
  assert.equal(result.valid, false);
  assert.equal(result.errors[0].code, 'WIDTH_OUT_OF_RANGE');
});

test('rejects height out of range', () => {
  const result = validateImageFile(baseInfo, { minHeight: 700, maxHeight: 900 });
  assert.equal(result.valid, false);
  assert.equal(result.errors[0].code, 'HEIGHT_OUT_OF_RANGE');
});

test('accumulates multiple errors', () => {
  const result = validateImageFile(baseInfo, { maxFileSize: 10, maxWidth: 10, maxHeight: 10 });
  assert.equal(result.valid, false);
  assert.equal(result.errors.length, 3);
});

test('passes when dimensions and size are within range', () => {
  const result = validateImageFile(baseInfo, {
    maxFileSize: 2000,
    minWidth: 200,
    maxWidth: 1000,
    minHeight: 200,
    maxHeight: 1000,
  });
  assert.equal(result.valid, true);
});
