import { DileDropFile } from "./src/DileDropFile.js";

if (!customElements.get('dile-drop-file')) {
  customElements.define('dile-drop-file', DileDropFile);
}
