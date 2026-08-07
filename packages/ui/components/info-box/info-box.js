import { DileInfoBox } from "./src/DileInfoBox.js";

if (!customElements.get("dile-info-box")) {
  window.customElements.define("dile-info-box", DileInfoBox);
}
