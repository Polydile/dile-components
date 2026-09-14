import { DileCrudListLite } from './src/DileCrudListLite.js';

if (!customElements.get('dile-crud-list-lite')) {
  customElements.define('dile-crud-list-lite', DileCrudListLite);
}
