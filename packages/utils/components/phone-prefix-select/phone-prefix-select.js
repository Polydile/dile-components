import { DilePhonePrefixSelect } from './src/DilePhonePrefixSelect.js';

if (!customElements.get('dile-phone-prefix-select')) {
  customElements.define('dile-phone-prefix-select', DilePhonePrefixSelect);
}

export { DilePhonePrefixSelect };
