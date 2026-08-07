import { DileIcon } from "./src/DileIcon.js";

if (!customElements.get("dile-icon")) {
  window.customElements.define("dile-icon", DileIcon);
}
