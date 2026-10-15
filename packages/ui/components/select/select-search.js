import './select-overlay.js'
import { DileSelectSearch } from "./src/DileSelectSearch.js";

if (!customElements.get("dile-select-search")) {
  window.customElements.define("dile-select-search", DileSelectSearch);
}
