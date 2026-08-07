import { DileRadio } from "./src/DileRadio.js";

if (!customElements.get("dile-radio")) {
  window.customElements.define("dile-radio", DileRadio);
}
