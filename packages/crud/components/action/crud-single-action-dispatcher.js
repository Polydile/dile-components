import { DileCrudSingleActionDispatcher } from "./src/DileCrudSingleActionDispatcher.js";
if (!customElements.get('dile-crud-single-action-dispatcher')) {
  customElements.define('dile-crud-single-action-dispatcher', DileCrudSingleActionDispatcher);
}
