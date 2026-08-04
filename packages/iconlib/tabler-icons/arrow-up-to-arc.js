import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibArrowUpToArc extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M12 21v-12" /> <path d="M8 13l4 -4l4 4" /> <path d="M21 12a9 9 0 0 0 -18 0" /></svg>`;
  }
}

customElements.define('dile-tabler-icon-arrow-up-to-arc', DileIconlibArrowUpToArc);
