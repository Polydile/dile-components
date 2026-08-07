import { DileCrudDeleteAction } from "../action/src/DileCrudDeleteAction.js";
if (!customElements.get('dile-crud-delete-action')) {
  customElements.define('dile-crud-delete-action', DileCrudDeleteAction);
}
