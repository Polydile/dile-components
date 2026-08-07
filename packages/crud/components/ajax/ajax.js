import { DileAjax } from './src/DileAjax.js'
if (!customElements.get('dile-ajax')) {
  customElements.define('dile-ajax', DileAjax);
}