import { DileBoxSelector } from './src/DileBoxSelector.js'
if (!customElements.get("dile-box-selector")) {
  customElements.define("dile-box-selector", DileBoxSelector);
}