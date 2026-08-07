import { DileLocalTime } from './src/DileLocalTime.js';

if (!customElements.get('dile-local-time')) {
  window.customElements.define('dile-local-time', DileLocalTime);
}
