import { DileHamburger } from './src/DileHamburger.js';

if (!customElements.get('dile-hamburger')) {
  window.customElements.define('dile-hamburger', DileHamburger);
}
