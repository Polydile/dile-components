import { DileSteps } from './src/DileSteps.js';

if (!customElements.get('dile-steps')) {
  customElements.define('dile-steps', DileSteps);
}
