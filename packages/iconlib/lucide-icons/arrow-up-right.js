import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibArrowUpRight extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M7 7h10v10" /> <path d="M7 17 17 7" /></svg>`;
  }
}

customElements.define('dile-lucide-icon-arrow-up-right', DileIconlibArrowUpRight);
