// Shared helpers for the dile-scanner component tests.

// Synthetic photo of a document: dark noisy background and a light sheet of
// paper in perspective with some lines of "text".
export function documentCanvas({ width = 1200, height = 900, background = 'dark' } = {}) {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext('2d');
  context.fillStyle = background === 'dark' ? '#2b2b2b' : '#d8d4cc';
  context.fillRect(0, 0, width, height);
  for (let i = 0; i < 4000; i++) {
    const shade = background === 'dark' ? 30 + Math.random() * 40 : 190 + Math.random() * 40;
    context.fillStyle = `rgb(${shade},${shade},${shade})`;
    context.fillRect(Math.random() * width, Math.random() * height, 3, 3);
  }
  const quad = [
    [width * 0.22, height * 0.12],
    [width * 0.8, height * 0.16],
    [width * 0.84, height * 0.88],
    [width * 0.16, height * 0.84],
  ];
  context.fillStyle = '#f7f7f2';
  context.beginPath();
  quad.forEach(([x, y], index) => (index ? context.lineTo(x, y) : context.moveTo(x, y)));
  context.closePath();
  context.fill();
  context.fillStyle = '#555';
  for (let line = 0; line < 12; line++) {
    const y = height * (0.25 + line * 0.045);
    context.fillRect(width * 0.3, y, width * (0.35 + (line % 3) * 0.05), 6);
  }
  return canvas;
}

// Light sheet of paper with dark lines of text over a light wood-like
// texture. The classical detector picks a line of text as the document; the
// ML detector finds the sheet. Uses a seeded random so it is always the same.
export function hardDocumentCanvas({ width = 1200, height = 900, seed = 7 } = {}) {
  const random = seededRandom(seed);
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext('2d');
  context.fillStyle = '#e2ddd3';
  context.fillRect(0, 0, width, height);
  for (let i = 0; i < 260; i++) {
    const shade = 170 + random() * 60;
    const y = random() * height;
    context.strokeStyle = `rgb(${shade},${shade - 8},${shade - 20})`;
    context.lineWidth = 1 + random() * 4;
    context.beginPath();
    context.moveTo(0, y);
    context.bezierCurveTo(width / 3, y + 30, (width * 2) / 3, y - 30, width, y + random() * 20);
    context.stroke();
  }
  const quad = [
    [width * 0.22, height * 0.12],
    [width * 0.8, height * 0.16],
    [width * 0.84, height * 0.88],
    [width * 0.16, height * 0.84],
  ];
  context.fillStyle = '#f5f4ef';
  context.beginPath();
  quad.forEach(([x, y], index) => (index ? context.lineTo(x, y) : context.moveTo(x, y)));
  context.closePath();
  context.fill();
  context.fillStyle = '#222';
  for (let line = 0; line < 14; line++) {
    const y = height * (0.22 + line * 0.045);
    context.fillRect(width * 0.28, y, width * (0.4 + (line % 3) * 0.05), 9);
  }
  return canvas;
}

function seededRandom(seed) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function canvasToFile(canvas, name = 'photo.jpg', type = 'image/jpeg') {
  return new Promise((resolve) => {
    canvas.toBlob((blob) => resolve(new File([blob], name, { type })), type, 0.92);
  });
}

export function documentFile(options) {
  return canvasToFile(documentCanvas(options));
}

export function waitFor(fn, timeout = 15000) {
  return new Promise((resolve, reject) => {
    const start = Date.now();
    const check = () => {
      const result = fn();
      if (result) return resolve(result);
      if (Date.now() - start > timeout) return reject(new Error('waitFor timed out'));
      setTimeout(check, 20);
    };
    check();
  });
}

export function nextEvent(el, eventName) {
  return new Promise((resolve) => {
    el.addEventListener(eventName, resolve, { once: true });
  });
}

export async function imageSize(blob) {
  const bitmap = await createImageBitmap(blob);
  const size = { width: bitmap.width, height: bitmap.height };
  bitmap.close();
  return size;
}

export async function renderScanner(attrs = '') {
  document.body.innerHTML = `<dile-scanner ${attrs}></dile-scanner>`;
  const el = document.body.querySelector('dile-scanner');
  await el.updateComplete;
  return el;
}

export async function openScanner(attrs) {
  const el = await renderScanner(attrs);
  el.open();
  await el.updateComplete;
  return el;
}

export const query = (el, selector) => el.shadowRoot.querySelector(selector);
export const queryAll = (el, selector) => [...el.shadowRoot.querySelectorAll(selector)];
export const button = (el, icon) => query(el, `.step:not([hidden]) dile-button[icon="lucide.${icon}"]`);
export const pageButtons = (el, icon) => queryAll(el, `.page dile-button[icon="lucide.${icon}"]`);
export const pages = (el) => queryAll(el, '.page');
export const errorMessage = (el) => query(el, '.message.error')?.textContent.trim();

export function selectFiles(el, files, inputId = 'galleryinput') {
  const input = query(el, `#${inputId}`);
  const transfer = new DataTransfer();
  files.forEach((file) => transfer.items.add(file));
  input.files = transfer.files;
  input.dispatchEvent(new Event('change'));
}

export async function waitForIdle(el) {
  await el.updateComplete;
  await waitFor(() => !query(el, '.busy'));
}

export function waitForEditor(el) {
  return waitFor(() => !query(el, '.busy') && query(el, '#editor .scanic-handle'));
}

export function waitForPages(el, count) {
  return waitFor(() => !query(el, '.busy') && pages(el).length === count && query(el, '.pages'));
}

export async function acceptAdjust(el) {
  await waitForEditor(el);
  button(el, 'check').click();
}

// Adds the files, accepting the detected corners of each one.
export async function scanFiles(el, files) {
  const expected = pages(el).length + (el.multipage ? files.length : Math.max(0, 1 - pages(el).length));
  selectFiles(el, files);
  for (let i = 0; i < (el.multipage ? files.length : 1); i++) {
    await acceptAdjust(el);
    await waitForIdle(el);
  }
  await waitForPages(el, expected);
}

export async function save(el) {
  const scanned = nextEvent(el, 'dile-document-scanned');
  button(el, 'check').click();
  return (await scanned).detail;
}
