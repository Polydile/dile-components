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

// Starts downloading scanic in the background (e.g. when the scanner opens),
// so it is ready by the time the first photo arrives.
export function preloadEngine() {
  loadScanic().catch(() => {
    // Ignored here: the error shows up again when the engine is really used.
  });
}

// Returns the corners of the document or null when none is found.
//
// By default it uses the classical detector (Canny, included in scanic).
// With "ml" it uses scanic's neural detector first, more robust with
// cluttered backgrounds, low contrast or strong perspective. It goes first,
// not as a retry, because on hard photos the classical detector does not
// always fail: it can return a wrong shape (e.g. a line of text) as if it
// were the document. The neural detector downloads about 2 MB (model + ONNX
// runtime) the first time, from jsDelivr unless mlAssetsUrl points to a
// self-hosted copy of the "scanic-ml" package files. When it finds nothing
// or fails (e.g. no network), the classical detector is used.
export async function detectCorners(canvas, { ml = false, mlAssetsUrl = "" } = {}) {
  const { Scanner } = await loadScanic();
  scanner ??= new Scanner();
  if (ml) {
    try {
      const mlResult = await scanner.scan(canvas, {
        mode: "detect",
        detector: "ml",
        ml: mlAssetsUrl ? { assetBaseUrl: mlAssetsUrl } : {},
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
