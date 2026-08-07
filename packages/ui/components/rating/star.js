import { DileStar } from "./src/DileStar.js";

if (!customElements.get("dile-star")) {
  window.customElements.define("dile-star", DileStar);
}
