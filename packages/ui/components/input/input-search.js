import { DileInputSearch } from "./src/DileInputSearch.js";

if (!customElements.get("dile-input-search")) {
  window.customElements.define("dile-input-search", DileInputSearch);
}
