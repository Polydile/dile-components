import { test } from 'node:test';
import assert from 'node:assert/strict';
import { sanitizeOtpValue } from './sanitizeOtpValue.js';

test('returns empty string for empty input', () => {
  assert.equal(sanitizeOtpValue('', 6), '');
});

test('strips non-digit characters', () => {
  assert.equal(sanitizeOtpValue('12 34-56', 6), '123456');
});

test('truncates to the given length', () => {
  assert.equal(sanitizeOtpValue('1234567890', 6), '123456');
});

test('returns empty string for null or undefined', () => {
  assert.equal(sanitizeOtpValue(null, 6), '');
  assert.equal(sanitizeOtpValue(undefined, 6), '');
});

test('keeps digits shorter than length untouched', () => {
  assert.equal(sanitizeOtpValue('12', 6), '12');
});
