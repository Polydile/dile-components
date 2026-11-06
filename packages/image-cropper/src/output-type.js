const SUPPORTED_TYPES = ['image/png', 'image/jpeg', 'image/webp'];

const EXTENSIONS = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/webp': 'webp',
};

export function resolveOutputType(outputType, file) {
  if (outputType) {
    return outputType;
  }
  if (file && SUPPORTED_TYPES.includes(file.type)) {
    return file.type;
  }
  return 'image/png';
}

export function buildFileName(fileName, type) {
  const extension = EXTENSIONS[type] || 'png';
  const baseName = (fileName || 'image').replace(/\.[^./\\]+$/, '');
  return `${baseName}.${extension}`;
}
