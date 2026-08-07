import { DileIconlib } from "./src/DileIconlib.js";

if (!customElements.get('dile-iconlib')) {
  customElements.define('dile-iconlib', DileIconlib);
}
