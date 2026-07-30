import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibSignalCellularAlt extends DileBaseIcon {
  getSvgIcon() {
    return `<svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M17 4h3v16h-3zM5 14h3v6H5zm6-5h3v11h-3z"/></svg>`;
  }
}

customElements.define('dile-material-icon-signal-cellular-alt', DileIconlibSignalCellularAlt);
