import './rating-scale-option.js';
import { DileRatingScaleQuestion } from "./src/DileRatingScaleQuestion.js";

if (!customElements.get("dile-rating-scale-question")) {
  window.customElements.define("dile-rating-scale-question", DileRatingScaleQuestion);
}
