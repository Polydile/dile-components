import { DileButton } from "./src/DileButton.js";

if (!customElements.get("dile-button")) {
  window.customElements.define("dile-button", DileButton);
}
