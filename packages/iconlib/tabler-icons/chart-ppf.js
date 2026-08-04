import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibChartPpf extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M19 17c0 -6.075 -5.373 -11 -12 -11" /> <path d="M3 3v18h18" /></svg>`;
  }
}

customElements.define('dile-tabler-icon-chart-ppf', DileIconlibChartPpf);
