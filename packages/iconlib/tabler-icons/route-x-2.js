import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibRouteX2 extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M3 17l4 4" /> <path d="M7 17l-4 4" /> <path d="M17 3l4 4" /> <path d="M21 3l-4 4" /> <path d="M14 5a2 2 0 0 0 -2 2v10a2 2 0 0 1 -2 2" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-route-x-2')) {
  customElements.define('dile-tabler-icon-route-x-2', DileIconlibRouteX2);
}
