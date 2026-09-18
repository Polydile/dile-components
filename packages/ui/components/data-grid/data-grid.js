import { DileDataGrid } from './src/DileDataGrid.js';

if (!customElements.get('dile-data-grid')) {
  customElements.define('dile-data-grid', DileDataGrid);
}
