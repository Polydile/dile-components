import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibWifiNone extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor"><path d="M140,204a12,12,0,1,1-12-12A12,12,0,0,1,140,204Z"/></svg>`;
  }
}

customElements.define('dile-phosphor-icon-wifi-none', DileIconlibWifiNone);
