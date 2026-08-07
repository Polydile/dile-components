import { DileCardSlide } from "./src/DileCardSlide.js";

if (!customElements.get("dile-card-slide")) {
  window.customElements.define("dile-card-slide", DileCardSlide);
}
