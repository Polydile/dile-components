import { DileIconSwitch } from "./src/DileIconSwitch.js";

if (!customElements.get("dile-icon-switch")) {
  window.customElements.define("dile-icon-switch", DileIconSwitch);
}
