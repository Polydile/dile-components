import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibChartNoAxesGantt extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M6 5h12" /> <path d="M4 12h10" /> <path d="M12 19h8" /></svg>`;
  }
}

customElements.define('dile-lucide-icon-chart-no-axes-gantt', DileIconlibChartNoAxesGantt);
