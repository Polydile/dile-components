import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibChartCircles extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M4 9.5a5.5 5.5 0 1 0 11 0a5.5 5.5 0 1 0 -11 0" /> <path d="M9 14.5a5.5 5.5 0 1 0 11 0a5.5 5.5 0 1 0 -11 0" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-chart-circles')) {
  customElements.define('dile-tabler-icon-chart-circles', DileIconlibChartCircles);
}
