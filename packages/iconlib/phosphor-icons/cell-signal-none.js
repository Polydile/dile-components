import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibCellSignalNone extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor"><path d="M48,192v8a8,8,0,0,1-16,0v-8a8,8,0,0,1,16,0Z"/></svg>`;
  }
}

if (!customElements.get('dile-phosphor-icon-cell-signal-none')) {
  customElements.define('dile-phosphor-icon-cell-signal-none', DileIconlibCellSignalNone);
}
