import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibHttpTrace extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M3 8h4" /> <path d="M5 8v8" /> <path d="M10 12h2a2 2 0 1 0 0 -4h-2v8" /> <path d="M14 16l-3 -4" /> <path d="M17 16v-6a2 2 0 1 1 4 0v6" /> <path d="M17 13h4" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-http-trace')) {
  customElements.define('dile-tabler-icon-http-trace', DileIconlibHttpTrace);
}
