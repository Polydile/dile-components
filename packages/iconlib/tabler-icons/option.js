import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibOption extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M14 6h5m0 12h-5l-5 -12h-4" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-option')) {
  customElements.define('dile-tabler-icon-option', DileIconlibOption);
}
