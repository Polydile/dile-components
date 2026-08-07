import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibH4 extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M20 18v-8l-4 6h5" /> <path d="M4 6v12" /> <path d="M12 6v12" /> <path d="M11 18h2" /> <path d="M3 18h2" /> <path d="M4 12h8" /> <path d="M3 6h2" /> <path d="M11 6h2" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-h-4')) {
  customElements.define('dile-tabler-icon-h-4', DileIconlibH4);
}
