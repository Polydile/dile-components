import { DileSelector } from "./src/DileSelector.js";

if (!customElements.get("dile-selector")) {
  window.customElements.define("dile-selector", DileSelector);
}
