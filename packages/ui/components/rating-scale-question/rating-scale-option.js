import { DileRatingScaleOption } from "./src/DileRatingScaleOption.js";

if (!customElements.get("dile-rating-scale-option")) {
  window.customElements.define("dile-rating-scale-option", DileRatingScaleOption);
}
