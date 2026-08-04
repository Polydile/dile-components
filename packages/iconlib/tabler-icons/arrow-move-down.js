import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibArrowMoveDown extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M12 11v10" /> <path d="M9 18l3 3l3 -3" /> <path d="M10 5a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" /></svg>`;
  }
}

customElements.define('dile-tabler-icon-arrow-move-down', DileIconlibArrowMoveDown);
