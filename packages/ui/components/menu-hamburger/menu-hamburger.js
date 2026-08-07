import { DileMenuHamburger } from './src/DileMenuHamburger.js';

if (!customElements.get('dile-menu-hamburger')) {
  window.customElements.define('dile-menu-hamburger', DileMenuHamburger);
}
