import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibChartDonut4 extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M8.848 14.667l-3.348 2.833" /> <path d="M12 3v5m4 4h5" /> <path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" /> <path d="M14.219 15.328l2.781 4.172" /> <path d="M8 12a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-chart-donut-4')) {
  customElements.define('dile-tabler-icon-chart-donut-4', DileIconlibChartDonut4);
}
