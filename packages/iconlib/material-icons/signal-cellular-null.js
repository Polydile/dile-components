import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibSignalCellularNull extends DileBaseIcon {
  getSvgIcon() {
    return `<svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M20 6.83V20H6.83L20 6.83M22 2L2 22h20V2z"/></svg>`;
  }
}

if (!customElements.get('dile-material-icon-signal-cellular-null')) {
  customElements.define('dile-material-icon-signal-cellular-null', DileIconlibSignalCellularNull);
}
