import { DileSelectBoolean } from "./src/DileSelectBoolean.js";

if (!customElements.get("dile-select-boolean")) {
  window.customElements.define("dile-select-boolean", DileSelectBoolean);
}
