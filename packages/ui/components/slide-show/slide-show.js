import { DileSlideShow } from "./src/DileSlideShow.js";

if (!customElements.get("dile-slide-show")) {
  window.customElements.define("dile-slide-show", DileSlideShow);
}
