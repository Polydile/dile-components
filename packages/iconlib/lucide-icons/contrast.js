import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibContrast extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <circle cx="12" cy="12" r="10" /> <path d="M12 18a6 6 0 0 0 0-12v12z" /></svg>`;
  }
}

customElements.define('dile-lucide-icon-contrast', DileIconlibContrast);
