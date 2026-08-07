import { DileCrudListService } from "./src/DileCrudListService.js";
if (!customElements.get('dile-crud-list-service')) {
  customElements.define('dile-crud-list-service', DileCrudListService);
}
