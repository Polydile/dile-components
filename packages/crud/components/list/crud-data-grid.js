import { DileCrudDataGrid } from './src/DileCrudDataGrid.js';

if (!customElements.get('dile-crud-data-grid')) {
  customElements.define('dile-crud-data-grid', DileCrudDataGrid);
}
