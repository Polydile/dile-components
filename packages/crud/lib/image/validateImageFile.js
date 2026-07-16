export function validateImageFile(info, constraints = {}) {
  const { maxFileSize, minWidth, maxWidth, minHeight, maxHeight } = constraints;
  const errors = [];

  if (maxFileSize != null && info.size > maxFileSize) {
    errors.push({ code: 'FILE_TOO_LARGE', maxFileSize, actual: info.size });
  }

  if ((minWidth != null && info.width < minWidth) || (maxWidth != null && info.width > maxWidth)) {
    errors.push({ code: 'WIDTH_OUT_OF_RANGE', minWidth, maxWidth, actual: info.width });
  }

  if ((minHeight != null && info.height < minHeight) || (maxHeight != null && info.height > maxHeight)) {
    errors.push({ code: 'HEIGHT_OUT_OF_RANGE', minHeight, maxHeight, actual: info.height });
  }

  return { valid: errors.length === 0, errors };
}
