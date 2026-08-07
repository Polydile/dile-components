import { DileMenuOverlay } from './src/DileMenuOverlay.js';

if (!customElements.get("dile-menu-overlay")) {
  customElements.define("dile-menu-overlay", DileMenuOverlay);
}