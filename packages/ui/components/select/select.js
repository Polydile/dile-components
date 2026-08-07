import { DileSelect } from "./src/DileSelect.js";

if (!customElements.get("dile-select")) {
  window.customElements.define("dile-select", DileSelect);
}
