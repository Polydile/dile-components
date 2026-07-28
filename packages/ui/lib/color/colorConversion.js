export function normalizeHex(input) {
  if (typeof input !== 'string') return null;
  const match = /^#?([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.exec(input.trim());
  if (!match) return null;
  let digits = match[1];
  if (digits.length === 3) {
    digits = digits.split('').map((c) => c + c).join('');
  }
  return `#${digits.toLowerCase()}`;
}

export function hexToRgb(hex) {
  const normalized = normalizeHex(hex);
  if (!normalized) return null;
  const int = parseInt(normalized.slice(1), 16);
  return { r: (int >> 16) & 255, g: (int >> 8) & 255, b: int & 255 };
}

export function rgbToHex({ r, g, b }) {
  const clamp = (n) => Math.max(0, Math.min(255, Math.round(n)));
  const toHex = (n) => clamp(n).toString(16).padStart(2, '0');
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

export function rgbToHsv({ r, g, b }) {
  const rN = r / 255;
  const gN = g / 255;
  const bN = b / 255;
  const max = Math.max(rN, gN, bN);
  const min = Math.min(rN, gN, bN);
  const delta = max - min;

  let h = 0;
  if (delta !== 0) {
    if (max === rN) {
      h = 60 * (((gN - bN) / delta) % 6);
    } else if (max === gN) {
      h = 60 * ((bN - rN) / delta + 2);
    } else {
      h = 60 * ((rN - gN) / delta + 4);
    }
  }
  if (h < 0) h += 360;

  const s = max === 0 ? 0 : delta / max;
  return { h: Math.round(h), s: Math.round(s * 100), v: Math.round(max * 100) };
}

export function hsvToRgb({ h, s, v }) {
  const hN = ((h % 360) + 360) % 360;
  const sN = Math.max(0, Math.min(100, s)) / 100;
  const vN = Math.max(0, Math.min(100, v)) / 100;

  const c = vN * sN;
  const x = c * (1 - Math.abs(((hN / 60) % 2) - 1));
  const m = vN - c;

  let r1, g1, b1;
  if (hN < 60) {
    [r1, g1, b1] = [c, x, 0];
  } else if (hN < 120) {
    [r1, g1, b1] = [x, c, 0];
  } else if (hN < 180) {
    [r1, g1, b1] = [0, c, x];
  } else if (hN < 240) {
    [r1, g1, b1] = [0, x, c];
  } else if (hN < 300) {
    [r1, g1, b1] = [x, 0, c];
  } else {
    [r1, g1, b1] = [c, 0, x];
  }

  return {
    r: Math.round((r1 + m) * 255),
    g: Math.round((g1 + m) * 255),
    b: Math.round((b1 + m) * 255),
  };
}

export function hexToHsv(hex) {
  const rgb = hexToRgb(hex);
  return rgb ? rgbToHsv(rgb) : null;
}

export function hsvToHex(h, s, v) {
  return rgbToHex(hsvToRgb({ h, s, v }));
}
