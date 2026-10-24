import { DileStep } from './src/DileStep.js';

if (!customElements.get('dile-step')) {
  customElements.define('dile-step', DileStep);
}
