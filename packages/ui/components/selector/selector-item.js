import { DileSelectorItem } from "./src/DileSelectorItem.js";

if (!customElements.get("dile-selector-item")) {
  window.customElements.define("dile-selector-item", DileSelectorItem);
}
