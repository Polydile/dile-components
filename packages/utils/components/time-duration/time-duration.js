import { DileTimeDuration } from './src/DileTimeDuration.js';

if (!customElements.get('dile-time-duration')) {
  window.customElements.define('dile-time-duration', DileTimeDuration);
}
