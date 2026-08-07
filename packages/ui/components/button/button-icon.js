import { DileButtonIcon } from "./src/DileButtonIcon.js";

if (!customElements.get("dile-button-icon")) {
  window.customElements.define("dile-button-icon", DileButtonIcon);
}
