import { DileList } from './src/DileList.js';

if (!customElements.get('dile-list')) {
  customElements.define('dile-list', DileList);
}

