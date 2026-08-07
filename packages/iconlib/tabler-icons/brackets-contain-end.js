import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibBracketsContainEnd extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M14 4h4v16h-4" /> <path d="M5 16h.01" /> <path d="M9 16h.01" /> <path d="M13 16h.01" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-brackets-contain-end')) {
  customElements.define('dile-tabler-icon-brackets-contain-end', DileIconlibBracketsContainEnd);
}
