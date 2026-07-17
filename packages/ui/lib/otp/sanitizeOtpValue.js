export function sanitizeOtpValue(rawText, length) {
  const digits = String(rawText ?? '').replace(/\D/g, '');
  return length ? digits.slice(0, length) : digits;
}
