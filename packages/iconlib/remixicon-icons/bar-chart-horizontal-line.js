import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibBarChartHorizontalLine extends DileBaseIcon {
  getSvgIcon() {
    return `<svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12 3V5H3V3H12ZM16 19V21H3V19H16ZM22 11V13H3V11H22Z"/></svg>`;
  }
}

if (!customElements.get('dile-remixicon-icon-bar-chart-horizontal-line')) {
  customElements.define('dile-remixicon-icon-bar-chart-horizontal-line', DileIconlibBarChartHorizontalLine);
}
