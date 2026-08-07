import { DileRange } from "./src/DileRange.js";

if (!customElements.get("dile-range")) {
  window.customElements.define("dile-range", DileRange);
}
