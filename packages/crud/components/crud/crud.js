import { DileCrud } from "./src/DileCrud.js";
if (!customElements.get('dile-crud')) {
  customElements.define('dile-crud', DileCrud);
}
