import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibEqualsBold extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor"><path d="M228,160a12,12,0,0,1-12,12H40a12,12,0,0,1,0-24H216A12,12,0,0,1,228,160ZM40,108H216a12,12,0,0,0,0-24H40a12,12,0,0,0,0,24Z"/></svg>`;
  }
}

if (!customElements.get('dile-phosphor-icon-equals-bold')) {
  customElements.define('dile-phosphor-icon-equals-bold', DileIconlibEqualsBold);
}
