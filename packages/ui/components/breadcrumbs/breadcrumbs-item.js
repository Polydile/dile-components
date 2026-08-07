import { DileBreadcrumbsItem } from "./src/DileBreadcrumbsItem.js";

if (!customElements.get("dile-breadcrumbs-item")) {
  window.customElements.define("dile-breadcrumbs-item", DileBreadcrumbsItem);
}
