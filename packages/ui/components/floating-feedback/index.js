import { DileFloatingFeedback } from './src/DileFloatingFeedback.js';

if (!customElements.get('dile-floating-feedback')) {
  window.customElements.define('dile-floating-feedback', DileFloatingFeedback);
}

export { DileFloatingFeedback };
