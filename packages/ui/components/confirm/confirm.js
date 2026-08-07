import { DileConfirm } from './src/DileConfirm.js';

if (!customElements.get("dile-confirm")) {
  customElements.define("dile-confirm", DileConfirm);
}