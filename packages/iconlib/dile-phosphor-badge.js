import { DilePhosphorBadge } from "./src/DilePhosphorBadge.js";

if (!customElements.get('dile-phosphor-badge')) {
  customElements.define('dile-phosphor-badge', DilePhosphorBadge);
}
