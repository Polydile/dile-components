import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibLogicNand extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M22 12h-3" /> <path d="M2 9h3" /> <path d="M2 15h3" /> <path d="M7 5c6 0 8 3.5 8 7s-2 7 -8 7h-2v-14h2" /> <path d="M15 12a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-logic-nand')) {
  customElements.define('dile-tabler-icon-logic-nand', DileIconlibLogicNand);
}
