import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibArrowMoveLeft extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M13 12h-10" /> <path d="M6 15l-3 -3l3 -3" /> <path d="M17 12a2 2 0 1 1 4 0a2 2 0 0 1 -4 0" /></svg>`;
  }
}

customElements.define('dile-tabler-icon-arrow-move-left', DileIconlibArrowMoveLeft);
