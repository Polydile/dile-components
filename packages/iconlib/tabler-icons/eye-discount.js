import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibEyeDiscount extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" /> <path d="M12 18c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6" /> <path d="M16 21l5 -5" /> <path d="M21 21v.01" /> <path d="M16 16v.01" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-eye-discount')) {
  customElements.define('dile-tabler-icon-eye-discount', DileIconlibEyeDiscount);
}
