import { DileListItem } from './src/DileListItem.js';

if (!customElements.get('dile-list-item')) {
  customElements.define('dile-list-item', DileListItem);
}
