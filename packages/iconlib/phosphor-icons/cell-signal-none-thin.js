import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibCellSignalNoneThin extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor"><path d="M44,192v8a4,4,0,0,1-8,0v-8a4,4,0,0,1,8,0Z"/></svg>`;
  }
}

if (!customElements.get('dile-phosphor-icon-cell-signal-none-thin')) {
  customElements.define('dile-phosphor-icon-cell-signal-none-thin', DileIconlibCellSignalNoneThin);
}
