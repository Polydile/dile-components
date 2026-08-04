import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibChartScatter3d extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M3 20l9 -7" /> <path d="M12 3v10l9 7" /> <path d="M17 12v.015" /> <path d="M17 4.015v.015" /> <path d="M21 8.015v.015" /> <path d="M12 19.015v.015" /> <path d="M3 12.015v.015" /> <path d="M7 8.015v.015" /> <path d="M3 4.015v.015" /></svg>`;
  }
}

customElements.define('dile-tabler-icon-chart-scatter-3d', DileIconlibChartScatter3d);
