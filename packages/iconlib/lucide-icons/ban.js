import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibBan extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <circle cx="12" cy="12" r="10" /> <path d="M4.929 4.929 19.07 19.071" /></svg>`;
  }
}

if (!customElements.get('dile-lucide-icon-ban')) {
  customElements.define('dile-lucide-icon-ban', DileIconlibBan);
}
