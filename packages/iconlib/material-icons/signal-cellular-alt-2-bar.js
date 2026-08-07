import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibSignalCellularAlt2Bar extends DileBaseIcon {
  getSvgIcon() {
    return `<svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24" viewBox="0 0 24 24" width="24"><g><rect fill="none" height="24" width="24"/></g><g><g><path d="M5,14h3v6H5V14z M11,9h3v11h-3V9z"/></g></g></svg>`;
  }
}

if (!customElements.get('dile-material-icon-signal-cellular-alt-2-bar')) {
  customElements.define('dile-material-icon-signal-cellular-alt-2-bar', DileIconlibSignalCellularAlt2Bar);
}
