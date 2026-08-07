import { DileCrudSelectAll } from "./src/DileCrudSelectAll.js";
if (!customElements.get('dile-crud-select-all')) {
  customElements.define('dile-crud-select-all', DileCrudSelectAll);
}