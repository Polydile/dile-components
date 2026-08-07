import { DileTab } from "./src/DileTab.js";

if (!customElements.get("dile-tab")) {
  window.customElements.define("dile-tab", DileTab);
}
