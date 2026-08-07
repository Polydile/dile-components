import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibWifiNoneThin extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor"><path d="M136,204a8,8,0,1,1-8-8A8,8,0,0,1,136,204Z"/></svg>`;
  }
}

if (!customElements.get('dile-phosphor-icon-wifi-none-thin')) {
  customElements.define('dile-phosphor-icon-wifi-none-thin', DileIconlibWifiNoneThin);
}
