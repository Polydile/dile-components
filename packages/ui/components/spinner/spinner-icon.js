import { DileSpinnerIcon } from "./src/DileSpinnerIcon.js";

if (!customElements.get("dile-spinner-icon")) {
  window.customElements.define("dile-spinner-icon", DileSpinnerIcon);
}
