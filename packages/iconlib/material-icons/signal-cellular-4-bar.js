import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibSignalCellular4Bar extends DileBaseIcon {
  getSvgIcon() {
    return `<svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M2 22h20V2z"/></svg>`;
  }
}

customElements.define('dile-material-icon-signal-cellular-4-bar', DileIconlibSignalCellular4Bar);
