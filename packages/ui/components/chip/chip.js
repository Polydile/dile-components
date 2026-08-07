import { DileChip } from "./src/DileChip.js";
if (!customElements.get('dile-chip')) {
  customElements.define('dile-chip', DileChip);
}
