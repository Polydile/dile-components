import { DileInlineFeedback } from "./src/DileInlineFeedback.js";

if (!customElements.get("dile-inline-feedback")) {
  window.customElements.define("dile-inline-feedback", DileInlineFeedback);
}
