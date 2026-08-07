import './modal.js';
import { DileModalHelp } from './src/DileModalHelp.js';

if (!customElements.get("dile-modal-help")) {
  customElements.define("dile-modal-help", DileModalHelp);
}