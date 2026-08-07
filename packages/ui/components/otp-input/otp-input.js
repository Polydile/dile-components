import { DileOtpInput } from './src/DileOtpInput.js';

if (!customElements.get('dile-otp-input')) {
  window.customElements.define('dile-otp-input', DileOtpInput);
}
