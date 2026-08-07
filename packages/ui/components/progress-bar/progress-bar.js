import { DileProgressBar } from "./src/DileProgressBar.js";

if (!customElements.get("dile-progress-bar")) {
  window.customElements.define("dile-progress-bar", DileProgressBar);
}
