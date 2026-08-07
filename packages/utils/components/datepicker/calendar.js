import { DileCalendar } from "./src/DileCalendar.js";

if (!customElements.get("dile-calendar")) {
  window.customElements.define("dile-calendar", DileCalendar);
}
