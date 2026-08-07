import { DileNetwork } from './src/DileNetwork.js';

if (!customElements.get('dile-network')) {
  customElements.define('dile-network', DileNetwork);
}
