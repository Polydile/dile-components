import { DileFormGroup } from "./src/DileFormGroup.js";

if (!customElements.get("dile-form-group")) {
  window.customElements.define("dile-form-group", DileFormGroup);
}
