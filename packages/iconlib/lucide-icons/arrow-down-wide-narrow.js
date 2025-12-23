import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibArrowDownWideNarrow extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="m3 16 4 4 4-4" /> <path d="M7 20V4" /> <path d="M11 4h10" /> <path d="M11 8h7" /> <path d="M11 12h4" /></svg>`;
  }
}

customElements.define('dile-lucide-icon-arrow-down-wide-narrow', DileIconlibArrowDownWideNarrow);
