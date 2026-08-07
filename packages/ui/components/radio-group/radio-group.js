import './radio.js';
import { DileRadioGroup } from "./src/DileRadioGroup.js";

if (!customElements.get("dile-radio-group")) {
  window.customElements.define("dile-radio-group", DileRadioGroup);
}
