import './spinner.js';
import { DileSpinnerBlock } from "./src/DileSpinnerBlock.js";

if (!customElements.get("dile-spinner-block")) {
  window.customElements.define("dile-spinner-block", DileSpinnerBlock);
}
