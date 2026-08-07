import { DileAppDrawer } from "./src/DileAppDrawer.js";

if (!customElements.get("dile-app-drawer")) {
  customElements.define("dile-app-drawer", DileAppDrawer);
}
