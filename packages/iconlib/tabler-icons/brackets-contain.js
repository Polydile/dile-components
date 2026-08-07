import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibBracketsContain extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M7 4h-4v16h4" /> <path d="M17 4h4v16h-4" /> <path d="M8 16h.01" /> <path d="M12 16h.01" /> <path d="M16 16h.01" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-brackets-contain')) {
  customElements.define('dile-tabler-icon-brackets-contain', DileIconlibBracketsContain);
}
