import { DileCrudSingle } from "./src/DileCrudSingle.js";
if (!customElements.get('dile-crud-single')) {
  customElements.define('dile-crud-single', DileCrudSingle);
}
