import './breadcrumbs-item.js';
import { DileBreadcrumbs } from "./src/DileBreadcrumbs.js";

if (!customElements.get("dile-breadcrumbs")) {
  window.customElements.define("dile-breadcrumbs", DileBreadcrumbs);
}
