import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibBarChartGroupedLine extends DileBaseIcon {
  getSvgIcon() {
    return `<svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M2 12H4V21H2V12ZM5 14H7V21H5V14ZM16 8H18V21H16V8ZM19 10H21V21H19V10ZM9 2H11V21H9V2ZM12 4H14V21H12V4Z"/></svg>`;
  }
}

if (!customElements.get('dile-remixicon-icon-bar-chart-grouped-line')) {
  customElements.define('dile-remixicon-icon-bar-chart-grouped-line', DileIconlibBarChartGroupedLine);
}
