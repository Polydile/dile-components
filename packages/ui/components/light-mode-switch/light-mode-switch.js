import { DileLightModeSwitch } from "./src/DileLightModeSwitch.js";

if (!customElements.get("dile-light-mode-switch")) {
  window.customElements.define("dile-light-mode-switch", DileLightModeSwitch);
}
