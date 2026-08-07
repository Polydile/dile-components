import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibSignalWifi4Bar extends DileBaseIcon {
  getSvgIcon() {
    return `<svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M12.01 21.49L23.64 7c-.45-.34-4.93-4-11.64-4C5.28 3 .81 6.66.36 7l11.63 14.49.01.01.01-.01z"/></svg>`;
  }
}

if (!customElements.get('dile-material-icon-signal-wifi-4-bar')) {
  customElements.define('dile-material-icon-signal-wifi-4-bar', DileIconlibSignalWifi4Bar);
}
