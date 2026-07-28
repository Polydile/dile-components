function hexToRgb(hex) {
  const normalized = hex.replace('#', '');
  const value = parseInt(normalized, 16);
  return {
    r: (value >> 16) & 255,
    g: (value >> 8) & 255,
    b: value & 255,
  };
}

function rgbToHex({ r, g, b }) {
  const clamp = channel => Math.round(Math.min(255, Math.max(0, channel)));
  return `#${[r, g, b].map(channel => clamp(channel).toString(16).padStart(2, '0')).join('')}`;
}

// Mixes `hex` towards `target` by `amount` (0 = hex, 1 = target).
export function mixColor(hex, target, amount) {
  const from = hexToRgb(hex);
  const to = hexToRgb(target);
  return rgbToHex({
    r: from.r + (to.r - from.r) * amount,
    g: from.g + (to.g - from.g) * amount,
    b: from.b + (to.b - from.b) * amount,
  });
}

export function lighten(hex, amount) {
  return mixColor(hex, '#ffffff', amount);
}

export function darken(hex, amount) {
  return mixColor(hex, '#000000', amount);
}
