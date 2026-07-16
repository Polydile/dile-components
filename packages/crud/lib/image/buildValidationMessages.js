import { formatFileSize } from './formatFileSize.js';

export function buildValidationMessages(errors, translations) {
  return errors.map(error => {
    switch (error.code) {
      case 'FILE_TOO_LARGE':
        return translations.image_file_too_large(formatFileSize(error.maxFileSize));
      case 'WIDTH_OUT_OF_RANGE':
        return translations.image_width_error(error.minWidth, error.maxWidth);
      case 'HEIGHT_OUT_OF_RANGE':
        return translations.image_height_error(error.minHeight, error.maxHeight);
      default:
        return '';
    }
  });
}
