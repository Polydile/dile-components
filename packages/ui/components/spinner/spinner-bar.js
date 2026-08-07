import { DileSpinnerBar } from "./src/DileSpinnerBar.js";

if (!customElements.get("dile-spinner-bar")) {
  window.customElements.define("dile-spinner-bar", DileSpinnerBar);
}
