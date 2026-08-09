import { DileSelectOverlay } from "./src/DileSelectOverlay.js";

if (!customElements.get("dile-select-overlay")) {
  window.customElements.define("dile-select-overlay", DileSelectOverlay);
}
