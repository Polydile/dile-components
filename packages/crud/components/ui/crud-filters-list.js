import { DileCrudFiltersList } from "./src/DileCrudFiltersList.js";
if (!customElements.get('dile-crud-filters-list')) {
  customElements.define('dile-crud-filters-list', DileCrudFiltersList);
}
