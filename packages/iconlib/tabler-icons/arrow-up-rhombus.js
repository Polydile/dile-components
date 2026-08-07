import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibArrowUpRhombus extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M12 16v-13" /> <path d="M15 6l-3 -3l-3 3" /> <path d="M14.5 18.5l-2.5 2.5l-2.5 -2.5l2.5 -2.5l2.5 2.5" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-arrow-up-rhombus')) {
  customElements.define('dile-tabler-icon-arrow-up-rhombus', DileIconlibArrowUpRhombus);
}
