import { DileTimePicker } from "./src/DileTimePicker.js";
if (!customElements.get('dile-time-picker')) {
  customElements.define('dile-time-picker', DileTimePicker);
}
