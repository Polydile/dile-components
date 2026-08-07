import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibCellSignalLow extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor"><path d="M88,152v48a8,8,0,0,1-16,0V152a8,8,0,0,1,16,0ZM40,184a8,8,0,0,0-8,8v8a8,8,0,0,0,16,0v-8A8,8,0,0,0,40,184Z"/></svg>`;
  }
}

if (!customElements.get('dile-phosphor-icon-cell-signal-low')) {
  customElements.define('dile-phosphor-icon-cell-signal-low', DileIconlibCellSignalLow);
}
