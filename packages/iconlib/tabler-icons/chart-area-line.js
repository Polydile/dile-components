import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibChartAreaLine extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M4 19l4 -6l4 2l4 -5l4 4l0 5l-16 0" /> <path d="M4 12l3 -4l4 2l5 -6l4 4" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-chart-area-line')) {
  customElements.define('dile-tabler-icon-chart-area-line', DileIconlibChartAreaLine);
}
