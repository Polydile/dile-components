import { DileSpinner } from "./src/DileSpinner.js";

if (!customElements.get("dile-spinner")) {
  window.customElements.define("dile-spinner", DileSpinner);
}
