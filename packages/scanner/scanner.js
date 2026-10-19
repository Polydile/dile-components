import { DileScanner } from "./src/DileScanner.js";

if (!customElements.get("dile-scanner")) {
  customElements.define("dile-scanner", DileScanner);
}
