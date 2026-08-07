import './calendar.js';
import { DileDatepicker } from "./src/DileDatepicker.js";

if (!customElements.get("dile-datepicker")) {
  window.customElements.define("dile-datepicker", DileDatepicker);
}
