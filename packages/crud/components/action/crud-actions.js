import { DileCrudActions } from "./src/DileCrudActions.js";
if (!customElements.get('dile-crud-actions')) {
  customElements.define('dile-crud-actions', DileCrudActions);
}
