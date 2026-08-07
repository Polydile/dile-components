import { DileCopyText } from './src/DileCopyText.js';

if (!customElements.get('dile-copy-text')) {
  window.customElements.define('dile-copy-text', DileCopyText);
}

export { DileCopyText };
