import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibLineVerticalLight extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor"><path d="M134,24V232a6,6,0,0,1-12,0V24a6,6,0,0,1,12,0Z"/></svg>`;
  }
}

if (!customElements.get('dile-phosphor-icon-line-vertical-light')) {
  customElements.define('dile-phosphor-icon-line-vertical-light', DileIconlibLineVerticalLight);
}
