import { DileFontawesomeIcon } from "./src/DileFontawesomeIcon.js";

if (!customElements.get('dile-fontawesome-icon')) {
  customElements.define('dile-fontawesome-icon', DileFontawesomeIcon);
}