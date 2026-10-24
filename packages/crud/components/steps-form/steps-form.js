import { DileStepsForm } from './src/DileStepsForm.js';

if (!customElements.get('dile-steps-form')) {
  customElements.define('dile-steps-form', DileStepsForm);
}
