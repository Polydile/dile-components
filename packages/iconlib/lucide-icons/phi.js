import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibPhi extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M12 2v20" /> <circle cx="12" cy="12" r="7" /></svg>`;
  }
}

if (!customElements.get('dile-lucide-icon-phi')) {
  customElements.define('dile-lucide-icon-phi', DileIconlibPhi);
}
