import { DileBottomNavItem } from "./src/DileBottomNavItem.js";

if (!customElements.get("dile-bottom-nav-item")) {
  window.customElements.define("dile-bottom-nav-item", DileBottomNavItem);
}
