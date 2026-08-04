import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibCellSignalNoneLight extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor"><path d="M46,192v8a6,6,0,0,1-12,0v-8a6,6,0,0,1,12,0Z"/></svg>`;
  }
}

customElements.define('dile-phosphor-icon-cell-signal-none-light', DileIconlibCellSignalNoneLight);
