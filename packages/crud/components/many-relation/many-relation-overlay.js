import { DileManyRelationOverlay } from './src/DileManyRelationOverlay.js';

if (!customElements.get('dile-many-relation-overlay')) {
  customElements.define('dile-many-relation-overlay', DileManyRelationOverlay);
}
