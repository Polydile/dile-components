import { DileIconSwitchGroup } from "./src/DileIconSwitchGroup.js";

if (!customElements.get("dile-icon-switch-group")) {
  window.customElements.define("dile-icon-switch-group", DileIconSwitchGroup);
}
