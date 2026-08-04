import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibArrowUpBar extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M12 21l0 -18" /> <path d="M15 6l-3 -3l-3 3" /> <path d="M9 21l6 0" /></svg>`;
  }
}

customElements.define('dile-tabler-icon-arrow-up-bar', DileIconlibArrowUpBar);
