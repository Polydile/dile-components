import { DileEditor } from "./src/DileEditor.js";

if (!customElements.get("dile-editor")) {
  window.customElements.define("dile-editor", DileEditor);
}
