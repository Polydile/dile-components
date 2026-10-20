import './bottom-nav-item.js';
import { DileBottomNav } from "./src/DileBottomNav.js";

if (!customElements.get("dile-bottom-nav")) {
  window.customElements.define("dile-bottom-nav", DileBottomNav);
}
