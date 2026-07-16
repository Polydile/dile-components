export class InvalidImageFileError extends Error {
  constructor(code, message) {
    super(message);
    this.name = 'InvalidImageFileError';
    this.code = code;
  }
}
