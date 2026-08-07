import { DileMaterialBadge } from "./src/DileMaterialBadge.js";

if (!customElements.get('dile-material-badge')) {
  customElements.define('dile-material-badge', DileMaterialBadge);
}
