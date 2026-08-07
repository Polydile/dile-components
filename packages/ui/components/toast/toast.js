import { DileToast } from "./src/DileToast.js";
import './toast-item.js';

if (!customElements.get("dile-toast")) {
  window.customElements.define("dile-toast", DileToast);
}
