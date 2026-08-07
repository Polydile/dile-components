import './star.js';
import { DileRating } from "./src/DileRating.js";

if (!customElements.get("dile-rating")) {
  window.customElements.define("dile-rating", DileRating);
}
