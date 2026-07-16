import { InvalidImageFileError } from './InvalidImageFileError.js';

export async function readImageFile(file) {
  if (!file || file.size === 0) {
    throw new InvalidImageFileError('EMPTY_FILE', 'The file is empty');
  }

  let bitmap;
  try {
    bitmap = await createImageBitmap(file);
  } catch (error) {
    throw new InvalidImageFileError('DECODE_ERROR', 'The file could not be read as a valid image');
  }

  return {
    name: file.name,
    size: file.size,
    type: file.type,
    width: bitmap.width,
    height: bitmap.height,
    bitmap,
  };
}
