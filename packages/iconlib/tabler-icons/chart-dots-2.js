import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibChartDots2 extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M3 3v18h18" /> <path d="M7 15a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" /> <path d="M11 5a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" /> <path d="M16 12a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" /> <path d="M21 3l-6 1.5" /> <path d="M14.113 6.65l2.771 3.695" /> <path d="M16 12.5l-5 2" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-chart-dots-2')) {
  customElements.define('dile-tabler-icon-chart-dots-2', DileIconlibChartDots2);
}
