import { DileCrudList } from "./src/DileCrudList.js";
if (!customElements.get('dile-crud-list')) {
  customElements.define('dile-crud-list', DileCrudList);
}
