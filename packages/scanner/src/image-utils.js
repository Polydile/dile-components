// Canvas helpers for the scanner. Every image is handled as a canvas while it
// is being processed and stored as a JPEG Blob afterwards, so a document with
// many pages does not keep several full-size canvases in memory.

// Decodes an image file into a canvas, applying the EXIF orientation and
// reducing it so its longest side is at most maxSide. iOS limits the area of
// a canvas (about 16.7 megapixels) and current phone cameras go well beyond
// that, so the reduction is also what makes big photos work at all.
export async function fileToCanvas(file, maxSide) {
  const bitmap = await createImageBitmap(file, {
    imageOrientation: "from-image",
  });
  try {
    return drawScaled(bitmap, bitmap.width, bitmap.height, maxSide);
  } finally {
    bitmap.close();
  }
}

export async function blobToCanvas(blob) {
  const bitmap = await createImageBitmap(blob);
  try {
    return drawScaled(bitmap, bitmap.width, bitmap.height, Infinity);
  } finally {
    bitmap.close();
  }
}

export function canvasToBlob(canvas, type = "image/jpeg", quality = 0.92) {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) =>
        blob ? resolve(blob) : reject(new Error("Canvas could not be encoded")),
      type,
      quality,
    );
  });
}

// Rotates clockwise in steps of 90 degrees.
export function rotateCanvas(canvas, rotation) {
  const turns = (((rotation / 90) % 4) + 4) % 4;
  if (turns === 0) {
    return canvas;
  }
  const rotated = document.createElement("canvas");
  const swapSides = turns % 2 === 1;
  rotated.width = swapSides ? canvas.height : canvas.width;
  rotated.height = swapSides ? canvas.width : canvas.height;
  const context = rotated.getContext("2d");
  context.translate(rotated.width / 2, rotated.height / 2);
  context.rotate((turns * Math.PI) / 2);
  context.drawImage(canvas, -canvas.width / 2, -canvas.height / 2);
  return rotated;
}

// Final encoding of a page: limits the longest side and compresses to JPEG
// over a white background (a transparent PNG would turn black otherwise).
export async function encodeJpeg(canvas, { maxSide, quality }) {
  const scaled = drawScaled(canvas, canvas.width, canvas.height, maxSide, true);
  const blob = await canvasToBlob(scaled, "image/jpeg", quality);
  return { blob, width: scaled.width, height: scaled.height };
}

export function fullImageCorners(width, height) {
  return {
    topLeft: { x: 0, y: 0 },
    topRight: { x: width, y: 0 },
    bottomRight: { x: width, y: height },
    bottomLeft: { x: 0, y: height },
  };
}

function drawScaled(source, width, height, maxSide, whiteBackground = false) {
  const scale = Math.min(1, maxSide / Math.max(width, height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.round(width * scale));
  canvas.height = Math.max(1, Math.round(height * scale));
  const context = canvas.getContext("2d");
  if (whiteBackground) {
    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, canvas.width, canvas.height);
  }
  context.drawImage(source, 0, 0, canvas.width, canvas.height);
  return canvas;
}
