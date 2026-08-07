import { DileMediaQuery } from "./src/DileMediaQuery.js";

if (!customElements.get("dile-media-query")) {
  window.customElements.define("dile-media-query", DileMediaQuery);
}
