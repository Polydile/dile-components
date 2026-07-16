import { test } from 'node:test';
import assert from 'node:assert/strict';
import { buildValidationMessages } from './buildValidationMessages.js';

const translations = {
  image_file_too_large: (maxSizeLabel) => `Too large, max ${maxSizeLabel}`,
  image_width_error: (min, max) => `Width must be between ${min} and ${max}`,
  image_height_error: (min, max) => `Height must be between ${min} and ${max}`,
};

test('builds message for FILE_TOO_LARGE using formatted size', () => {
  const messages = buildValidationMessages([{ code: 'FILE_TOO_LARGE', maxFileSize: 2048 }], translations);
  assert.deepEqual(messages, ['Too large, max 2.0 KB']);
});

test('builds message for WIDTH_OUT_OF_RANGE', () => {
  const messages = buildValidationMessages(
    [{ code: 'WIDTH_OUT_OF_RANGE', minWidth: 200, maxWidth: 1000 }],
    translations
  );
  assert.deepEqual(messages, ['Width must be between 200 and 1000']);
});

test('builds message for HEIGHT_OUT_OF_RANGE', () => {
  const messages = buildValidationMessages(
    [{ code: 'HEIGHT_OUT_OF_RANGE', minHeight: 200, maxHeight: 1000 }],
    translations
  );
  assert.deepEqual(messages, ['Height must be between 200 and 1000']);
});

test('builds messages for multiple errors in order', () => {
  const messages = buildValidationMessages(
    [
      { code: 'FILE_TOO_LARGE', maxFileSize: 1024 },
      { code: 'WIDTH_OUT_OF_RANGE', minWidth: 100, maxWidth: 200 },
    ],
    translations
  );
  assert.equal(messages.length, 2);
});
