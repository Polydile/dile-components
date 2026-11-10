import { DileSortable } from './src/DileSortable.js';

if (!customElements.get('dile-sortable')) {
  customElements.define('dile-sortable', DileSortable);
}
