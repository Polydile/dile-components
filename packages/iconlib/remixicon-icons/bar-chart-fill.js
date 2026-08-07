import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibBarChartFill extends DileBaseIcon {
  getSvgIcon() {
    return `<svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M3 12H7V21H3V12ZM17 8H21V21H17V8ZM10 2H14V21H10V2Z"/></svg>`;
  }
}

if (!customElements.get('dile-remixicon-icon-bar-chart-fill')) {
  customElements.define('dile-remixicon-icon-bar-chart-fill', DileIconlibBarChartFill);
}
