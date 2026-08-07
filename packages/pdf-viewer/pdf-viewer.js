import { DilePdfViewer } from "./src/DilePdfViewer.js";

if (!customElements.get("dile-pdf-viewer")) {
  window.customElements.define("dile-pdf-viewer", DilePdfViewer);
}
