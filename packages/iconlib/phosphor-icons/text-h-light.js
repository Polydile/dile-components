import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibTextHLight extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor"><path d="M206,56V200a6,6,0,0,1-12,0V134H62v66a6,6,0,0,1-12,0V56a6,6,0,0,1,12,0v66H194V56a6,6,0,0,1,12,0Z"/></svg>`;
  }
}

if (!customElements.get('dile-phosphor-icon-text-h-light')) {
  customElements.define('dile-phosphor-icon-text-h-light', DileIconlibTextHLight);
}
