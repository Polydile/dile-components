import './select.js'
import { DileSelectAjax } from "./src/DileSelectAjax.js";

if (!customElements.get("dile-select-ajax")) {
  window.customElements.define("dile-select-ajax", DileSelectAjax);
}
