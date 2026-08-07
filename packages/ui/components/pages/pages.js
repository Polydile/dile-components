import { DilePages } from "./src/DilePages.js";

if (!customElements.get("dile-pages")) {
  window.customElements.define("dile-pages", DilePages);
}
