import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibColumnInsertLeft extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M14 4h4a1 1 0 0 1 1 1v14a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1v-14a1 1 0 0 1 1 -1" /> <path d="M5 12l4 0" /> <path d="M7 10l0 4" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-column-insert-left')) {
  customElements.define('dile-tabler-icon-column-insert-left', DileIconlibColumnInsertLeft);
}
