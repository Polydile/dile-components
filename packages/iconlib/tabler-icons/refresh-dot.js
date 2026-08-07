import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibRefreshDot extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M20 11a8.1 8.1 0 0 0 -15.5 -2m-.5 -4v4h4" /> <path d="M4 13a8.1 8.1 0 0 0 15.5 2m.5 4v-4h-4" /> <path d="M11 12a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-refresh-dot')) {
  customElements.define('dile-tabler-icon-refresh-dot', DileIconlibRefreshDot);
}
