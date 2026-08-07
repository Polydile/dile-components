import { DileFontawesomeBadge } from "./src/DileFontawesomeBadge.js";

if (!customElements.get('dile-fontawesome-badge')) {
  customElements.define('dile-fontawesome-badge', DileFontawesomeBadge);
}
