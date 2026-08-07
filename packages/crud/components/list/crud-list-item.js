import { DileCrudListItem } from './src/DileCrudListItem.js';
if (!customElements.get('dile-crud-list-item')) {
  customElements.define('dile-crud-list-item', DileCrudListItem);
}
