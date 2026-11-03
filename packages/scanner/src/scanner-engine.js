// The only module that talks to scanic (edge detection, perspective
// correction and the corner editor). Keeping it isolated allows replacing the
// library (e.g. with OpenCV.js) without touching the component.
//
// scanic is loaded on demand, so it is only downloaded when someone scans.

let scanicModule;
let scanner;

function loadScanic() {
  scanicModule ??= import("scanic");
  return scanicModule;
}

// Base URL of the "scanic-ml" files when no mlAssetsUrl is given. scanic uses
// the same one internally; it is repeated here to look for the files in the
// cache (see isMlCached). scanner-ml.spec.js checks that its version matches
// the installed "scanic-ml".
export const CDN_ML_ASSETS_URL = "https://cdn.jsdelivr.net/npm/scanic-ml@0.2.0/dist/";

// The two big files of the ML detector (the .mjs loader is tiny).
const ML_CACHE_CHECK_FILES = ["doccornernet_lean.ort", "ort-wasm-simd-threaded.wasm"];

// Connections where downloading about 2.2 MB takes too long (see
// isSlowConnection).
const SLOW_CONNECTION_TYPES = ["slow-2g", "2g", "3g"];

// scanic aborts the download of the model after 30 s by default. The download
// goes on in the background even when a photo stops waiting for it (see
// mlMaxWait), so it gets a much longer limit: on a slow connection it would
// never finish (nor reach the cache) with 30 s, and with no limit at all a
// stalled connection would keep it pending until the page is reloaded.
const ML_MODEL_FETCH_TIMEOUT_MS = 5 * 60 * 1000;

// Loading of the ML detector: { key, promise }. The promise resolves to true
// when it is ready and to false when it fails or is skipped (slow connection),
// and never rejects. It is forgotten when it does not end ready, so the next
// open() or photo decides again (e.g. the network is back or got faster).
let mlLoad = null;

// Starts downloading scanic in the background (e.g. when the scanner opens),
// so it is ready by the time the first photo arrives. With "ml" it also
// prepares the neural detector (see loadMl), so the first photo does not wait
// for about 2.2 MB. Calling it on every open() downloads nothing again.
export function preloadEngine({ ml = false, mlAssetsUrl = "", mlFastConnectionOnly = false } = {}) {
  loadScanic().catch(() => {
    // Ignored here: the error shows up again when the engine is really used.
  });
  if (ml) {
    loadMl({ mlAssetsUrl, mlFastConnectionOnly });
  }
}

// Downloads the ML detector files and creates its session. scanic keeps the
// session cached by URL, so detectCorners() reuses it. With
// "mlFastConnectionOnly" nothing is downloaded on a slow connection, unless the
// files are already in the cache.
function loadMl({ mlAssetsUrl, mlFastConnectionOnly }) {
  const key = mlAssetsUrl;
  if (mlLoad?.key === key) {
    return mlLoad.promise;
  }
  const current = {
    key,
    promise: (async () => {
      if (mlFastConnectionOnly && isSlowConnection() && !(await isMlCached(mlAssetsUrl))) {
        return false;
      }
      const { Scanner } = await loadScanic();
      await new Scanner({ detector: "ml", ml: mlOptions(mlAssetsUrl) }).initialize();
      return true;
    })().catch(() => false),
  };
  mlLoad = current;
  current.promise.then((ready) => {
    if (!ready && mlLoad === current) {
      mlLoad = null;
    }
  });
  return current.promise;
}

// True when the browser says the connection is slow or the user asked to save
// data. Only Chromium browsers have navigator.connection: elsewhere (Safari,
// Firefox) the connection is unknown and this returns false.
export function isSlowConnection() {
  const connection = globalThis.navigator?.connection;
  if (!connection) {
    return false;
  }
  return connection.saveData === true || SLOW_CONNECTION_TYPES.includes(connection.effectiveType);
}

// True when the ML files are in the Cache Storage (e.g. cached by the service
// worker of a PWA). The HTTP cache of the browser can't be checked.
export async function isMlCached(mlAssetsUrl = "") {
  if (!globalThis.caches) {
    return false;
  }
  try {
    const base = new URL(mlAssetsUrl || CDN_ML_ASSETS_URL, document.baseURI);
    const folder = base.href.endsWith("/") ? base.href : `${base.href}/`;
    const matches = await Promise.all(
      ML_CACHE_CHECK_FILES.map((file) => caches.match(new URL(file, folder).href)),
    );
    return matches.every(Boolean);
  } catch {
    return false;
  }
}

function mlOptions(mlAssetsUrl) {
  return {
    ...(mlAssetsUrl ? { assetBaseUrl: mlAssetsUrl } : {}),
    modelFetchTimeoutMs: ML_MODEL_FETCH_TIMEOUT_MS,
  };
}

// Resolves to the value of the promise, or to false after "ms" milliseconds
// (0 means no limit). The promise itself goes on.
function withTimeout(promise, ms) {
  if (!ms || ms <= 0) {
    return promise;
  }
  let timer;
  const timeout = new Promise((resolve) => {
    timer = setTimeout(() => resolve(false), ms);
  });
  return Promise.race([promise, timeout]).finally(() => clearTimeout(timer));
}

// Returns the corners of the document or null when none is found.
//
// By default it uses the classical detector (Canny, included in scanic).
// With "ml" it uses scanic's neural detector first, more robust with
// cluttered backgrounds, low contrast or strong perspective. It goes first,
// not as a retry, because on hard photos the classical detector does not
// always fail: it can return a wrong shape (e.g. a line of text) as if it
// were the document. The neural detector downloads about 2.2 MB with gzip
// (3.5 MB uncompressed: model + ONNX runtime) the first time (when the
// scanner opens, see preloadEngine), from jsDelivr unless mlAssetsUrl points
// to a self-hosted copy of the "scanic-ml" package files.
//
// The photo waits for the ML detector at most "mlMaxWait" milliseconds (0
// means no limit). When it is not ready by then, it was skipped (see
// mlFastConnectionOnly), it finds nothing or fails (e.g. no network), the
// classical detector is used. The download goes on in the background, so a
// later photo or the next open() can use it.
export async function detectCorners(
  canvas,
  { ml = false, mlAssetsUrl = "", mlMaxWait = 0, mlFastConnectionOnly = false } = {},
) {
  const { Scanner } = await loadScanic();
  scanner ??= new Scanner();
  if (ml && (await withTimeout(loadMl({ mlAssetsUrl, mlFastConnectionOnly }), mlMaxWait))) {
    try {
      const mlResult = await scanner.scan(canvas, {
        mode: "detect",
        detector: "ml",
        ml: mlOptions(mlAssetsUrl),
      });
      if (mlResult.success) {
        return mlResult.corners;
      }
    } catch {
      // Falls back to the classical detector.
    }
  }
  const result = await scanner.scan(canvas, { mode: "detect" });
  return result.success ? result.corners : null;
}

// Perspective correction: returns a new canvas with the document straightened.
export async function extractDocument(canvas, corners) {
  const { extractDocument } = await loadScanic();
  const result = await extractDocument(canvas, corners, { output: "canvas" });
  if (!result.success || !result.output) {
    throw new Error(result.message || "The document could not be extracted");
  }
  return result.output;
}

// scanic injects its stylesheet into document.head, which does not reach a
// shadow root, so it is disabled and the component provides the styles
// (corner-editor-styles.js). Its toolbar is disabled too: the component uses
// its own buttons, calling reset(), getCorners() and setCorners().
export async function createCornerEditor({ container, image, corners, labels }) {
  const { createCornerEditor } = await loadScanic();
  const editor = createCornerEditor({
    container,
    image,
    corners: corners ?? undefined,
    injectStyles: false,
    toolbar: { enabled: false },
    magnifier: { zoom: 2, size: 110 },
  });
  translateHandles(container, labels);
  return editor;
}

// scanic labels the handles in English and does not allow changing it.
function translateHandles(container, labels) {
  const handleLabels = {
    topLeft: labels.topLeftCorner,
    topRight: labels.topRightCorner,
    bottomRight: labels.bottomRightCorner,
    bottomLeft: labels.bottomLeftCorner,
  };
  for (const handle of container.querySelectorAll(".scanic-handle")) {
    const label = handleLabels[handle.dataset.corner];
    if (label) {
      handle.setAttribute("aria-label", label);
    }
  }
}
