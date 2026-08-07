import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibSquareScissors extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="m17 17-2.18-2.18" /> <path d="M9.56 14.44 17 7" /> <path d="M9.56 9.56 12 12" /> <circle cx="8.5" cy="15.5" r="1.5" /> <circle cx="8.5" cy="8.5" r="1.5" /> <rect x="3" y="3" width="18" height="18" rx="2" /></svg>`;
  }
}

if (!customElements.get('dile-lucide-icon-square-scissors')) {
  customElements.define('dile-lucide-icon-square-scissors', DileIconlibSquareScissors);
}
