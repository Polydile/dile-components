import { DileCard } from "./src/DileCard.js";

if (!customElements.get("dile-card")) {
  window.customElements.define("dile-card", DileCard);
}
