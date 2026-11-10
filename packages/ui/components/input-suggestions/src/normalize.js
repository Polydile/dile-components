/** Lowercase text without diacritics, to compare ignoring case and accents. */
export const normalize = (text) =>
  String(text ?? '')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase();
