import { DileSpinnerHorizontal } from "./src/DileSpinnerHorizontal.js";

if (!customElements.get("dile-spinner-horizontal")) {
  window.customElements.define("dile-spinner-horizontal", DileSpinnerHorizontal);
}
