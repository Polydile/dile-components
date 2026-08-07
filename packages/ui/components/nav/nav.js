import { DileNav } from './src/DileNav.js';

if (!customElements.get('dile-nav')) {
  window.customElements.define('dile-nav', DileNav);
}
