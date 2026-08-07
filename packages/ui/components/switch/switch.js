import { DileSwitch } from "./src/DileSwitch.js";
if (!customElements.get('dile-switch')) {
  customElements.define('dile-switch', DileSwitch);
}
