import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibNumberThreeBold extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor"><path d="M180,160A60,60,0,0,1,80,204.72a12,12,0,1,1,16-17.88A36,36,0,1,0,120,124a12,12,0,0,1-9.6-19.2L144,60H88a12,12,0,0,1,0-24h80a12,12,0,0,1,9.6,19.2l-36.48,48.64A60.11,60.11,0,0,1,180,160Z"/></svg>`;
  }
}

if (!customElements.get('dile-phosphor-icon-number-three-bold')) {
  customElements.define('dile-phosphor-icon-number-three-bold', DileIconlibNumberThreeBold);
}
