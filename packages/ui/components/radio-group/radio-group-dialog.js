import { DileRadioGroupDialog } from "./src/DileRadioGroupDialog.js";
import './radio.js';

if (!customElements.get("dile-radio-group-dialog")) {
  window.customElements.define("dile-radio-group-dialog", DileRadioGroupDialog);
}
