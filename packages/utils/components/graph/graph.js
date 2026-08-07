import { DileGraph } from './src/DileGraph.js';

if (!customElements.get('dile-graph')) {
  window.customElements.define('dile-graph', DileGraph);
}
