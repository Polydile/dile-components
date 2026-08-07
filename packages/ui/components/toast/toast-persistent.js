import { DileToastPersistent } from './src/DileToastPersistent.js';

if (!customElements.get("dile-toast-persistent")) {
  customElements.define("dile-toast-persistent", DileToastPersistent);
}