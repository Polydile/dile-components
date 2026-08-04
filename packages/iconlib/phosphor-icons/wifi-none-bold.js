import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibWifiNoneBold extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor"><path d="M144,204a16,16,0,1,1-16-16A16,16,0,0,1,144,204Z"/></svg>`;
  }
}

customElements.define('dile-phosphor-icon-wifi-none-bold', DileIconlibWifiNoneBold);
