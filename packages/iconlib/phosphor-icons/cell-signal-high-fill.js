import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibCellSignalHighFill extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor"><path d="M198.12,25.23a16,16,0,0,0-17.44,3.46l-160,160A16,16,0,0,0,32,216H192a16,16,0,0,0,16-16V40A15.94,15.94,0,0,0,198.12,25.23ZM192,200H168V64l24-24Z"/></svg>`;
  }
}

if (!customElements.get('dile-phosphor-icon-cell-signal-high-fill')) {
  customElements.define('dile-phosphor-icon-cell-signal-high-fill', DileIconlibCellSignalHighFill);
}
