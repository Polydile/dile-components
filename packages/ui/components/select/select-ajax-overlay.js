import './select-overlay.js'
import { DileSelectAjaxOverlay } from "./src/DileSelectAjaxOverlay.js";

if (!customElements.get("dile-select-ajax-overlay")) {
  window.customElements.define("dile-select-ajax-overlay", DileSelectAjaxOverlay);
}
