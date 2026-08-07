import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibRainbow extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M22 17c0 -5.523 -4.477 -10 -10 -10c-5.523 0 -10 4.477 -10 10" /> <path d="M18 17a6 6 0 1 0 -12 0" /> <path d="M14 17a2 2 0 1 0 -4 0" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-rainbow')) {
  customElements.define('dile-tabler-icon-rainbow', DileIconlibRainbow);
}
