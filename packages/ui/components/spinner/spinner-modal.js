import './spinner.js';
import { DileSpinnerModal } from "./src/DileSpinnerModal.js";

if (!customElements.get("dile-spinner-modal")) {
  window.customElements.define("dile-spinner-modal", DileSpinnerModal);
}
