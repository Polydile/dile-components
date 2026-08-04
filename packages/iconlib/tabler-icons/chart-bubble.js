import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibChartBubble extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M3 16a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" /> <path d="M14 19a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" /> <path d="M10 7.5a4.5 4.5 0 1 0 9 0a4.5 4.5 0 1 0 -9 0" /></svg>`;
  }
}

customElements.define('dile-tabler-icon-chart-bubble', DileIconlibChartBubble);
