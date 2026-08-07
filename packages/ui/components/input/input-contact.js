import { DileInputContact } from "./src/DileInputContact.js";

if (!customElements.get("dile-input-contact")) {
  window.customElements.define("dile-input-contact", DileInputContact);
}
