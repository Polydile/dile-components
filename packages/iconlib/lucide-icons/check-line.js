import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibCheckLine extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M20 4L9 15" /> <path d="M21 19L3 19" /> <path d="M9 15L4 10" /></svg>`;
  }
}

customElements.define('dile-lucide-icon-check-line', DileIconlibCheckLine);
