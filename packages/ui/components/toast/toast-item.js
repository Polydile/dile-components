import { DileToastItem } from "./src/DileToastItem.js";

if (!customElements.get("dile-toast-item")) {
  window.customElements.define("dile-toast-item", DileToastItem);
}
