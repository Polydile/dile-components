import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibAlignCenterVerticalSimple extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor"><path d="M208,120H176V48a16,16,0,0,0-16-16H96A16,16,0,0,0,80,48v72H48a8,8,0,0,0,0,16H80v72a16,16,0,0,0,16,16h64a16,16,0,0,0,16-16V136h32a8,8,0,0,0,0-16Zm-48,88H96V48h64Z"/></svg>`;
  }
}

if (!customElements.get('dile-phosphor-icon-align-center-vertical-simple')) {
  customElements.define('dile-phosphor-icon-align-center-vertical-simple', DileIconlibAlignCenterVerticalSimple);
}
