import { DileModal } from './src/DileModal.js';

if (!customElements.get("dile-modal")) {
  customElements.define("dile-modal", DileModal);
}