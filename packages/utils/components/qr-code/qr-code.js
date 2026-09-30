import { DileQrCode } from './src/DileQrCode.js';

if (!customElements.get('dile-qr-code')) {
  window.customElements.define('dile-qr-code', DileQrCode);
}
