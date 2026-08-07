import { DileCrudFilters } from "./src/DileCrudFilters.js";
if (!customElements.get('dile-crud-filters')) {
  customElements.define('dile-crud-filters', DileCrudFilters);
}
