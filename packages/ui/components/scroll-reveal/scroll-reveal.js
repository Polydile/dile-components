import { DileScrollReveal } from "./src/DileScrollReveal.js";

if (!customElements.get("dile-scroll-reveal")) {
  window.customElements.define("dile-scroll-reveal", DileScrollReveal);
}
