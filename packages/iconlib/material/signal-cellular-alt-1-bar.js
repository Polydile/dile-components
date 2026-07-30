import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibSignalCellularAlt1Bar extends DileBaseIcon {
  getSvgIcon() {
    return `<svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24" viewBox="0 0 24 24" width="24"><g><rect fill="none" height="24" width="24"/></g><g><path d="M5,14h3v6H5V14z"/></g></svg>`;
  }
}

customElements.define('dile-material-icon-signal-cellular-alt-1-bar', DileIconlibSignalCellularAlt1Bar);
