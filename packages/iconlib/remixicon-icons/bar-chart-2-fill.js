import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibBarChart2Fill extends DileBaseIcon {
  getSvgIcon() {
    return `<svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M2 13H8V21H2V13ZM9 3H15V21H9V3ZM16 8H22V21H16V8Z"/></svg>`;
  }
}

customElements.define('dile-remixicon-icon-bar-chart-2-fill', DileIconlibBarChart2Fill);
