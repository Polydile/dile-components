import { DileSocialIcon } from './src/DileSocialIcon.js';

if (!customElements.get('dile-social-icon')) {
  window.customElements.define('dile-social-icon', DileSocialIcon);
}
