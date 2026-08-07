import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibNumberEightThin extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor"><path d="M147.08,119.64a44,44,0,1,0-38.16,0,52,52,0,1,0,38.16,0ZM92,80a36,36,0,1,1,36,36A36,36,0,0,1,92,80Zm36,132a44,44,0,1,1,44-44A44.05,44.05,0,0,1,128,212Z"/></svg>`;
  }
}

if (!customElements.get('dile-phosphor-icon-number-eight-thin')) {
  customElements.define('dile-phosphor-icon-number-eight-thin', DileIconlibNumberEightThin);
}
