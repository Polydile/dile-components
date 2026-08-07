import './calendar.js';
import { DileDatetimepicker } from "./src/DileDatetimepicker.js";

if (!customElements.get("dile-datetimepicker")) {
  window.customElements.define("dile-datetimepicker", DileDatetimepicker);
}
