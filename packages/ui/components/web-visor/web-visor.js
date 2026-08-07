import { DileWebVisor } from "./src/DileWebVisor.js";

if (!customElements.get("dile-web-visor")) {
  window.customElements.define("dile-web-visor", DileWebVisor);
}