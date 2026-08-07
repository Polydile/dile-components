import { DileCheckbox } from "./src/DileCheckbox.js";

if (!customElements.get("dile-checkbox")) {
  window.customElements.define("dile-checkbox", DileCheckbox);
}
