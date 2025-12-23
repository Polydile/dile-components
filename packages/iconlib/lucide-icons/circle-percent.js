import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibCirclePercent extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <circle cx="12" cy="12" r="10" /> <path d="m15 9-6 6" /> <path d="M9 9h.01" /> <path d="M15 15h.01" /></svg>`;
  }
}

customElements.define('dile-lucide-icon-circle-percent', DileIconlibCirclePercent);
