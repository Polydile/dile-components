import { DileRelationChecker } from './src/DileRelationChecker.js';

if (!customElements.get('dile-relation-checker')) {
  customElements.define('dile-relation-checker', DileRelationChecker);
}
