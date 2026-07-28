import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  normalizeHex,
  hexToRgb,
  rgbToHex,
  rgbToHsv,
  hsvToRgb,
  hexToHsv,
  hsvToHex,
} from './colorConversion.js';

test('normalizeHex accepts 6-digit hex with or without the hash', () => {
  assert.equal(normalizeHex('#ff0000'), '#ff0000');
  assert.equal(normalizeHex('ff0000'), '#ff0000');
});

test('normalizeHex lowercases uppercase input', () => {
  assert.equal(normalizeHex('#FF00AA'), '#ff00aa');
});

test('normalizeHex expands 3-digit shorthand', () => {
  assert.equal(normalizeHex('#abc'), '#aabbcc');
  assert.equal(normalizeHex('abc'), '#aabbcc');
});

test('normalizeHex rejects invalid input', () => {
  assert.equal(normalizeHex('red'), null);
  assert.equal(normalizeHex('#ff'), null);
  assert.equal(normalizeHex('#gggggg'), null);
  assert.equal(normalizeHex(''), null);
  assert.equal(normalizeHex(null), null);
  assert.equal(normalizeHex(undefined), null);
});

test('hexToRgb / rgbToHex round trip on reference colors', () => {
  assert.deepEqual(hexToRgb('#ff0000'), { r: 255, g: 0, b: 0 });
  assert.deepEqual(hexToRgb('#00ff00'), { r: 0, g: 255, b: 0 });
  assert.deepEqual(hexToRgb('#0000ff'), { r: 0, g: 0, b: 255 });
  assert.equal(rgbToHex({ r: 255, g: 0, b: 0 }), '#ff0000');
  assert.equal(rgbToHex({ r: 0, g: 255, b: 0 }), '#00ff00');
  assert.equal(rgbToHex({ r: 0, g: 0, b: 255 }), '#0000ff');
});

test('rgbToHex clamps out-of-range channels', () => {
  assert.equal(rgbToHex({ r: 300, g: -10, b: 128 }), '#ff0080');
});

test('hexToRgb returns null for invalid hex', () => {
  assert.equal(hexToRgb('not-a-color'), null);
});

test('rgbToHsv matches known reference hues', () => {
  assert.deepEqual(rgbToHsv({ r: 255, g: 0, b: 0 }), { h: 0, s: 100, v: 100 });
  assert.deepEqual(rgbToHsv({ r: 0, g: 255, b: 0 }), { h: 120, s: 100, v: 100 });
  assert.deepEqual(rgbToHsv({ r: 0, g: 0, b: 255 }), { h: 240, s: 100, v: 100 });
});

test('rgbToHsv reports saturation 0 for grays, including white and black', () => {
  assert.deepEqual(rgbToHsv({ r: 255, g: 255, b: 255 }), { h: 0, s: 0, v: 100 });
  assert.deepEqual(rgbToHsv({ r: 0, g: 0, b: 0 }), { h: 0, s: 0, v: 0 });
  assert.deepEqual(rgbToHsv({ r: 128, g: 128, b: 128 }), { h: 0, s: 0, v: 50 });
});

test('hsvToRgb inverts rgbToHsv for reference colors', () => {
  assert.deepEqual(hsvToRgb({ h: 0, s: 100, v: 100 }), { r: 255, g: 0, b: 0 });
  assert.deepEqual(hsvToRgb({ h: 120, s: 100, v: 100 }), { r: 0, g: 255, b: 0 });
  assert.deepEqual(hsvToRgb({ h: 240, s: 100, v: 100 }), { r: 0, g: 0, b: 255 });
});

test('hexToHsv / hsvToHex round trip for arbitrary colors stays within rounding tolerance', () => {
  for (const hex of ['#7bb93d', '#cc0000', '#336699', '#ffffff', '#000000', '#808080']) {
    const { h, s, v } = hexToHsv(hex);
    const original = hexToRgb(hex);
    const roundTripped = hexToRgb(hsvToHex(h, s, v));
    for (const channel of ['r', 'g', 'b']) {
      assert.ok(
        Math.abs(original[channel] - roundTripped[channel]) <= 2,
        `${hex} channel ${channel} drifted too far after HSV round trip: ${original[channel]} vs ${roundTripped[channel]}`
      );
    }
  }
});

test('hexToHsv / hsvToHex round trip is exact for colors immune to integer HSV rounding', () => {
  for (const hex of ['#ff0000', '#00ff00', '#0000ff', '#ffffff', '#000000', '#808080']) {
    const { h, s, v } = hexToHsv(hex);
    assert.equal(hsvToHex(h, s, v), hex);
  }
});

test('hexToHsv returns null for invalid hex', () => {
  assert.equal(hexToHsv('nope'), null);
});
