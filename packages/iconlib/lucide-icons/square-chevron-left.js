import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibSquareChevronLeft extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <rect width="18" height="18" x="3" y="3" rx="2" /> <path d="m14 16-4-4 4-4" /></svg>`;
  }
}

customElements.define('dile-lucide-icon-square-chevron-left', DileIconlibSquareChevronLeft);
