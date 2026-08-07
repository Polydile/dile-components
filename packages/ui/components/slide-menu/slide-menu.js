import { DileSlideMenu } from "./src/DileSlideMenu.js";

if (!customElements.get("dile-slide-menu")) {
  window.customElements.define("dile-slide-menu", DileSlideMenu);
}
