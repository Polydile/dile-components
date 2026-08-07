import { DileAvatar } from "./src/DileAvatar.js";

if (!customElements.get("dile-avatar")) {
  window.customElements.define("dile-avatar", DileAvatar);
}
