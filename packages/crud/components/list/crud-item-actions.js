import { DileCrudItemActions } from './src/DileCrudItemActions.js';

if (!customElements.get('dile-crud-item-actions')) {
  customElements.define('dile-crud-item-actions', DileCrudItemActions);
}
