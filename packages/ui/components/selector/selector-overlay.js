import { DileSelectorOverlay } from "./src/DileSelectorOverlay.js";

if (!customElements.get("dile-selector-overlay")) {
  window.customElements.define("dile-selector-overlay", DileSelectorOverlay);
}
