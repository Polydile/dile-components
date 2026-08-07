import { DileOrderSwitch } from "./src/DileOrderSwitch.js";

if (!customElements.get("dile-order-switch")) {
  window.customElements.define("dile-order-switch", DileOrderSwitch);
}
