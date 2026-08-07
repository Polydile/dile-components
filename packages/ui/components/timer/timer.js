import { DileTimer } from "./src/DileTimer.js";

if (!customElements.get("dile-timer")) {
  window.customElements.define("dile-timer", DileTimer);
}
