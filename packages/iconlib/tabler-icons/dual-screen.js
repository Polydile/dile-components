import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibDualScreen extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M5 4l8 3v15l-8 -3l0 -15" /> <path d="M13 19h6v-15h-14" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-dual-screen')) {
  customElements.define('dile-tabler-icon-dual-screen', DileIconlibDualScreen);
}
