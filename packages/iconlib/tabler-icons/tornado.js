import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibTornado extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M21 4l-18 0" /> <path d="M13 16l-6 0" /> <path d="M11 20l4 0" /> <path d="M6 8l14 0" /> <path d="M4 12l12 0" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-tornado')) {
  customElements.define('dile-tabler-icon-tornado', DileIconlibTornado);
}
