import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibArrowUpLeft extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M7 17V7h10" /> <path d="M17 17 7 7" /></svg>`;
  }
}

customElements.define('dile-lucide-icon-arrow-up-left', DileIconlibArrowUpLeft);
