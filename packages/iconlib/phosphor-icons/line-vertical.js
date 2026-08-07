import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibLineVertical extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor"><path d="M136,24V232a8,8,0,0,1-16,0V24a8,8,0,0,1,16,0Z"/></svg>`;
  }
}

if (!customElements.get('dile-phosphor-icon-line-vertical')) {
  customElements.define('dile-phosphor-icon-line-vertical', DileIconlibLineVertical);
}
