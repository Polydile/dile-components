import './tab.js';
import { DileTabs } from "./src/DileTabs.js";

if (!customElements.get("dile-tabs")) {
  window.customElements.define("dile-tabs", DileTabs);
}
