import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibPdf extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M10 8v8h2a2 2 0 0 0 2 -2v-4a2 2 0 0 0 -2 -2h-2" /> <path d="M3 12h2a2 2 0 1 0 0 -4h-2v8" /> <path d="M17 12h3" /> <path d="M21 8h-4v8" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-pdf')) {
  customElements.define('dile-tabler-icon-pdf', DileIconlibPdf);
}
