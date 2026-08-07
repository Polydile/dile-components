import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibCornerDownLeftDouble extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M19 5v6a3 3 0 0 1 -3 3h-7" /> <path d="M13 10l-4 4l4 4m-5 -8l-4 4l4 4" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-corner-down-left-double')) {
  customElements.define('dile-tabler-icon-corner-down-left-double', DileIconlibCornerDownLeftDouble);
}
