import { test } from 'node:test';
import assert from 'node:assert/strict';
import { formatFileSize } from './formatFileSize.js';

test('formats 0 bytes', () => {
  assert.equal(formatFileSize(0), '0 B');
});

test('formats bytes below 1 KB', () => {
  assert.equal(formatFileSize(512), '512 B');
});

test('formats kilobytes', () => {
  assert.equal(formatFileSize(2048), '2.0 KB');
});

test('formats megabytes', () => {
  assert.equal(formatFileSize(2_411_724), '2.3 MB');
});

test('formats gigabytes', () => {
  assert.equal(formatFileSize(1_610_612_736), '1.5 GB');
});
