import { DileManyRelation } from './src/DileManyRelation.js';

if (!customElements.get('dile-many-relation')) {
  customElements.define('dile-many-relation', DileManyRelation);
}
